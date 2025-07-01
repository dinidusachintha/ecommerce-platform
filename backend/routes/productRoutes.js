const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth');
const multer = require('multer');
const path = require('path');
const Product = require('../models/Product');

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'Uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});
const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    if (!file.mimetype.startsWith('image/')) {
      return cb(new Error('Only image files are allowed'));
    }
    if (file.size > 5 * 1024 * 1024) { // 5MB limit
      return cb(new Error('File size exceeds 5MB limit'));
    }
    cb(null, true);
  },
  limits: { fileSize: 5 * 1024 * 1024 } // 5MB limit
});

// POST /api/products - Create a new product (protected)
router.post('/', authMiddleware, upload.array('images', 5), async (req, res) => {
  try {
    const { name, price, description, category, colors, sizes } = req.body;
    
    // Validate required fields
    if (!name || !price || !description || !category) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    // Convert colors and sizes to arrays if they are strings
    const parsedColors = Array.isArray(colors) ? colors : colors ? [colors] : [];
    const parsedSizes = Array.isArray(sizes) ? sizes : sizes ? [sizes] : [];

    const images = req.files.map(file => `/Uploads/${file.filename}`);

    const product = new Product({
      name,
      price: parseFloat(price),
      description,
      category,
      colors: parsedColors,
      sizes: parsedSizes,
      images
    });

    await product.save();
    res.status(201).json(product);
  } catch (error) {
    console.error('Error creating product:', error);
    res.status(500).json({ message: 'Error creating product', error: error.message });
  }
});

// GET /api/products - Get all products (public)
router.get('/', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ message: 'Error fetching products', error: error.message });
  }
});

module.exports = router;