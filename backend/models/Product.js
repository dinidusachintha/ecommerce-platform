const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: [true, 'Product name is required'],
    trim: true,
    maxlength: [100, 'Product name cannot exceed 100 characters']
  },
  price: { 
    type: Number, 
    required: [true, 'Product price is required'],
    min: [0, 'Price must be at least 0']
  },
  description: { 
    type: String, 
    required: [true, 'Product description is required'],
    trim: true
  },
  category: { 
    type: String, 
    required: [true, 'Product category is required'],
    enum: {
      values: ['women', 'men', 'kids'],
      message: 'Please select correct category'
    }
  },
  colors: [{ 
    type: String,
    required: [true, 'Please add at least one color']
  }],
  sizes: [{ 
    type: String,
    required: [true, 'Please add at least one size']
  }],
  images: [{ 
    type: String,
    required: [true, 'Please upload at least one image']
  }],
  ratings: {
    type: Number,
    default: 0
  },
  numOfReviews: {
    type: Number,
    default: 0
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

module.exports = mongoose.model('Product', productSchema);