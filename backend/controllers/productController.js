const Product = require('../models/Product');
const asyncHandler = require('express-async-handler');
const path = require('path');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

// Helper function to save uploaded files
const saveFiles = (files) => {
  const uploadDir = path.join(__dirname, '../uploads');
  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
  }

  return files.map(file => {
    const fileExt = path.extname(file.originalname);
    const newFilename = `${uuidv4()}${fileExt}`;
    const filePath = path.join(uploadDir, newFilename);
    
    fs.renameSync(file.path, filePath);
    
    return `/uploads/${newFilename}`;
  });
};

// @desc    Create a new product
// @route   POST /api/products
// @access  Private/Admin
const createProduct = asyncHandler(async (req, res) => {
  try {
    const { name, price, description, category, colors, sizes } = req.body;

    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: 'Please upload at least one image' });
    }

    const colorsArray = Array.isArray(colors) ? colors : [colors].filter(Boolean);
    const sizesArray = Array.isArray(sizes) ? sizes : [sizes].filter(Boolean);

    if (colorsArray.length === 0) {
      return res.status(400).json({ message: 'Please add at least one color' });
    }
    if (sizesArray.length === 0) {
      return res.status(400).json({ message: 'Please add at least one size' });
    }

    const imageUrls = saveFiles(req.files);

    const product = new Product({
      name,
      price,
      description,
      category,
      colors: colorsArray,
      sizes: sizesArray,
      images: imageUrls,
      user: req.user._id
    });

    const createdProduct = await product.save();
    res.status(201).json(createdProduct);
  } catch (error) {
    // Clean up uploaded files if error occurs
    if (req.files?.length > 0) {
      req.files.forEach(file => {
        if (fs.existsSync(file.path)) {
          fs.unlinkSync(file.path);
        }
      });
    }
    res.status(400).json({ 
      message: error.message || 'Product creation failed' 
    });
  }
});

// @desc    Get all products
// @route   GET /api/products
// @access  Public
const getProducts = asyncHandler(async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching products' });
  }
});

// @desc    Get single product by ID
// @route   GET /api/products/:id
// @access  Public
const getProductById = asyncHandler(async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    
    res.json(product);
  } catch (error) {
    if (error.kind === 'ObjectId') {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.status(500).json({ message: 'Error fetching product' });
  }
});

// @desc    Update a product
// @route   PUT /api/products/:id
// @access  Private/Admin
const updateProduct = asyncHandler(async (req, res) => {
  try {
    const { name, price, description, category, colors, sizes } = req.body;
    
    const product = await Product.findById(req.params.id);
    
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Convert colors and sizes to arrays if they are strings
    const colorsArray = Array.isArray(colors) ? colors : [colors].filter(Boolean);
    const sizesArray = Array.isArray(sizes) ? sizes : [sizes].filter(Boolean);

    if (colorsArray.length === 0) {
      return res.status(400).json({ message: 'Please add at least one color' });
    }
    if (sizesArray.length === 0) {
      return res.status(400).json({ message: 'Please add at least one size' });
    }

    product.name = name || product.name;
    product.price = price || product.price;
    product.description = description || product.description;
    product.category = category || product.category;
    product.colors = colorsArray;
    product.sizes = sizesArray;

    // Handle new image uploads if any
    if (req.files && req.files.length > 0) {
      const newImageUrls = saveFiles(req.files);
      product.images = [...product.images, ...newImageUrls];
    }

    const updatedProduct = await product.save();
    res.json(updatedProduct);
  } catch (error) {
    // Clean up uploaded files if error occurs
    if (req.files?.length > 0) {
      req.files.forEach(file => {
        if (fs.existsSync(file.path)) {
          fs.unlinkSync(file.path);
        }
      });
    }
    res.status(400).json({ 
      message: error.message || 'Product update failed' 
    });
  }
});

// @desc    Delete a product
// @route   DELETE /api/products/:id
// @access  Private/Admin
const deleteProduct = asyncHandler(async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Delete associated images from filesystem
    product.images.forEach(image => {
      const imagePath = path.join(__dirname, `../${image}`);
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
    });

    await product.remove();
    res.json({ message: 'Product removed' });
  } catch (error) {
    if (error.kind === 'ObjectId') {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.status(500).json({ message: 'Error deleting product' });
  }
});

// @desc    Delete product image
// @route   DELETE /api/products/:id/images/:imageId
// @access  Private/Admin
const deleteProductImage = asyncHandler(async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Find the image to delete
    const imageIndex = product.images.findIndex(
      img => img === `/uploads/${req.params.imageId}`
    );
    
    if (imageIndex === -1) {
      return res.status(404).json({ message: 'Image not found' });
    }

    // Delete image from filesystem
    const imagePath = path.join(__dirname, `../uploads/${req.params.imageId}`);
    if (fs.existsSync(imagePath)) {
      fs.unlinkSync(imagePath);
    }

    // Remove image from product
    product.images.splice(imageIndex, 1);
    
    // Save product if it still has images, otherwise delete the product
    if (product.images.length > 0) {
      await product.save();
      res.json({ message: 'Image removed' });
    } else {
      await product.remove();
      res.json({ message: 'Last image removed, product deleted' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error deleting image' });
  }
});

module.exports = {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  deleteProductImage
};