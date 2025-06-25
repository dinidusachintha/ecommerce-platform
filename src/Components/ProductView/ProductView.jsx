import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useParams, useNavigate } from 'react-router-dom';

// Import images
import productMain from '../../assets/images/kid2.png';
import productAlt1 from '../../assets/images/kid2.png';
import productAlt2 from '../../assets/images/kid2.png';
import productAlt3 from '../../assets/images/kid2.png';

const ProductView = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Product data
  const product = {
    id: 1,
    name: "Premium Leather Jacket",
    brand: "Gucci",
    price: 1299.99,
    discountPrice: 999.99,
    description: "Luxurious genuine leather jacket with premium stitching and custom hardware. Designed for both style and durability.",
    features: [
      "100% Genuine Leather",
      "Italian craftsmanship",
      "Silver-tone hardware",
      "Internal pocket",
      "Adjustable waist straps"
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["Black", "Brown", "Navy"],
    images: [productMain, productAlt1, productAlt2, productAlt3],
    rating: 4.8,
    reviews: 142,
    stock: 15,
    sku: "GC-LJ-2023",
    delivery: "Free shipping & returns",
    careInstructions: "Dry clean only. Store in cool, dry place."
  };

  // State management
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [isWishlist, setIsWishlist] = useState(false);
  const [activeTab, setActiveTab] = useState('description');
  const [showSizeGuide, setShowSizeGuide] = useState(false);

  // Handlers
  const handleImageSelect = (index) => setSelectedImage(index);
  const handleSizeSelect = (size) => setSelectedSize(size);
  const handleColorSelect = (color) => setSelectedColor(color);
  const handleQuantityChange = (value) => {
    if (value >= 1 && value <= product.stock) setQuantity(value);
  };
  const toggleWishlist = () => setIsWishlist(!isWishlist);
  const handleAddToCart = () => {
    if (!selectedSize) {
      alert("Please select a size");
      return;
    }
    alert(`${quantity} x ${product.name} (${selectedSize}) added to cart`);
  };

  // Animations
  const fadeIn = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.5 } }
  };

  const slideUp = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5 } }
  };

  return (
    <motion.div 
      className="container px-4 py-12 mx-auto bg-gray-50"
      initial="hidden"
      animate="visible"
      variants={fadeIn}
    >
      <div className="max-w-6xl mx-auto">
        {/* Breadcrumb */}
        <nav className="mb-8 text-sm">
          <ol className="flex space-x-2">
            <li><button onClick={() => navigate('/')} className="hover:underline">Home</button></li>
            <li>/</li>
            <li><button onClick={() => navigate('/shop')} className="hover:underline">Shop</button></li>
            <li>/</li>
            <li className="font-medium">{product.name}</li>
          </ol>
        </nav>

        <div className="grid gap-12 lg:grid-cols-2">
          {/* Image Gallery */}
          <motion.div variants={slideUp} className="space-y-4">
            <div className="relative overflow-hidden bg-white rounded-lg shadow-lg aspect-square">
              <img 
                src={product.images[selectedImage]} 
                alt={product.name}
                className="object-contain w-full h-full p-8"
              />
              {/* Badges */}
              <div className="absolute top-4 left-4">
                {product.discountPrice && (
                  <span className="px-3 py-1 text-xs font-bold text-white bg-red-500 rounded-full">
                    SALE
                  </span>
                )}
                {product.stock < 5 && (
                  <span className="px-3 py-1 ml-2 text-xs font-bold text-white bg-black rounded-full">
                    LOW STOCK
                  </span>
                )}
              </div>
            </div>
            
            {/* Thumbnails */}
            <div className="grid grid-cols-4 gap-3">
              {product.images.map((img, index) => (
                <motion.button
                  key={index}
                  onClick={() => handleImageSelect(index)}
                  className={`overflow-hidden bg-white rounded-md aspect-square ${selectedImage === index ? 'ring-2 ring-black' : ''}`}
                  whileHover={{ scale: 1.05 }}
                >
                  <img src={img} alt="" className="object-cover w-full h-full" />
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* Product Info */}
          <motion.div variants={slideUp} className="space-y-6">
            {/* Brand & Title */}
            <div>
              <p className="text-lg font-medium text-gray-500">{product.brand}</p>
              <h1 className="text-3xl font-bold">{product.name}</h1>
              <div className="flex items-center mt-2 space-x-2">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className={`w-5 h-5 ${i < Math.floor(product.rating) ? 'text-yellow-400' : 'text-gray-300'}`}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <span className="text-sm text-gray-500">
                  {product.rating} ({product.reviews} reviews)
                </span>
              </div>
            </div>

            {/* Price */}
            <div className="flex items-center space-x-4">
              {product.discountPrice ? (
                <>
                  <p className="text-3xl font-bold">${product.discountPrice.toFixed(2)}</p>
                  <p className="text-xl text-gray-500 line-through">${product.price.toFixed(2)}</p>
                  <p className="px-2 py-1 text-sm font-bold text-white bg-red-500 rounded">
                    {Math.round((1 - product.discountPrice / product.price) * 100)}% OFF
                  </p>
                </>
              ) : (
                <p className="text-3xl font-bold">${product.price.toFixed(2)}</p>
              )}
            </div>

            {/* Color Selection */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="font-medium">Color:</label>
                <span className="text-sm text-gray-500">{selectedColor || 'Select color'}</span>
              </div>
              <div className="flex space-x-3">
                {product.colors.map((color) => (
                  <motion.button
                    key={color}
                    onClick={() => handleColorSelect(color)}
                    className={`w-10 h-10 rounded-full border-2 ${selectedColor === color ? 'border-black' : 'border-gray-200'}`}
                    style={{ backgroundColor: color.toLowerCase() }}
                    whileHover={{ scale: 1.1 }}
                    title={color}
                  />
                ))}
              </div>
            </div>

            {/* Size Selection */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="font-medium">Size:</label>
                <button 
                  onClick={() => setShowSizeGuide(!showSizeGuide)}
                  className="text-sm text-gray-500 hover:underline"
                >
                  Size Guide
                </button>
              </div>
              <div className="grid grid-cols-5 gap-2">
                {product.sizes.map((size) => (
                  <motion.button
                    key={size}
                    onClick={() => handleSizeSelect(size)}
                    className={`py-2 border rounded-md ${selectedSize === size ? 'bg-black text-white border-black' : 'border-gray-300 hover:border-gray-500'}`}
                    whileHover={{ scale: 1.05 }}
                  >
                    {size}
                  </motion.button>
                ))}
              </div>
              {showSizeGuide && (
                <div className="p-4 mt-4 text-sm bg-gray-100 rounded-lg">
                  <h4 className="mb-2 font-medium">Size Guide</h4>
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="py-2 text-left">Size</th>
                        <th className="py-2 text-left">Chest (in)</th>
                        <th className="py-2 text-left">Length (in)</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b">
                        <td className="py-2">XS</td>
                        <td className="py-2">34-36</td>
                        <td className="py-2">26</td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-2">S</td>
                        <td className="py-2">36-38</td>
                        <td className="py-2">27</td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-2">M</td>
                        <td className="py-2">38-40</td>
                        <td className="py-2">28</td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-2">L</td>
                        <td className="py-2">40-42</td>
                        <td className="py-2">29</td>
                      </tr>
                      <tr>
                        <td className="py-2">XL</td>
                        <td className="py-2">42-44</td>
                        <td className="py-2">30</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              )}
            </div>

            {/* Quantity & Stock */}
            <div>
              <label className="block mb-2 font-medium">Quantity:</label>
              <div className="flex items-center space-x-4">
                <div className="flex border border-gray-300 rounded-md">
                  <button 
                    onClick={() => handleQuantityChange(quantity - 1)}
                    className="px-3 py-2 text-lg font-medium"
                    disabled={quantity <= 1}
                  >
                    -
                  </button>
                  <input
                    type="number"
                    value={quantity}
                    onChange={(e) => handleQuantityChange(parseInt(e.target.value))}
                    min="1"
                    max={product.stock}
                    className="w-16 py-2 text-center border-gray-300 border-x"
                  />
                  <button 
                    onClick={() => handleQuantityChange(quantity + 1)}
                    className="px-3 py-2 text-lg font-medium"
                    disabled={quantity >= product.stock}
                  >
                    +
                  </button>
                </div>
                <span className="text-sm text-gray-500">
                  {product.stock} available
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col pt-4 space-y-3">
              <motion.button
                onClick={handleAddToCart}
                className="w-full py-3 font-medium text-white bg-black rounded-md hover:bg-gray-800"
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
              >
                Add to Cart
              </motion.button>
              <motion.button
                onClick={() => {
                  handleAddToCart();
                  navigate('/checkout');
                }}
                className="w-full py-3 font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
              >
                Buy Now
              </motion.button>
              <motion.button
                onClick={toggleWishlist}
                className="flex items-center justify-center w-full py-3 font-medium border border-gray-300 rounded-md hover:bg-gray-100"
                whileHover={{ scale: 1.01 }}
              >
                {isWishlist ? (
                  <>
                    <svg className="w-5 h-5 mr-2 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                    </svg>
                    Saved to Wishlist
                  </>
                ) : (
                  <>
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                    Add to Wishlist
                  </>
                )}
              </motion.button>
            </div>

            {/* Delivery Info */}
            <div className="p-4 text-sm bg-gray-100 rounded-lg">
              <div className="flex items-center space-x-2">
                <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>{product.delivery}</span>
              </div>
              <div className="flex items-center mt-2 space-x-2">
                <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>SKU: {product.sku}</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Product Tabs */}
        <motion.div variants={slideUp} className="mt-16">
          <div className="border-b border-gray-200">
            <nav className="flex -mb-px space-x-8">
              {['description', 'features', 'reviews', 'care'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`py-4 px-1 font-medium text-sm border-b-2 ${activeTab === tab ? 'border-black text-black' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </nav>
          </div>

          <div className="py-8">
            {activeTab === 'description' && (
              <div>
                <h3 className="text-lg font-medium">Product Description</h3>
                <p className="mt-4 text-gray-600">{product.description}</p>
              </div>
            )}

            {activeTab === 'features' && (
              <div>
                <h3 className="text-lg font-medium">Features & Details</h3>
                <ul className="mt-4 space-y-2 text-gray-600">
                  {product.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <svg className="flex-shrink-0 w-5 h-5 mt-0.5 mr-2 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {activeTab === 'reviews' && (
              <div>
                <h3 className="text-lg font-medium">Customer Reviews</h3>
                <div className="mt-6 space-y-6">
                  {[...Array(3)].map((_, i) => (
                    <div key={i} className="p-4 border border-gray-200 rounded-lg">
                      <div className="flex items-center space-x-2">
                        <div className="flex">
                          {[...Array(5)].map((_, j) => (
                            <svg
                              key={j}
                              className={`w-5 h-5 ${j < 4 ? 'text-yellow-400' : 'text-gray-300'}`}
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                          ))}
                        </div>
                        <span className="text-sm font-medium">John D. - Verified Buyer</span>
                      </div>
                      <h4 className="mt-2 font-medium">Great product!</h4>
                      <p className="mt-1 text-gray-600">The quality is amazing and it fits perfectly. Definitely worth the price.</p>
                      <p className="mt-2 text-sm text-gray-400">Posted on January 15, 2023</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'care' && (
              <div>
                <h3 className="text-lg font-medium">Care Instructions</h3>
                <p className="mt-4 text-gray-600">{product.careInstructions}</p>
              </div>
            )}
          </div>
        </motion.div>

        {/* Related Products (placeholder) */}
        <motion.div variants={slideUp} className="mt-16">
          <h3 className="text-xl font-medium">You May Also Like</h3>
          <div className="grid grid-cols-2 gap-4 mt-6 md:grid-cols-4">
            {[...Array(4)].map((_, i) => (
              <motion.div 
                key={i} 
                className="p-4 transition-shadow bg-white rounded-lg shadow-sm hover:shadow-md"
                whileHover={{ y: -5 }}
              >
                <div className="mb-3 bg-gray-100 rounded-md aspect-square"></div>
                <h4 className="font-medium">Related Product {i + 1}</h4>
                <p className="text-gray-600">$99.99</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default ProductView;