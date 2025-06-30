import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

const ProductUpdate = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState({
    name: '',
    price: '',
    description: '',
    category: 'women',
    colors: [],
    sizes: [],
    images: []
  });
  const [existingImages, setExistingImages] = useState([]);
  const [newImages, setNewImages] = useState([]);
  const [newColor, setNewColor] = useState('');
  const [newSize, setNewSize] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});

  const categories = [
    { value: 'women', label: "Women's Collection" },
    { value: 'men', label: "Men's Collection" },
    { value: 'kids', label: "Kids Collection" }
  ];

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(`/api/products/${id}`);
        const productData = response.data;
        
        setProduct({
          name: productData.name,
          price: productData.price,
          description: productData.description,
          category: productData.category,
          colors: [...productData.colors],
          sizes: [...productData.sizes],
          images: []
        });
        
        setExistingImages(productData.images.map(image => ({ 
          url: `/uploads/${image}`,
          name: image,
          isExisting: true 
        })));
        
        setIsLoading(false);
      } catch (error) {
        console.error("Failed to fetch product:", error);
        toast.error('Failed to load product');
        setIsLoading(false);
        navigate('/admin/products');
      }
    };

    fetchProduct();
  }, [id, navigate]);

  const validateForm = () => {
    const newErrors = {};
    if (!product.name.trim()) newErrors.name = 'Product name is required';
    if (!product.price || isNaN(product.price)) newErrors.price = 'Valid price is required';
    if (!product.description.trim()) newErrors.description = 'Description is required';
    if (product.colors.length === 0) newErrors.colors = 'At least one color is required';
    if (product.sizes.length === 0) newErrors.sizes = 'At least one size is required';
    if (existingImages.length + newImages.length === 0) newErrors.images = 'At least one image is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
    if (errors[name]) setErrors({ ...errors, [name]: '' });
  };

  const handleAddColor = () => {
    if (newColor && !product.colors.includes(newColor)) {
      setProduct({ ...product, colors: [...product.colors, newColor] });
      setNewColor('');
      if (errors.colors) setErrors({ ...errors, colors: '' });
    }
  };

  const handleRemoveColor = (colorToRemove) => {
    setProduct({ 
      ...product, 
      colors: product.colors.filter(color => color !== colorToRemove) 
    });
  };

  const handleAddSize = () => {
    if (newSize && !product.sizes.includes(newSize)) {
      setProduct({ ...product, sizes: [...product.sizes, newSize] });
      setNewSize('');
      if (errors.sizes) setErrors({ ...errors, sizes: '' });
    }
  };

  const handleRemoveSize = (sizeToRemove) => {
    setProduct({ 
      ...product, 
      sizes: product.sizes.filter(size => size !== sizeToRemove) 
    });
  };

  const handleNewImageUpload = (e) => {
    const files = Array.from(e.target.files);
    if (files.length + newImages.length > 5) {
      toast.error('Maximum 5 new images allowed');
      return;
    }

    const uploadedImages = files.map(file => ({
      file,
      url: URL.createObjectURL(file),
      isExisting: false
    }));

    setNewImages([...newImages, ...uploadedImages]);
    if (errors.images) setErrors({ ...errors, images: '' });
  };

  const handleRemoveImage = (index, isExisting) => {
    if (isExisting) {
      setExistingImages(existingImages.filter((_, i) => i !== index));
    } else {
      URL.revokeObjectURL(newImages[index].url);
      setNewImages(newImages.filter((_, i) => i !== index));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    
    try {
      const formData = new FormData();
      formData.append('name', product.name);
      formData.append('price', product.price);
      formData.append('description', product.description);
      formData.append('category', product.category);
      
      product.colors.forEach(color => formData.append('colors', color));
      product.sizes.forEach(size => formData.append('sizes', size));
      
      // Add existing images that weren't removed
      existingImages.forEach(img => formData.append('existingImages', img.name));
      
      // Add new images
      newImages.forEach(img => formData.append('images', img.file));

      await axios.put(`/api/products/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      toast.success('Product updated successfully!');
      navigate('/admin/products');
    } catch (error) {
      console.error('Error updating product:', error);
      toast.error(error.response?.data?.message || 'Failed to update product');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-8 h-8 border-4 border-blue-500 rounded-full border-t-transparent animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="container px-4 py-8 mx-auto">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto"
      >
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-bold">Edit Product</h1>
          <button 
            onClick={() => navigate('/admin/products')}
            className="px-4 py-2 text-gray-700 bg-gray-200 rounded hover:bg-gray-300"
          >
            Back to Products
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 bg-white rounded-lg shadow-md">
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
                  className={`w-full p-3 border rounded-lg ${errors.name ? 'border-red-500' : 'border-gray-300'}`}
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
                    className={`w-full p-3 pl-8 border rounded-lg ${errors.price ? 'border-red-500' : 'border-gray-300'}`}
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
                {categories.map(category => (
                  <option key={category.value} value={category.value}>
                    {category.label}
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
                className={`w-full p-3 border rounded-lg ${errors.description ? 'border-red-500' : 'border-gray-300'}`}
                placeholder="Enter product description"
              ></textarea>
              {errors.description && <p className="mt-1 text-sm text-red-500">{errors.description}</p>}
            </div>
          </div>

          <div className="mb-8">
            <h2 className="pb-2 mb-4 text-lg font-semibold border-b">Colors*</h2>
            <div className="flex flex-wrap gap-2 mb-4">
              {product.colors.map(color => (
                <div key={color} className="flex items-center px-3 py-1 bg-gray-100 rounded-full">
                  <span>{color}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveColor(color)}
                    className="ml-2 text-red-500 hover:text-red-700"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
            {errors.colors && <p className="mt-1 text-sm text-red-500">{errors.colors}</p>}
            
            <div className="flex gap-2">
              <input
                type="text"
                value={newColor}
                onChange={(e) => setNewColor(e.target.value)}
                className="flex-1 p-3 border border-gray-300 rounded-lg"
                placeholder="Add color (e.g. Red)"
              />
              <button
                type="button"
                onClick={handleAddColor}
                className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
              >
                Add
              </button>
            </div>
          </div>

          <div className="mb-8">
            <h2 className="pb-2 mb-4 text-lg font-semibold border-b">Sizes*</h2>
            <div className="flex flex-wrap gap-2 mb-4">
              {product.sizes.map(size => (
                <div key={size} className="flex items-center px-3 py-1 bg-gray-100 rounded-full">
                  <span>{size}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveSize(size)}
                    className="ml-2 text-red-500 hover:text-red-700"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
            {errors.sizes && <p className="mt-1 text-sm text-red-500">{errors.sizes}</p>}
            
            <div className="flex gap-2">
              <input
                type="text"
                value={newSize}
                onChange={(e) => setNewSize(e.target.value)}
                className="flex-1 p-3 border border-gray-300 rounded-lg"
                placeholder="Add size (e.g. M or 10)"
              />
              <button
                type="button"
                onClick={handleAddSize}
                className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
              >
                Add
              </button>
            </div>
          </div>

          <div className="mb-8">
            <h2 className="pb-2 mb-4 text-lg font-semibold border-b">Images*</h2>
            {errors.images && <p className="mt-1 text-sm text-red-500">{errors.images}</p>}
            
            <div className="mb-4">
              <h3 className="mb-2 font-medium">Existing Images</h3>
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
                {existingImages.map((image, index) => (
                  <div key={`existing-${index}`} className="relative group">
                    <img 
                      src={image.url} 
                      alt={`Product ${index}`} 
                      className="object-cover w-full h-32 rounded-lg"
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveImage(index, true)}
                      className="absolute p-1 text-white bg-red-500 rounded-full opacity-0 top-1 right-1 group-hover:opacity-100"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="mb-2 font-medium">Add New Images</h3>
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
                {newImages.map((image, index) => (
                  <div key={`new-${index}`} className="relative group">
                    <img 
                      src={image.url} 
                      alt={image.file.name} 
                      className="object-cover w-full h-32 rounded-lg"
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveImage(index, false)}
                      className="absolute p-1 text-white bg-red-500 rounded-full opacity-0 top-1 right-1 group-hover:opacity-100"
                    >
                      ×
                    </button>
                  </div>
                ))}
                
                {newImages.length < 5 && (
                  <label className="flex flex-col items-center justify-center h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer hover:border-gray-400">
                    <input 
                      type="file" 
                      multiple 
                      accept="image/*" 
                      onChange={handleNewImageUpload}
                      className="hidden"
                    />
                    <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                    <span className="mt-2 text-sm text-gray-500">Upload (max 5)</span>
                  </label>
                )}
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-4">
            <button
              type="button"
              onClick={() => navigate('/admin/products')}
              className="px-6 py-3 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300"
            >
              Cancel
            </button>
            <motion.button
              type="submit"
              className="px-6 py-3 text-white bg-green-500 rounded-lg hover:bg-green-600"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Updating...' : 'Update Product'}
            </motion.button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default ProductUpdate;