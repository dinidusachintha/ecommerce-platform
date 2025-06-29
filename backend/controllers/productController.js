const Product = require('../models/Product');
const asyncHandler = require('express-async-handler');
const path = require('path');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

const saveFiles = (files) => {
  return files.map(file => {
    const uploadDir = path.join(__dirname, '../uploads');
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    const fileExt = path.extname(file.originalname);
    const newFilename = `${uuidv4()}${fileExt}`;
    const filePath = path.join(uploadDir, newFilename);
    
    fs.renameSync(file.path, filePath);
    
    return `/uploads/${newFilename}`;
  });
};

const createProduct = asyncHandler(async (req, res) => {
  try {
    const { name, price, description, category, colors, sizes } = req.body;

    if (!req.files || req.files.length === 0) {
      res.status(400);
      throw new Error('Please upload at least one image');
    }

    const colorsArray = Array.isArray(colors) ? colors : [colors].filter(Boolean);
    const sizesArray = Array.isArray(sizes) ? sizes : [sizes].filter(Boolean);

    if (colorsArray.length === 0) throw new Error('Please add at least one color');
    if (sizesArray.length === 0) throw new Error('Please add at least one size');

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
    if (req.files?.length > 0) {
      req.files.forEach(file => fs.existsSync(file.path) && fs.unlinkSync(file.path));
    }
    res.status(400).json({ message: error.message });
  }
});

// Other controller methods (getProducts, getProductById, updateProduct, deleteProduct)
// ...

module.exports = {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct
};