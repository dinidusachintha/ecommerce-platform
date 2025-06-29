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
  colors: {
    type: [String],
    required: [true, 'Please add at least one color'],
    validate: {
      validator: function(v) {
        return v.length > 0;
      },
      message: 'Please add at least one color'
    }
  },
  sizes: {
    type: [String],
    required: [true, 'Please add at least one size'],
    validate: {
      validator: function(v) {
        return v.length > 0;
      },
      message: 'Please add at least one size'
    }
  },
  images: {
    type: [String],
    required: [true, 'Please add at least one image'],
    validate: {
      validator: function(v) {
        return v.length > 0;
      },
      message: 'Please add at least one image'
    }
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Update the updatedAt field before saving
productSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

// Indexes for better performance
productSchema.index({ name: 'text', description: 'text', category: 'text' });

module.exports = mongoose.model('Product', productSchema);