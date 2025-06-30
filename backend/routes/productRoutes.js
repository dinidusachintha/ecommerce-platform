const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const asyncHandler = require('express-async-handler');
const { v4: uuidv4 } = require('uuid');

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = path.join(__dirname, '../Uploads');
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const fileExt = path.extname(file.originalname);
    const newFilename = `${uuidv4()}${fileExt}`;
    cb(null, newFilename);
  }
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
  fileFilter: (req, file, cb) => {
    const filetypes = /jpeg|jpg|png|gif/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);
    if (mimetype && extname) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed!'));
    }
  }
});

// Mock authentication middleware (move to separate file in production)
const authenticate = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  req.user = { _id: 'mock-user-id' }; // Mock user for testing
  next();
};

// Create product
const createProduct = asyncHandler(async (req, res) => {
  const { name, price, description, category, colors, sizes } = req.body;

  if (!req.files || req.files.length === 0) {
    res.status(400);
    throw new Error('Please upload at least one image');
  }

  const colorsArray = Array.isArray(colors) ? colors : [colors].filter(Boolean);
  const sizesArray = Array.isArray(sizes) ? sizes : [sizes].filter(Boolean);

  if (colorsArray.length === 0) throw new Error('Please add at least one color');
  if (sizesArray.length === 0) throw new Error('Please add at least one size');

  const imageUrls = req.files.map(file => `/uploads/${file.filename}`);

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
});

// Get all products
router.get('/', asyncHandler(async (req, res) => {
  const { category } = req.query;
  const query = category ? { category } : {};
  const products = await Product.find(query).sort({ createdAt: -1 });
  res.json(products);
}));

// Get single product
router.get('/:id', asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    res.status(404);
    throw new Error('Product not found');
  }
  res.json(product);
}));

// Update product
router.put('/:id', authenticate, upload.array('images', 5), asyncHandler(async (req, res) => {
  const { name, price, description, category, colors, sizes, existingImages } = req.body;

  // Parse arrays if they come as strings
  const colorsArray = Array.isArray(colors) ? colors : colors?.split(',').filter(Boolean) || [];
  const sizesArray = Array.isArray(sizes) ? sizes : sizes?.split(',').filter(Boolean) || [];
  const existingImagesArray = Array.isArray(existingImages) ? existingImages : existingImages?.split(',').filter(Boolean) || [];

  // Get existing product
  const product = await Product.findById(req.params.id);
  if (!product) {
    res.status(404);
    throw new Error('Product not found');
  }

  // Process new images
  const newImages = req.files ? req.files.map(file => `/uploads/${file.filename}`) : [];

  // Determine which existing images to keep
  const imagesToKeep = product.images.filter(img => existingImagesArray.includes(img));
  
  // Combine kept existing images with new images
  const updatedImages = [...imagesToKeep, ...newImages];

  // Update product
  product.name = name;
  product.price = price;
  product.description = description;
  product.category = category;
  product.colors = colorsArray;
  product.sizes = sizesArray;
  product.images = updatedImages;
  product.updatedAt = Date.now();

  const updatedProduct = await product.save();
  res.json(updatedProduct);
}));

// Delete product
router.delete('/:id', authenticate, asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    res.status(404);
    throw new Error('Product not found');
  }

  // Delete associated images
  product.images.forEach(image => {
    const imagePath = path.join(__dirname, '../Uploads', image.replace('/uploads/', ''));
    if (fs.existsSync(imagePath)) {
      fs.unlinkSync(imagePath);
    }
  });

  await product.deleteOne();
  res.json({ message: 'Product deleted' });
}));

router.post('/', authenticate, upload.array('images', 5), createProduct);

module.exports = router;