const Product = require('../models/Product');
const asyncHandler = require('express-async-handler');
const path = require('path');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

// Helper function to save files
const saveFiles = (files) => {
  return files.map(file => {
    // Create uploads directory if it doesn't exist
    const uploadDir = path.join(__dirname, '../uploads');
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    // Create a new filename to prevent conflicts
    const fileExt = path.extname(file.originalname);
    const newFilename = `${uuidv4()}${fileExt}`;
    const filePath = path.join(uploadDir, newFilename);
    
    // Move the file to uploads directory
    fs.renameSync(file.path, filePath);
    
    // Return relative path for the database
    return `/uploads/${newFilename}`;
  });
};

// @desc    Create a product
// @route   POST /api/products
// @access  Private/Admin
const createProduct = asyncHandler(async (req, res) => {
  try {
    const { name, price, description, category, colors, sizes } = req.body;

    if (!req.files || req.files.length === 0) {
      res.status(400);
      throw new Error('Please upload at least one image');
    }

    // Validate required fields
    if (!name || !price || !description || !category) {
      res.status(400);
      throw new Error('Please fill all required fields');
    }

    // Validate colors and sizes are arrays
    const colorsArray = Array.isArray(colors) ? colors : [colors].filter(Boolean);
    const sizesArray = Array.isArray(sizes) ? sizes : [sizes].filter(Boolean);

    if (colorsArray.length === 0) {
      res.status(400);
      throw new Error('Please add at least one color');
    }

    if (sizesArray.length === 0) {
      res.status(400);
      throw new Error('Please add at least one size');
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
    // Delete any uploaded files if there was an error
    if (req.files && req.files.length > 0) {
      req.files.forEach(file => {
        if (fs.existsSync(file.path)) {
          fs.unlinkSync(file.path);
        }
      });
    }
    throw error;
  }
});

// @desc    Get all products
// @route   GET /api/products
// @access  Public
const getProducts = asyncHandler(async (req, res) => {
  const pageSize = 10;
  const page = Number(req.query.pageNumber) || 1;
  
  const keyword = req.query.keyword ? {
    $or: [
      { name: { $regex: req.query.keyword, $options: 'i' } },
      { description: { $regex: req.query.keyword, $options: 'i' } },
      { category: { $regex: req.query.keyword, $options: 'i' } }
    ]
  } : {};

  const count = await Product.countDocuments({ ...keyword });
  const products = await Product.find({ ...keyword })
    .limit(pageSize)
    .skip(pageSize * (page - 1))
    .sort({ createdAt: -1 });

  res.json({
    products,
    page,
    pages: Math.ceil(count / pageSize),
    count
  });
});

// @desc    Get single product
// @route   GET /api/products/:id
// @access  Public
const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    res.json(product);
  } else {
    res.status(404);
    throw new Error('Product not found');
  }
});

// @desc    Update a product
// @route   PUT /api/products/:id
// @access  Private/Admin
const updateProduct = asyncHandler(async (req, res) => {
  const { name, price, description, category, colors, sizes } = req.body;

  const product = await Product.findById(req.params.id);

  if (!product) {
    res.status(404);
    throw new Error('Product not found');
  }

  let imageUrls = [...product.images];

  // Handle new image uploads if any
  if (req.files && req.files.length > 0) {
    const newImageUrls = saveFiles(req.files);
    imageUrls = [...imageUrls, ...newImageUrls];
  }

  // Handle image deletions if any
  if (req.body.deletedImages && req.body.deletedImages.length > 0) {
    // Delete files from server
    req.body.deletedImages.forEach(imagePath => {
      const fullPath = path.join(__dirname, '../', imagePath);
      if (fs.existsSync(fullPath)) {
        fs.unlinkSync(fullPath);
      }
    });
    // Remove from array
    imageUrls = imageUrls.filter(img => !req.body.deletedImages.includes(img));
  }

  // Validate colors and sizes are arrays
  const colorsArray = Array.isArray(colors) ? colors : [colors].filter(Boolean);
  const sizesArray = Array.isArray(sizes) ? sizes : [sizes].filter(Boolean);

  product.name = name || product.name;
  product.price = price || product.price;
  product.description = description || product.description;
  product.category = category || product.category;
  product.colors = colorsArray.length > 0 ? colorsArray : product.colors;
  product.sizes = sizesArray.length > 0 ? sizesArray : product.sizes;
  product.images = imageUrls;

  const updatedProduct = await product.save();
  res.json(updatedProduct);
});

// @desc    Delete a product
// @route   DELETE /api/products/:id
// @access  Private/Admin
const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    res.status(404);
    throw new Error('Product not found');
  }

  // Delete images from server
  product.images.forEach(imagePath => {
    const fullPath = path.join(__dirname, '../', imagePath);
    if (fs.existsSync(fullPath)) {
      fs.unlinkSync(fullPath);
    }
  });

  await product.remove();
  res.json({ message: 'Product removed' });
});

module.exports = {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct
};