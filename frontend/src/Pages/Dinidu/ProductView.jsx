// src/components/ProductView.js
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Star, Heart, Minus, Plus, Truck, Check, ArrowLeft } from 'lucide-react';
import axios from 'axios';
import { toast } from 'react-toastify';

const ProductView = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // State management
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [isWishlist, setIsWishlist] = useState(false);
  const [activeTab, setActiveTab] = useState('description');
  const [showSizeGuide, setShowSizeGuide] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`http://localhost:5000/api/products/${id}`);
        setProduct(response.data);
      } catch (err) {
        setError('Failed to load product');
        toast.error('Failed to load product details');
        console.error('Error fetching product:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        size={20}
        className={i < Math.floor(rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}
      />
    ));
  };

  const handleQuantityChange = (value) => {
    const newValue = parseInt(value) || 1;
    if (newValue >= 1 && newValue <= (product?.stock || 10)) {
      setQuantity(newValue);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-8 h-8 border-4 border-pink-500 rounded-full border-t-transparent animate-spin"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <p className="mb-4 text-lg text-gray-700">{error}</p>
        <button 
          onClick={() => navigate('/')}
          className="px-4 py-2 text-white bg-pink-600 rounded-lg hover:bg-pink-700"
        >
          Back to Home
        </button>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <p className="mb-4 text-lg text-gray-700">Product not found</p>
        <button 
          onClick={() => navigate('/')}
          className="px-4 py-2 text-white bg-pink-600 rounded-lg hover:bg-pink-700"
        >
          Back to Home
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container px-4 py-8 mx-auto max-w-7xl">
        {/* Breadcrumb */}
        <nav className="mb-8 text-sm">
          <div className="flex items-center space-x-2 text-gray-600">
            <button 
              onClick={() => navigate(-1)}
              className="flex items-center transition-colors hover:text-gray-800"
            >
              <ArrowLeft size={16} className="mr-1" />
              Back to Shop
            </button>
            <span>/</span>
            <span className="font-medium text-gray-800">{product.name}</span>
          </div>
        </nav>

        <div className="grid gap-12 lg:grid-cols-2">
          {/* Image Gallery */}
          <div className="space-y-4">
            <div className="relative overflow-hidden bg-white shadow-lg rounded-2xl aspect-square">
              <img 
                src={`http://localhost:5000/${product.images[selectedImage]}`}
                alt={product.name}
                className="object-cover w-full h-full"
              />
              {/* Wishlist Button */}
              <button
                onClick={() => setIsWishlist(!isWishlist)}
                className="absolute p-2 transition-shadow bg-white rounded-full shadow-md top-4 right-4 hover:shadow-lg"
              >
                <Heart 
                  size={20} 
                  className={isWishlist ? 'text-red-500 fill-current' : 'text-gray-400'}
                />
              </button>
            </div>
            
            {/* Thumbnails */}
            <div className="grid grid-cols-4 gap-3">
              {product.images.map((img, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`overflow-hidden bg-white rounded-lg aspect-square transition-all ${
                    selectedImage === index 
                      ? 'ring-2 ring-black shadow-md' 
                      : 'hover:shadow-md'
                  }`}
                >
                  <img 
                    src={`http://localhost:5000/${img}`} 
                    alt="" 
                    className="object-cover w-full h-full" 
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            {/* Brand & Title */}
            <div>
              <p className="text-lg font-medium text-gray-600">{product.brand || 'Generic Brand'}</p>
              <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>
              <div className="flex items-center mt-3 space-x-2">
                <div className="flex">
                  {renderStars(product.rating || 4.5)}
                </div>
                <span className="text-sm text-gray-600">
                  {product.rating || 4.5} ({product.reviews || 0} reviews)
                </span>
              </div>
            </div>

            {/* Price */}
            <div className="flex items-center space-x-4">
              <p className="text-3xl font-bold text-gray-900">${product.price.toFixed(2)}</p>
              {product.originalPrice && (
                <p className="text-xl text-gray-500 line-through">${product.originalPrice.toFixed(2)}</p>
              )}
            </div>

            {/* Description */}
            <p className="text-gray-700">{product.description}</p>

            {/* Color Selection */}
            {product.colors && product.colors.length > 0 && (
              <div>
                <div className="flex items-center justify-between mb-3">
                  <label className="font-medium text-gray-900">Color:</label>
                  <span className="text-sm text-gray-600">
                    {selectedColor || 'Select color'}
                  </span>
                </div>
                <div className="flex space-x-3">
                  {product.colors.map((color) => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`px-4 py-2 text-sm border rounded-lg transition-all ${
                        selectedColor === color 
                          ? 'border-pink-500 bg-pink-50 text-pink-600' 
                          : 'border-gray-300 hover:border-gray-500'
                      }`}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Size Selection */}
            {product.sizes && product.sizes.length > 0 && (
              <div>
                <div className="flex items-center justify-between mb-3">
                  <label className="font-medium text-gray-900">Size:</label>
                  <button 
                    onClick={() => setShowSizeGuide(!showSizeGuide)}
                    className="text-sm text-gray-600 underline hover:text-gray-800"
                  >
                    Size Guide
                  </button>
                </div>
                <div className="grid grid-cols-5 gap-2">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`py-3 border rounded-lg font-medium transition-all ${
                        selectedSize === size 
                          ? 'bg-black text-white border-black' 
                          : 'border-gray-300 hover:border-gray-500 hover:bg-gray-50'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity */}
            <div>
              <label className="block mb-3 font-medium text-gray-900">Quantity:</label>
              <div className="flex items-center space-x-4">
                <div className="flex border border-gray-300 rounded-lg">
                  <button 
                    onClick={() => handleQuantityChange(quantity - 1)}
                    className="p-2 hover:bg-gray-100 disabled:opacity-50"
                    disabled={quantity <= 1}
                  >
                    <Minus size={16} />
                  </button>
                  <input
                    type="number"
                    value={quantity}
                    onChange={(e) => handleQuantityChange(e.target.value)}
                    min="1"
                    max={product.stock || 10}
                    className="w-16 py-2 text-center border-none focus:outline-none"
                  />
                  <button 
                    onClick={() => handleQuantityChange(quantity + 1)}
                    className="p-2 hover:bg-gray-100 disabled:opacity-50"
                    disabled={quantity >= (product.stock || 10)}
                  >
                    <Plus size={16} />
                  </button>
                </div>
                <span className="text-sm text-gray-600">
                  {product.stock || 10} available
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col pt-4 space-y-3">
              <button
                onClick={() => toast.success('Added to cart!')}
                className="w-full py-4 font-semibold text-white transition-colors bg-pink-600 rounded-lg hover:bg-pink-700"
              >
                Add to Cart
              </button>
              <button
                onClick={() => {
                  toast.success('Proceeding to checkout!');
                  navigate('/checkout');
                }}
                className="w-full py-4 font-semibold text-white transition-colors bg-pink-600 rounded-lg hover:bg-pink-700"
              >
                Buy Now
              </button>
            </div>

            {/* Delivery Info */}
            <div className="p-4 rounded-lg bg-green-50">
              <div className="flex items-center space-x-2 text-green-700">
                <Truck size={20} />
                <span className="font-medium">Free shipping & returns</span>
              </div>
            </div>
          </div>
        </div>

        {/* Product Tabs */}
        <div className="mt-16">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8">
              {['description', 'features', 'reviews'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`py-4 px-1 font-medium text-sm border-b-2 transition-colors ${
                    activeTab === tab 
                      ? 'border-black text-black' 
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </nav>
          </div>

          <div className="py-8">
            {activeTab === 'description' && (
              <div className="max-w-3xl">
                <h3 className="mb-4 text-xl font-semibold">Product Description</h3>
                <p className="leading-relaxed text-gray-700">{product.description}</p>
              </div>
            )}

            {activeTab === 'features' && (
              <div className="max-w-3xl">
                <h3 className="mb-4 text-xl font-semibold">Features & Details</h3>
                <div className="grid gap-4 md:grid-cols-2">
                  {(product.features || [
                    "High-quality materials",
                    "Comfortable fit",
                    "Durable construction",
                    "Machine washable"
                  ]).map((feature, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <Check size={20} className="flex-shrink-0 text-green-500" />
                      <span className="text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'reviews' && (
              <div className="max-w-4xl">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-semibold">Customer Reviews</h3>
                  <div className="flex items-center space-x-2">
                    <div className="flex">
                      {renderStars(product.rating || 4.5)}
                    </div>
                    <span className="font-medium">{product.rating || 4.5} out of 5</span>
                    <span className="text-gray-500">({product.reviews || 0} reviews)</span>
                  </div>
                </div>
                <div className="p-6 bg-white rounded-lg shadow">
                  <p className="text-gray-600">No reviews yet. Be the first to review this product!</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductView;