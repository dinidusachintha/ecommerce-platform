import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { X, Plus, Upload, ShoppingBag, Loader } from 'lucide-react';
import { useAddProductMutation, useUpdateProductMutation, useGetProductDetailsQuery } from '../redux/api/productApi';

const Productadd = ({ mode = 'add' }) => {
  const navigate = useNavigate();
  const { id: productId } = useParams();
  
  const [addProduct, { isLoading: isAdding }] = useAddProductMutation();
  const [updateProduct, { isLoading: isUpdating }] = useUpdateProductMutation();
  
  const { data: productData, isLoading, error } = useGetProductDetailsQuery(
    productId, 
    { skip: mode !== 'edit' }
  );

  const [product, setProduct] = useState({
    name: '',
    price: '',
    description: '',
    category: 'women',
    colors: [],
    sizes: [],
  });
  const [newColor, setNewColor] = useState('');
  const [newSize, setNewSize] = useState('');
  const [selectedImages, setSelectedImages] = useState([]);
  const [existingImages, setExistingImages] = useState([]);
  const [errors, setErrors] = useState({});

  const categories = [
    { value: 'women', label: "Women's Collection" },
    { value: 'men', label: "Men's Collection" },
    { value: 'kids', label: "Kids Collection" }
  ];

  useEffect(() => {
    if (mode === 'edit' && productData) {
      setProduct({
        name: productData.name,
        price: productData.price.toString(),
        description: productData.description,
        category: productData.category,
        colors: productData.colors,
        sizes: productData.sizes,
      });
      setExistingImages(productData.images);
    }
  }, [mode, productData]);

  const validateForm = () => {
    const newErrors = {};
    if (!product.name.trim()) newErrors.name = 'Product name is required';
    if (!product.price || isNaN(product.price) || product.price <= 0) 
      newErrors.price = 'Valid price is required';
    if (!product.description.trim()) 
      newErrors.description = 'Description is required';
    if (product.colors.length === 0) 
      newErrors.colors = 'At least one color is required';
    if (product.sizes.length === 0) 
      newErrors.sizes = 'At least one size is required';
    if (existingImages.length + selectedImages.length === 0) 
      newErrors.images = 'At least one image is required';
    
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

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    if (files.length + selectedImages.length + existingImages.length > 5) {
      toast.error('Maximum 5 images allowed');
      return;
    }
    
    const validFiles = files.filter(file => {
      if (!file.type.startsWith('image/')) {
        toast.error(`File ${file.name} is not an image`);
        return false;
      }
      if (file.size > 5 * 1024 * 1024) {
        toast.error(`File ${file.name} is too large (max 5MB)`);
        return false;
      }
      return true;
    });
    
    setSelectedImages([...selectedImages, ...validFiles]);
    if (errors.images) setErrors({ ...errors, images: '' });
  };

  const handleRemoveImage = (index, isExisting = false) => {
    if (isExisting) {
      setExistingImages(existingImages.filter((_, i) => i !== index));
    } else {
      setSelectedImages(selectedImages.filter((_, i) => i !== index));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const formData = new FormData();
    formData.append('name', product.name);
    formData.append('price', product.price);
    formData.append('description', product.description);
    formData.append('category', product.category);
    product.colors.forEach(color => formData.append('colors', color));
    product.sizes.forEach(size => formData.append('sizes', size));
    selectedImages.forEach(image => formData.append('images', image));

    try {
      if (mode === 'add') {
        await addProduct(formData).unwrap();
        toast.success('Product added successfully!');
      } else {
        await updateProduct({ productId, formData }).unwrap();
        toast.success('Product updated successfully!');
      }
      navigate('/admin/products');
    } catch (error) {
      toast.error(error?.data?.message || error.error || 'Something went wrong');
    }
  };

  if (mode === 'edit' && isLoading) {
    return <div className="flex justify-center py-8"><Loader className="animate-spin" /></div>;
  }

  if (mode === 'edit' && error) {
    return <div className="p-4 text-red-500">Error loading product: {error?.data?.message || 'Unknown error'}</div>;
  }

  return (
    <div className="container px-4 py-8 mx-auto">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-bold">
            {mode === 'add' ? 'Add New Product' : 'Edit Product'}
          </h1>
          <button 
            onClick={() => navigate('/admin/products')}
            className="flex items-center px-4 py-2 text-gray-700 bg-gray-200 rounded hover:bg-gray-300"
          >
            <X className="w-5 h-5 mr-1" /> Cancel
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

          {/* Colors */}
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
                    <X className="w-4 h-4" />
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
                onKeyPress={(e) => e.key === 'Enter' && handleAddColor()}
              />
              <button
                type="button"
                onClick={handleAddColor}
                className="flex items-center px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
              >
                <Plus className="w-5 h-5 mr-1" /> Add
              </button>
            </div>
          </div>

          {/* Sizes */}
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
                    <X className="w-4 h-4" />
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
                onKeyPress={(e) => e.key === 'Enter' && handleAddSize()}
              />
              <button
                type="button"
                onClick={handleAddSize}
                className="flex items-center px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
              >
                <Plus className="w-5 h-5 mr-1" /> Add
              </button>
            </div>
          </div>

          {/* Images */}
          <div className="mb-8">
            <h2 className="pb-2 mb-4 text-lg font-semibold border-b">Images*</h2>
            {errors.images && <p className="mt-1 text-sm text-red-500">{errors.images}</p>}
            
            <div className="grid grid-cols-2 gap-4 mb-6 sm:grid-cols-3 md:grid-cols-4">
              {existingImages.map((image, index) => (
                <div key={`existing-${index}`} className="relative group">
                  <img 
                    src={image} 
                    alt={`Product ${index}`} 
                    className="object-cover w-full h-32 rounded-lg"
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveImage(index, true)}
                    className="absolute p-1 text-white bg-red-500 rounded-full opacity-0 top-1 right-1 group-hover:opacity-100"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}

              {selectedImages.map((image, index) => (
                <div key={`new-${index}`} className="relative group">
                  <img 
                    src={URL.createObjectURL(image)} 
                    alt={image.name} 
                    className="object-cover w-full h-32 rounded-lg"
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveImage(index)}
                    className="absolute p-1 text-white bg-red-500 rounded-full opacity-0 top-1 right-1 group-hover:opacity-100"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
              
              {(existingImages.length + selectedImages.length) < 5 && (
                <label className="flex flex-col items-center justify-center h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer hover:border-gray-400">
                  <input 
                    type="file" 
                    multiple 
                    accept="image/*" 
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                  <Upload className="w-8 h-8 text-gray-400" />
                  <span className="mt-2 text-sm text-gray-500">Upload (max 5)</span>
                </label>
              )}
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end">
            <button
              type="submit"
              className="flex items-center px-6 py-3 text-white bg-green-500 rounded-lg hover:bg-green-600 disabled:opacity-50"
              disabled={isAdding || isUpdating}
            >
              {isAdding || isUpdating ? (
                <>
                  <Loader className="w-5 h-5 mr-2 animate-spin" />
                  {mode === 'add' ? 'Adding...' : 'Updating...'}
                </>
              ) : (
                <>
                  <ShoppingBag className="w-5 h-5 mr-2" />
                  {mode === 'add' ? 'Save Product' : 'Update Product'}
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Productadd;