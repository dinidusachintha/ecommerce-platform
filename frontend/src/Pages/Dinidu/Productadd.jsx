import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ProductAdd = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    originalPrice: '',
    category: 'women',
    stock: ''
  });
  const [images, setImages] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  const fileInputRef = useRef(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageUpload = async (e) => {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;

    // Validate file types and sizes
    const validFiles = files.filter(file => {
      const validTypes = ['image/jpeg', 'image/png', 'image/webp'];
      const maxSize = 5 * 1024 * 1024; // 5MB
      
      if (!validTypes.includes(file.type)) {
        setError('Only JPG, PNG, and WEBP images are allowed');
        return false;
      }
      
      if (file.size > maxSize) {
        setError('Image size must be less than 5MB');
        return false;
      }
      
      return true;
    });

    if (validFiles.length === 0) return;

    // Create previews
    const previews = validFiles.map(file => URL.createObjectURL(file));
    setImagePreviews(prev => [...prev, ...previews]);
    setError('');

    // Upload to backend
    try {
      const uploadData = new FormData();
      validFiles.forEach(file => uploadData.append('images', file));

      const response = await axios.post('http://localhost:5000/api/upload', uploadData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        onUploadProgress: (progressEvent) => {
          const percentCompleted = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          setUploadProgress(percentCompleted);
        }
      });

      setImages(prev => [...prev, ...response.data.urls]);
      setUploadProgress(0); // Reset progress after completion
    } catch (error) {
      console.error('Upload failed:', error);
      setError('Image upload failed. Please try again.');
      // Remove failed upload previews
      setImagePreviews(prev => prev.slice(0, -validFiles.length));
      setUploadProgress(0);
    }
  };

  const removeImage = (index) => {
    setImages(prev => prev.filter((_, i) => i !== index));
    setImagePreviews(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate form
    if (images.length === 0) {
      setError('Please upload at least one image');
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/api/products', {
        ...formData,
        images,
        price: Number(formData.price),
        originalPrice: formData.originalPrice ? Number(formData.originalPrice) : undefined,
        stock: Number(formData.stock)
      });

      setSuccess('Product added successfully!');
      setError('');
      
      // Redirect after 2 seconds
      setTimeout(() => navigate('/'), 2000);
    } catch (error) {
      console.error('Error adding product:', error);
      setError(error.response?.data?.message || 'Failed to add product');
      setSuccess('');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="pt-24 pb-12 bg-gray-50 min-h-screen"
    >
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8 text-center">Add New Product</h1>
        
        {/* Error/Success Messages */}
        {error && (
          <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
            {error}
          </div>
        )}
        {success && (
          <div className="mb-6 p-4 bg-green-100 border border-green-400 text-green-700 rounded">
            {success}
          </div>
        )}

        <form onSubmit={handleSubmit} className="max-w-2xl mx-auto bg-white p-8 rounded-xl shadow-md">
          {/* Text Input Fields */}
          <div className="mb-6">
            <label className="block text-gray-700 font-medium mb-2">Product Name*</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-600"
              required
            />
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 font-medium mb-2">Description*</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-600"
              rows="4"
              required
            />
          </div>

          {/* Price Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-gray-700 font-medium mb-2">Price*</label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-600"
                min="0"
                step="0.01"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-2">Original Price</label>
              <input
                type="number"
                name="originalPrice"
                value={formData.originalPrice}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-600"
                min="0"
                step="0.01"
              />
            </div>
          </div>

          {/* Category and Stock */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-gray-700 font-medium mb-2">Category*</label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-600"
                required
              >
                <option value="women">Women's Collection</option>
                <option value="men">Men's Collection</option>
                <option value="kids">Kids Collection</option>
              </select>
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-2">Stock*</label>
              <input
                type="number"
                name="stock"
                value={formData.stock}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-600"
                min="0"
                required
              />
            </div>
          </div>

          {/* Image Upload Section */}
          <div className="mb-8">
            <label className="block text-gray-700 font-medium mb-2">Product Images*</label>
            
            {/* Preview Gallery */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-4">
              {imagePreviews.map((preview, index) => (
                <div key={index} className="relative group h-40">
                  <img 
                    src={preview} 
                    alt={`Preview ${index}`}
                    className="h-full w-full object-cover rounded-lg border"
                  />
                  <button
                    type="button"
                    onClick={() => removeImage(index)}
                    className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                    aria-label="Remove image"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>

            {/* Upload Progress */}
            {uploadProgress > 0 && uploadProgress < 100 && (
              <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
                <div 
                  className="bg-pink-600 h-2.5 rounded-full" 
                  style={{ width: `${uploadProgress}%` }}
                ></div>
              </div>
            )}

            {/* Upload Controls */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <div>
                <button
                  type="button"
                  onClick={() => fileInputRef.current.click()}
                  className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  Select Images
                </button>
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleImageUpload}
                  className="hidden"
                  multiple
                  accept="image/jpeg, image/png, image/webp"
                />
              </div>
              <div className="text-sm text-gray-500">
                {images.length > 0 ? (
                  <span>{images.length} {images.length === 1 ? 'image' : 'images'} selected</span>
                ) : (
                  <span>No images selected (required)</span>
                )}
              </div>
            </div>
            <p className="mt-2 text-xs text-gray-500">
              Supported formats: JPG, PNG, WEBP (Max 5MB each)
            </p>
          </div>

          {/* Form Actions */}
          <div className="flex justify-end gap-4 pt-4 border-t">
            <button
              type="button"
              onClick={() => navigate('/')}
              className="px-6 py-2 text-gray-600 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 text-white bg-pink-600 rounded-lg hover:bg-pink-700 transition-colors disabled:opacity-50"
              disabled={images.length === 0}
            >
              Add Product
            </button>
          </div>
        </form>
      </div>
    </motion.div>
  );
};

export default ProductAdd;