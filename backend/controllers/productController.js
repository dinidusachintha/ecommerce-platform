const Product = require('../models/Product');
const asyncHandler = require('express-async-handler');
const cloudinary = require('cloudinary').v2;

// Configure Cloudinary (you'll need to set up your credentials)
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
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

// @desc    Create a product
// @route   POST /api/products
// @access  Private/Admin
const createProduct = asyncHandler(async (req, res) => {
  const { name, price, description, category, colors, sizes } = req.body;

  // Upload images to Cloudinary
  const imageUploads = req.files.map(file => 
    cloudinary.uploader.upload(file.path, {
      folder: 'ecommerce/products',
      transformation: { width: 800, height: 800, crop: 'limit' }
    })
  );

  const uploadedImages = await Promise.all(imageUploads);
  const imageUrls = uploadedImages.map(img => img.secure_url);

  const product = new Product({
    name,
    price,
    description,
    category,
    colors: Array.isArray(colors) ? colors : [colors],
    sizes: Array.isArray(sizes) ? sizes : [sizes],
    images: imageUrls,
    user: req.user._id
  });

  const createdProduct = await product.save();
  res.status(201).json(createdProduct);
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
    const imageUploads = req.files.map(file => 
      cloudinary.uploader.upload(file.path, {
        folder: 'ecommerce/products',
        transformation: { width: 800, height: 800, crop: 'limit' }
      })
    );
    const uploadedImages = await Promise.all(imageUploads);
    imageUrls = [...imageUrls, ...uploadedImages.map(img => img.secure_url)];
  }

  // Handle image deletions if any
  if (req.body.deletedImages && req.body.deletedImages.length > 0) {
    // Delete from Cloudinary
    await Promise.all(
      req.body.deletedImages.map(publicId => 
        cloudinary.uploader.destroy(publicId)
      )
    );
    // Remove from array
    imageUrls = imageUrls.filter(img => !req.body.deletedImages.includes(img));
  }

  product.name = name;
  product.price = price;
  product.description = description;
  product.category = category;
  product.colors = Array.isArray(colors) ? colors : [colors];
  product.sizes = Array.isArray(sizes) ? sizes : [sizes];
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

  // Delete images from Cloudinary
  await Promise.all(
    product.images.map(publicId => 
      cloudinary.uploader.destroy(publicId)
    )
  );

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