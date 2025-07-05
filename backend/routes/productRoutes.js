const express = require('express');
const router = express.Router();
const {
  createProduct,
  getAllProducts,
  getProductDetails,
  updateProduct,
  deleteProduct
} = require('../controllers/productController');

router.route('/')
  .get(getAllProducts)
  .post(createProduct);

router.route('/:id')
  .get(getProductDetails)
  .put(updateProduct)
  .delete(deleteProduct);

module.exports = router;