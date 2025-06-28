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
          setProduct(prev => ({ ...prev, category: categoriesData[0].id }));
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

  const validateForm = () => {
    const newErrors = {};
    if (!product.name.trim()) newErrors.name = 'Name is required';
    if (!product.price || isNaN(product.price)) newErrors.price = 'Valid price is required';
    if (!product.description.trim()) newErrors.description = 'Description is required';
    return newErrors;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleAddColor = () => {
    if (newColor && !product.colors.includes(newColor)) {
      setProduct({ ...product, colors: [...product.colors, newColor] });
      setNewColor('');
    }
  };

  const handleAddSize = () => {
    if (newSize && !product.sizes.includes(newSize)) {
      setProduct({ ...product, sizes: [...product.sizes, newSize] });
      setNewSize('');
    }
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const newImages = [...product.images, ...files];
    setProduct({ ...product, images: newImages });

    // Create previews
    const previews = files.map(file => URL.createObjectURL(file));
    setImagePreviews([...imagePreviews, ...previews]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsSubmitting(true);
    try {
      const formData = new FormData();
      formData.append('name', product.name);
      formData.append('price', product.price);
      formData.append('description', product.description);
      formData.append('category', product.category);
      product.colors.forEach(color => formData.append('colors[]', color));
      product.sizes.forEach(size => formData.append('sizes[]', size));
      product.images.forEach(image => formData.append('images', image));

      const response = await axios.post('/api/products', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      alert('Product added successfully!');
      navigate('/admin/products'); // Redirect to products list
    } catch (error) {
      console.error('Error adding product:', error);
      alert('Failed to add product');
    } finally {
      setIsSubmitting(false);
    }
  };

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

              {/* Colors */}
              <div className="mb-8">
                <h2 className="pb-2 mb-4 text-lg font-semibold border-b">Colors</h2>
                <div className="flex items-center gap-2 mb-4">
                  <input
                    type="text"
                    value={newColor}
                    onChange={(e) => setNewColor(e.target.value)}
                    className="flex-1 p-2 border border-gray-300 rounded"
                    placeholder="Add color (e.g., Red)"
                  />
                  <button
                    type="button"
                    onClick={handleAddColor}
                    className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
                  >
                    Add
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {product.colors.map((color, index) => (
                    <div key={index} className="flex items-center px-3 py-1 bg-gray-100 rounded-full">
                      <span>{color}</span>
                      <button
                        type="button"
                        onClick={() => {
                          const newColors = [...product.colors];
                          newColors.splice(index, 1);
                          setProduct({ ...product, colors: newColors });
                        }}
                        className="ml-2 text-red-500"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Sizes */}
              <div className="mb-8">
                <h2 className="pb-2 mb-4 text-lg font-semibold border-b">Sizes</h2>
                <div className="flex items-center gap-2 mb-4">
                  <input
                    type="text"
                    value={newSize}
                    onChange={(e) => setNewSize(e.target.value)}
                    className="flex-1 p-2 border border-gray-300 rounded"
                    placeholder="Add size (e.g., M)"
                  />
                  <button
                    type="button"
                    onClick={handleAddSize}
                    className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
                  >
                    Add
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((size, index) => (
                    <div key={index} className="flex items-center px-3 py-1 bg-gray-100 rounded-full">
                      <span>{size}</span>
                      <button
                        type="button"
                        onClick={() => {
                          const newSizes = [...product.sizes];
                          newSizes.splice(index, 1);
                          setProduct({ ...product, sizes: newSizes });
                        }}
                        className="ml-2 text-red-500"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Images */}
              <div className="mb-8">
                <h2 className="pb-2 mb-4 text-lg font-semibold border-b">Images</h2>
                <input
                  type="file"
                  multiple
                  onChange={handleImageUpload}
                  className="mb-4"
                  accept="image/*"
                />
                <div className="grid grid-cols-3 gap-4">
                  {imagePreviews.map((preview, index) => (
                    <div key={index} className="relative">
                      <img src={preview} alt={`Preview ${index}`} className="object-cover w-full h-32 rounded" />
                      <button
                        type="button"
                        onClick={() => {
                          const newImages = [...product.images];
                          const newPreviews = [...imagePreviews];
                          newImages.splice(index, 1);
                          newPreviews.splice(index, 1);
                          setProduct({ ...product, images: newImages });
                          setImagePreviews(newPreviews);
                        }}
                        className="absolute top-0 right-0 p-1 text-white bg-red-500 rounded-full"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full px-6 py-3 text-white bg-blue-600 rounded-lg hover:bg-blue-700 disabled:bg-blue-400"
              >
                {isSubmitting ? 'Adding Product...' : 'Add Product'}
              </button>
            </form>
          </>
        )}
      </motion.div>
    </div>
  );
};

export default Productadd;