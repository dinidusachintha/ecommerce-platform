const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String, required: true },
  category: {
    type: String,
    required: true,
    enum: ['women', 'men', 'kids']
  },
  colors: [{ type: String }],
  sizes: [{ type: String }],
  images: [{ type: String }],
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // Added for createProduct
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Product', productSchema);