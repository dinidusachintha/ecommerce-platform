const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const { protect, admin } = require('../middleware/authMiddleware');
const upload = require('../config/multer');

router.route('/')
  .get(productController.getProducts)
  .post(protect, admin, upload.array('images', 5), productController.createProduct);

router.route('/:id')
  .get(productController.getProductById)
  .put(protect, admin, upload.array('images', 5), productController.updateProduct)
  .delete(protect, admin, productController.deleteProduct);

module.exports = router;