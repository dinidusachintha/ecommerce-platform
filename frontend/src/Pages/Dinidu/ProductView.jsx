import React, { useState } from 'react';
import { Star, Heart, Minus, Plus, Truck, Check, ArrowLeft } from 'lucide-react';

const ProductView = () => {
  // Product data - in a real app, this would come from props or API
  const product = {
    id: 1,
    name: "Premium Leather Jacket",
    brand: "Gucci",
    price: 1299.99,
    discountPrice: 999.99,
    description: "Luxurious genuine leather jacket with premium stitching and custom hardware. Designed for both style and durability, this jacket combines Italian craftsmanship with contemporary design.",
    features: [
      "100% Genuine Leather",
      "Italian craftsmanship",
      "Silver-tone hardware",
      "Internal pocket",
      "Adjustable waist straps",
      "Breathable lining",
      "Water-resistant coating"
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: [
      { name: "Black", value: "#000000" },
      { name: "Brown", value: "#8B4513" },
      { name: "Navy", value: "#000080" }
    ],
    rating: 4.8,
    reviews: 142,
    stock: 15,
    sku: "GC-LJ-2023",
    delivery: "Free shipping & returns",
    careInstructions: "Dry clean only. Store in cool, dry place. Use leather conditioner monthly."
  };

  // Generate placeholder images
  const generateImage = (color, index) => {
    const colors = ['f3f4f6', 'e5e7eb', 'd1d5db', '9ca3af'];
    return `https://via.placeholder.com/600x600/${colors[index % colors.length]}/666666?text=Product+Image+${index + 1}`;
  };

  const productImages = Array.from({ length: 4 }, (_, i) => generateImage('gray', i));

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
    if (!selectedColor) {
      alert("Please select a color");
      return;
    }
    alert(`${quantity} x ${product.name} (${selectedSize}, ${selectedColor.name}) added to cart`);
  };

  const discountPercentage = product.discountPrice 
    ? Math.round((1 - product.discountPrice / product.price) * 100)
    : 0;

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        size={20}
        className={i < Math.floor(rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}
      />
    ));
  };

  const sizeGuideData = [
    { size: 'XS', chest: '34-36', length: '26' },
    { size: 'S', chest: '36-38', length: '27' },
    { size: 'M', chest: '38-40', length: '28' },
    { size: 'L', chest: '40-42', length: '29' },
    { size: 'XL', chest: '42-44', length: '30' }
  ];

  const mockReviews = [
    {
      name: "John D.",
      rating: 5,
      title: "Outstanding quality!",
      comment: "The leather is incredibly soft and well-crafted. Perfect fit and style.",
      date: "March 15, 2024",
      verified: true
    },
    {
      name: "Sarah M.",
      rating: 4,
      title: "Great jacket, runs small",
      comment: "Beautiful jacket but consider sizing up. The quality is definitely worth the price.",
      date: "February 28, 2024",
      verified: true
    },
    {
      name: "Mike R.",
      rating: 5,
      title: "Perfect for everyday wear",
      comment: "Versatile and durable. I've been wearing it daily for months and it still looks new.",
      date: "January 10, 2024",
      verified: true
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container px-4 py-8 mx-auto max-w-7xl">
        {/* Breadcrumb */}
        <nav className="mb-8 text-sm">
          <div className="flex items-center space-x-2 text-gray-600">
            <button className="flex items-center transition-colors hover:text-gray-800">
              <ArrowLeft size={16} className="mr-1" />
              Back to Shop
            </button>
            <span>/</span>
            <span>Jackets</span>
            <span>/</span>
            <span className="font-medium text-gray-800">{product.name}</span>
          </div>
        </nav>

        <div className="grid gap-12 lg:grid-cols-2">
          {/* Image Gallery */}
          <div className="space-y-4">
            <div className="relative overflow-hidden bg-white shadow-lg rounded-2xl aspect-square">
              <img 
                src={productImages[selectedImage]} 
                alt={product.name}
                className="object-cover w-full h-full"
              />
              {/* Badges */}
              <div className="absolute flex gap-2 top-4 left-4">
                {product.discountPrice && (
                  <span className="px-3 py-1 text-xs font-bold text-white bg-red-500 rounded-full">
                    SAVE {discountPercentage}%
                  </span>
                )}
                {product.stock < 5 && (
                  <span className="px-3 py-1 text-xs font-bold text-white bg-orange-500 rounded-full">
                    LOW STOCK
                  </span>
                )}
              </div>
              
              {/* Wishlist Button */}
              <button
                onClick={toggleWishlist}
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
              {productImages.map((img, index) => (
                <button
                  key={index}
                  onClick={() => handleImageSelect(index)}
                  className={`overflow-hidden bg-white rounded-lg aspect-square transition-all ${
                    selectedImage === index 
                      ? 'ring-2 ring-black shadow-md' 
                      : 'hover:shadow-md'
                  }`}
                >
                  <img src={img} alt="" className="object-cover w-full h-full" />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            {/* Brand & Title */}
            <div>
              <p className="text-lg font-medium text-gray-600">{product.brand}</p>
              <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>
              <div className="flex items-center mt-3 space-x-2">
                <div className="flex">
                  {renderStars(product.rating)}
                </div>
                <span className="text-sm text-gray-600">
                  {product.rating} ({product.reviews} reviews)
                </span>
              </div>
            </div>

            {/* Price */}
            <div className="flex items-center space-x-4">
              {product.discountPrice ? (
                <>
                  <p className="text-3xl font-bold text-gray-900">${product.discountPrice.toFixed(2)}</p>
                  <p className="text-xl text-gray-500 line-through">${product.price.toFixed(2)}</p>
                  <p className="px-3 py-1 text-sm font-bold text-white bg-red-500 rounded-full">
                    {discountPercentage}% OFF
                  </p>
                </>
              ) : (
                <p className="text-3xl font-bold text-gray-900">${product.price.toFixed(2)}</p>
              )}
            </div>

            {/* Color Selection */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <label className="font-medium text-gray-900">Color:</label>
                <span className="text-sm text-gray-600">
                  {selectedColor ? selectedColor.name : 'Select color'}
                </span>
              </div>
              <div className="flex space-x-3">
                {product.colors.map((color) => (
                  <button
                    key={color.name}
                    onClick={() => handleColorSelect(color)}
                    className={`w-10 h-10 rounded-full border-2 transition-all ${
                      selectedColor?.name === color.name 
                        ? 'border-gray-800 shadow-lg scale-110' 
                        : 'border-gray-300 hover:border-gray-500'
                    }`}
                    style={{ backgroundColor: color.value }}
                    title={color.name}
                  />
                ))}
              </div>
            </div>

            {/* Size Selection */}
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
                    onClick={() => handleSizeSelect(size)}
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
              
              {/* Size Guide Modal */}
              {showSizeGuide && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
                  <div className="w-full max-w-md p-6 bg-white rounded-2xl">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold">Size Guide</h3>
                      <button 
                        onClick={() => setShowSizeGuide(false)}
                        className="text-gray-500 hover:text-gray-700"
                      >
                        ×
                      </button>
                    </div>
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b">
                          <th className="py-2 text-left">Size</th>
                          <th className="py-2 text-left">Chest (in)</th>
                          <th className="py-2 text-left">Length (in)</th>
                        </tr>
                      </thead>
                      <tbody>
                        {sizeGuideData.map((row, index) => (
                          <tr key={index} className="border-b last:border-b-0">
                            <td className="py-2 font-medium">{row.size}</td>
                            <td className="py-2">{row.chest}</td>
                            <td className="py-2">{row.length}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>

            {/* Quantity & Stock */}
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
                    onChange={(e) => handleQuantityChange(parseInt(e.target.value) || 1)}
                    min="1"
                    max={product.stock}
                    className="w-16 py-2 text-center border-none focus:outline-none"
                  />
                  <button 
                    onClick={() => handleQuantityChange(quantity + 1)}
                    className="p-2 hover:bg-gray-100 disabled:opacity-50"
                    disabled={quantity >= product.stock}
                  >
                    <Plus size={16} />
                  </button>
                </div>
                <span className="text-sm text-gray-600">
                  {product.stock} available
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col pt-4 space-y-3">
              <button
                onClick={handleAddToCart}
                className="w-full py-4 font-semibold text-white transition-colors bg-black rounded-lg hover:bg-gray-800"
              >
                Add to Cart
              </button>
              <button
                onClick={() => {
                  handleAddToCart();
                }}
                className="w-full py-4 font-semibold text-white transition-colors bg-blue-600 rounded-lg hover:bg-blue-700"
              >
                Buy Now
              </button>
            </div>

            {/* Delivery Info */}
            <div className="p-4 rounded-lg bg-green-50">
              <div className="flex items-center space-x-2 text-green-700">
                <Truck size={20} />
                <span className="font-medium">{product.delivery}</span>
              </div>
              <div className="flex items-center mt-2 space-x-2 text-sm text-green-600">
                <Check size={16} />
                <span>SKU: {product.sku}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Product Tabs */}
        <div className="mt-16">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8">
              {['description', 'features', 'reviews', 'care'].map((tab) => (
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
                  {product.features.map((feature, index) => (
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
                      {renderStars(product.rating)}
                    </div>
                    <span className="font-medium">{product.rating} out of 5</span>
                    <span className="text-gray-500">({product.reviews} reviews)</span>
                  </div>
                </div>
                
                <div className="space-y-6">
                  {mockReviews.map((review, index) => (
                    <div key={index} className="p-6 border border-gray-200 rounded-lg">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center space-x-3">
                          <div className="flex">
                            {renderStars(review.rating)}
                          </div>
                          <span className="font-medium">{review.name}</span>
                          {review.verified && (
                            <span className="px-2 py-1 text-xs text-green-700 bg-green-100 rounded-full">
                              Verified Buyer
                            </span>
                          )}
                        </div>
                        <span className="text-sm text-gray-500">{review.date}</span>
                      </div>
                      <h4 className="mb-2 font-medium">{review.title}</h4>
                      <p className="text-gray-700">{review.comment}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'care' && (
              <div className="max-w-3xl">
                <h3 className="mb-4 text-xl font-semibold">Care Instructions</h3>
                <div className="p-6 rounded-lg bg-blue-50">
                  <p className="text-blue-800">{product.careInstructions}</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Related Products */}
        <div className="mt-16">
          <h3 className="mb-6 text-2xl font-semibold">You May Also Like</h3>
          <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
            {Array.from({ length: 4 }, (_, i) => (
              <div key={i} className="p-4 transition-shadow bg-white shadow-sm rounded-xl hover:shadow-md">
                <div className="mb-4 bg-gray-100 rounded-lg aspect-square"></div>
                <h4 className="mb-1 font-medium">Related Product {i + 1}</h4>
                <p className="mb-2 text-gray-600">$99.99</p>
                <button className="w-full py-2 text-gray-700 transition-colors bg-gray-100 rounded-lg hover:bg-gray-200">
                  Quick View
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductView;