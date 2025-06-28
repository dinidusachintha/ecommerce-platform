import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Productadd = () => {
  const navigate = useNavigate();
  const [product, setProduct] = useState({
    name: '',
    price: '',
    description: '',
    category: '',
    colors: [],
    sizes: [],
    images: [],
  });
  const [newColor, setNewColor] = useState('');
  const [newSize, setNewSize] = useState('');
  const [imagePreviews, setImagePreviews] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('/api/categories');
        const categoriesData = Array.isArray(response.data) ? response.data : [];
        setCategories(categoriesData);
        if (categoriesData.length > 0) {
          setProduct((prev) => ({ ...prev, category: categoriesData[0].id }));
        }
        setLoading(false);
      } catch (error) {
        console.error('Error fetching categories:', error);
        setErrors({ ...errors, categories: 'Failed to load categories' });
        setLoading(false);
      }
    };
    fetchCategories();
  }, []);

  // ... rest of the component (validateForm, handleInputChange, etc.)

  return (
    <div className="container px-4 py-8 mx-auto">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto"
      >
        {loading ? (
          <div className="flex items-center justify-center h-64">
            <div className="w-8 h-8 border-4 border-blue-500 rounded-full animate-spin border-t-transparent"></div>
          </div>
        ) : (
          <>
            <div className="flex items-center justify-between mb-8">
              <h1 className="text-2xl font-bold">Add New Product</h1>
              <button
                onClick={() => navigate('/admin/products')}
                className="px-4 py-2 text-gray-700 bg-gray-200 rounded hover:bg-gray-300"
              >
                Back to Products
              </button>
            </div>
            <form onSubmit={handleSubmit} className="p-6 bg-white rounded-lg shadow-md">
              {/* Basic Information */}
              <div className="mb-8">
                <h2 className="pb-2 mb-4 text-lg font-semibold border-b">Basic Information</h2>
                <div className="grid gap-6 md:grid-cols-2">
                  <div>
                    <label className="block mb-2 font-medium">Product Name*</label>
                    <input
                      type="text"
                      name="name"
                      value={product.name}
                      onChange={handleInputChange}
                      className={`w-full p-3 border rounded-lg ${
                        errors.name ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="Enter product name"
                    />
                    {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name}</p>}
                  </div>
                  <div>
                    <label className="block mb-2 font-medium">Price*</label>
                    <div className="relative">
                      <span className="absolute left-3 top-3">$</span>
                      <input
                        type="number"
                        name="price"
                        value={product.price}
                        onChange={handleInputChange}
                        step="0.01"
                        min="0"
                        className={`w-full p-3 pl-8 border rounded-lg ${
                          errors.price ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="0.00"
                      />
                    </div>
                    {errors.price && <p className="mt-1 text-sm text-red-500">{errors.price}</p>}
                  </div>
                </div>
                <div className="mt-6">
                  <label className="block mb-2 font-medium">Category*</label>
                  <select
                    name="category"
                    value={product.category}
                    onChange={handleInputChange}
                    className="w-full p-3 border border-gray-300 rounded-lg"
                  >
                    {categories.map((category) => (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                  {errors.categories && (
                    <p className="mt-1 text-sm text-red-500">{errors.categories}</p>
                  )}
                </div>
                <div className="mt-6">
                  <label className="block mb-2 font-medium">Description*</label>
                  <textarea
                    name="description"
                    value={product.description}
                    onChange={handleInputChange}
                    rows="4"
                    className={`w-full p-3 border rounded-lg ${
                      errors.description ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Enter product description"
                  ></textarea>
                  {errors.description && (
                    <p className="mt-1 text-sm text-red-500">{errors.description}</p>
                  )}
                </div>
              </div>
              {/* ... rest of the form (Colors, Sizes, Images, Submit Button) ... */}
            </form>
          </>
        )}
      </motion.div>
    </div>
  );
};

export default Productadd;