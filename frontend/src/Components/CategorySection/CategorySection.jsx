import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, X, Plus, Minus, Eye, ShoppingCart, Heart } from 'lucide-react';

const CategorySection = () => {
  const [activeCategory, setActiveCategory] = useState("women");
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [isMobile, setIsMobile] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [showAddedNotification, setShowAddedNotification] = useState(false);
  const [isNavigating, setIsNavigating] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  // Check screen size
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const categories = [
    {
      id: "women",
      name: "Women's Collection",
      banner: "https://images.unsplash.com/photo-1483985988355-763728e1935b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      subcategories: [
        { name: "Dresses", icon: "👗" },
        { name: "Shoes", icon: "👠" }, 
        { name: "Bags", icon: "👜" },
        { name: "Accessories", icon: "💍" }
      ]
    },
    {
      id: "men",
      name: "Men's Collection",
      banner: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      subcategories: [
        { name: "Shirts", icon: "👔" },
        { name: "Shoes", icon: "👞" },
        { name: "Watches", icon: "⌚" },
        { name: "Bags", icon: "💼" }
      ]
    },
    {
      id: "kids",
      name: "Kids Collection",
      banner: "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      subcategories: [
        { name: "Clothing", icon: "👶" },
        { name: "Shoes", icon: "👟" },
        { name: "Toys", icon: "🧸" },
        { name: "Accessories", icon: "🧦" }
      ]
    }
  ];

  const products = {
    women: [
      { 
        id: 1, 
        name: "Summer Dress", 
        price: 49.99, 
        originalPrice: 59.99,
        image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80", 
        description: "A stylish and lightweight summer dress perfect for any occasion",
        colors: ["Pink", "Blue", "White"],
        sizes: ["S", "M", "L", "XL"],
        rating: 4.5,
        reviews: 89
      },
      { 
        id: 2, 
        name: "High Heels", 
        price: 89.99, 
        originalPrice: 109.99,
        image: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80", 
        description: "Elegant high heels for formal occasions and special events",
        colors: ["Black", "Nude", "Red"],
        sizes: ["36", "37", "38", "39", "40"],
        rating: 4.2,
        reviews: 156
      },
      { 
        id: 3, 
        name: "Leather Bag", 
        price: 129.99, 
        originalPrice: 149.99,
        image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80", 
        description: "Spacious leather bag with modern design and premium quality",
        colors: ["Brown", "Black", "Tan"],
        sizes: ["One Size"],
        rating: 4.8,
        reviews: 203
      }
    ],
    men: [
      { 
        id: 4, 
        name: "Formal Shirt", 
        price: 59.99, 
        originalPrice: 69.99,
        image: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80", 
        description: "Crisp formal shirt perfect for office wear and special events",
        colors: ["White", "Blue", "Light Blue"],
        sizes: ["S", "M", "L", "XL", "XXL"],
        rating: 4.3,
        reviews: 127
      },
      { 
        id: 5, 
        name: "Casual Shoes", 
        price: 79.99, 
        originalPrice: 99.99,
        image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80", 
        description: "Comfortable shoes for everyday wear with premium materials",
        colors: ["White", "Black", "Brown"],
        sizes: ["40", "41", "42", "43", "44"],
        rating: 4.6,
        reviews: 184
      },
      { 
        id: 6, 
        name: "Leather Wallet", 
        price: 39.99, 
        originalPrice: 49.99,
        image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80", 
        description: "Sleek wallet with multiple compartments and RFID protection",
        colors: ["Black", "Brown", "Navy"],
        sizes: ["One Size"],
        rating: 4.4,
        reviews: 92
      }
    ],
    kids: [
      { 
        id: 7, 
        name: "Cotton T-Shirt", 
        price: 19.99, 
        originalPrice: 24.99,
        image: "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80", 
        description: "Soft cotton t-shirt in vibrant colors, perfect for active kids",
        colors: ["Red", "Blue", "Yellow", "Green"],
        sizes: ["4-5", "6-7", "8-9", "10-11"],
        rating: 4.7,
        reviews: 145
      },
      { 
        id: 8, 
        name: "Sneakers", 
        price: 29.99, 
        originalPrice: 39.99,
        image: "https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80", 
        description: "Durable sneakers designed for active kids with comfort in mind",
        colors: ["Black", "Pink", "Blue", "White"],
        sizes: ["28", "29", "30", "31", "32"],
        rating: 4.5,
        reviews: 167
      },
      { 
        id: 9, 
        name: "Teddy Bear", 
        price: 24.99, 
        originalPrice: 29.99,
        image: "https://images.unsplash.com/photo-1551963831-b3b1ca40c98e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80", 
        description: "Cuddly teddy bear made from soft, safe materials for kids of all ages",
        colors: ["Brown", "White", "Pink"],
        sizes: ["Small", "Medium", "Large"],
        rating: 4.9,
        reviews: 234
      }
    ]
  };

  // Add to cart functionality
  const addToCart = (product) => {
    const existingItem = cart.find(item => 
      item.id === product.id && 
      item.color === product.color && 
      item.size === product.size
    );
    
    if (existingItem) {
      setCart(cart.map(item =>
        item.id === product.id && 
        item.color === product.color && 
        item.size === product.size
          ? { ...item, quantity: item.quantity + (product.quantity || 1) }
          : item
      ));
    } else {
      setCart([...cart, { 
        ...product, 
        quantity: product.quantity || 1 
      }]);
    }
  };

  // Toggle wishlist
  const toggleWishlist = (productId) => {
    setWishlist(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  // Open quick view
  const openQuickView = (product) => {
    setQuickViewProduct({
      ...product,
      selectedColor: product.colors[0],
      selectedSize: product.sizes[0],
      quantity: 1
    });
  };

  // Render star rating
  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <span key={i} className={`text-sm ${i < Math.floor(rating) ? 'text-yellow-400' : 'text-gray-300'}`}>
        ★
      </span>
    ));
  };

  // Product card component
  const ProductCard = ({ product }) => (
    <div className="relative overflow-hidden transition-all duration-300 bg-white rounded-lg shadow-md group hover:shadow-xl">
      {/* Discount badge */}
      {product.originalPrice > product.price && (
        <div className="absolute z-10 px-2 py-1 text-xs font-semibold text-white bg-red-500 rounded-br-lg top-2 left-2">
          -{Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
        </div>
      )}
      
      {/* Wishlist button */}
      <button
        onClick={() => toggleWishlist(product.id)}
        className="absolute z-10 p-2 transition-colors duration-200 rounded-full top-2 right-2 hover:bg-white/20"
      >
        <Heart 
          className={`w-5 h-5 ${wishlist.includes(product.id) ? 'fill-red-500 text-red-500' : 'text-gray-600'}`} 
        />
      </button>

      {/* Product image */}
      <div className="relative overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="object-cover w-full h-64 transition-transform duration-300 group-hover:scale-105"
        />
        
        {/* Quick view overlay */}
        <div className="absolute inset-0 flex items-center justify-center transition-opacity duration-300 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100">
          <button
            onClick={() => openQuickView(product)}
            className="flex items-center gap-2 px-4 py-2 text-white transition-colors duration-200 bg-black bg-opacity-75 rounded-lg hover:bg-opacity-90"
          >
            <Eye className="w-4 h-4" />
            Quick View
          </button>
        </div>
      </div>

      {/* Product info */}
      <div className="p-4">
        <h3 className="mb-2 text-lg font-semibold text-gray-800 line-clamp-1">{product.name}</h3>
        <p className="mb-2 text-sm text-gray-600 line-clamp-2">{product.description}</p>
        
        {/* Rating */}
        <div className="flex items-center gap-2 mb-2">
          <div className="flex">{renderStars(product.rating)}</div>
          <span className="text-sm text-gray-500">({product.reviews})</span>
        </div>

        {/* Price */}
        <div className="flex items-center gap-2 mb-3">
          <span className="text-xl font-bold text-pink-600">${product.price.toFixed(2)}</span>
          {product.originalPrice > product.price && (
            <span className="text-sm text-gray-500 line-through">${product.originalPrice.toFixed(2)}</span>
          )}
        </div>

        {/* Add to cart button */}
        <button
          onClick={() => addToCart(product)}
          className="flex items-center justify-center w-full gap-2 px-4 py-2 text-white transition-colors duration-200 bg-pink-600 rounded-lg hover:bg-pink-700"
        >
          <ShoppingCart className="w-4 h-4" />
          Add to Cart
        </button>
      </div>
    </div>
  );

  return (
    <div className="py-12 bg-gray-50">
      <div className="container px-4 mx-auto">
        {/* Section Header */}
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-4xl font-bold text-gray-800">Shop by Category</h2>
          <p className="text-lg text-gray-600">Discover our latest collections across all categories</p>
        </div>

        {/* Category Navigation */}
        <div className="flex justify-center mb-8">
          <div className="flex p-1 bg-white rounded-lg shadow-md">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
                  activeCategory === category.id
                    ? 'bg-pink-600 text-white shadow-md'
                    : 'text-gray-600 hover:text-pink-600 hover:bg-pink-50'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>

        {/* Active Category Banner */}
        <div className="mb-12 overflow-hidden bg-white rounded-lg shadow-lg">
          <div className="relative h-64 md:h-80">
            <img
              src={categories.find(cat => cat.id === activeCategory)?.banner}
              alt={categories.find(cat => cat.id === activeCategory)?.name}
              className="object-cover w-full h-full"
            />
            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40">
              <div className="text-center text-white">
                <h3 className="mb-4 text-3xl font-bold md:text-4xl">
                  {categories.find(cat => cat.id === activeCategory)?.name}
                </h3>
                <div className="flex justify-center gap-4">
                  {categories.find(cat => cat.id === activeCategory)?.subcategories.map((sub) => (
                    <div key={sub.name} className="flex items-center gap-2 px-3 py-1 bg-white rounded-full bg-opacity-20">
                      <span className="text-lg">{sub.icon}</span>
                      <span className="text-sm font-medium">{sub.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {products[activeCategory]?.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* Quick View Modal */}
        {quickViewProduct && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
            <div className="relative w-full max-w-4xl bg-white rounded-lg shadow-xl max-h-[90vh] overflow-y-auto">
              {/* Success notification */}
              {showAddedNotification && (
                <div className="absolute z-10 px-4 py-2 text-white transform -translate-x-1/2 bg-green-500 rounded-lg top-4 left-1/2">
                  Added to cart!
                </div>
              )}

              {/* Close button */}
              <button 
                className="absolute z-10 p-2 text-gray-500 top-4 right-4 hover:text-gray-700"
                onClick={() => setQuickViewProduct(null)}
              >
                <X className="w-6 h-6" />
              </button>
              
              <div className="grid md:grid-cols-2">
                {/* Product Image */}
                <div className="p-6">
                  <img
                    src={quickViewProduct.image}
                    alt={quickViewProduct.name}
                    className="object-cover w-full h-auto max-h-[400px] rounded-lg"
                  />
                </div>
                
                {/* Product Details */}
                <div className="p-6">
                  <h2 className="mb-2 text-2xl font-bold">{quickViewProduct.name}</h2>
                  
                  {/* Rating */}
                  <div className="flex items-center gap-2 mb-3">
                    <div className="flex">{renderStars(quickViewProduct.rating)}</div>
                    <span className="text-sm text-gray-500">({quickViewProduct.reviews} reviews)</span>
                  </div>

                  {/* Price */}
                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-2xl font-bold text-pink-600">${quickViewProduct.price.toFixed(2)}</span>
                    {quickViewProduct.originalPrice > quickViewProduct.price && (
                      <span className="text-lg text-gray-500 line-through">${quickViewProduct.originalPrice.toFixed(2)}</span>
                    )}
                  </div>

                  <p className="mb-6 text-gray-700">{quickViewProduct.description}</p>
                  
                  {/* Color Selection */}
                  <div className="mb-4">
                    <label className="block mb-2 font-medium">Color:</label>
                    <div className="flex flex-wrap gap-2">
                      {quickViewProduct.colors.map(color => (
                        <button 
                          key={color}
                          className={`px-3 py-2 text-sm border rounded-lg transition-colors ${
                            quickViewProduct.selectedColor === color 
                              ? 'border-pink-500 bg-pink-50 text-pink-600' 
                              : 'border-gray-300 hover:border-gray-400'
                          }`}
                          onClick={() => setQuickViewProduct({
                            ...quickViewProduct,
                            selectedColor: color
                          })}
                        >
                          {color}
                        </button>
                      ))}
                    </div>
                  </div>
                  
                  {/* Size Selection */}
                  <div className="mb-6">
                    <label className="block mb-2 font-medium">Size:</label>
                    <div className="flex flex-wrap gap-2">
                      {quickViewProduct.sizes.map(size => (
                        <button 
                          key={size}
                          className={`px-3 py-2 text-sm border rounded-lg transition-colors ${
                            quickViewProduct.selectedSize === size 
                              ? 'border-pink-500 bg-pink-50 text-pink-600' 
                              : 'border-gray-300 hover:border-gray-400'
                          }`}
                          onClick={() => setQuickViewProduct({
                            ...quickViewProduct,
                            selectedSize: size
                          })}
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                  </div>
                  
                  {/* Quantity Selector */}
                  <div className="mb-6">
                    <label className="block mb-2 font-medium">Quantity:</label>
                    <div className="flex items-center border rounded-lg w-fit">
                      <button 
                        className="p-2 text-gray-600 rounded-l-lg hover:bg-gray-100"
                        onClick={() => setQuickViewProduct({
                          ...quickViewProduct,
                          quantity: Math.max(1, quickViewProduct.quantity - 1)
                        })}
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="w-12 px-4 py-2 text-center">
                        {quickViewProduct.quantity}
                      </span>
                      <button 
                        className="p-2 text-gray-600 rounded-r-lg hover:bg-gray-100"
                        onClick={() => setQuickViewProduct({
                          ...quickViewProduct,
                          quantity: quickViewProduct.quantity + 1
                        })}
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  
                  {/* Action Buttons */}
                  <div className="flex items-center gap-4">
                    <button
                      className="flex items-center justify-center flex-1 gap-2 px-6 py-3 text-white transition-colors bg-pink-600 rounded-lg hover:bg-pink-700"
                      onClick={() => {
                        addToCart({
                          ...quickViewProduct,
                          color: quickViewProduct.selectedColor,
                          size: quickViewProduct.selectedSize,
                          quantity: quickViewProduct.quantity
                        });
                        setShowAddedNotification(true);
                        setTimeout(() => setShowAddedNotification(false), 2000);
                      }}
                    >
                      <ShoppingCart className="w-4 h-4" />
                      Add to Cart
                    </button>

                    <button
                      className="flex-1 px-6 py-3 text-white transition-colors bg-black rounded-lg hover:bg-gray-800"
                      onClick={() => {
                        setIsNavigating(true);
                        addToCart({
                          ...quickViewProduct,
                          color: quickViewProduct.selectedColor,
                          size: quickViewProduct.selectedSize,
                          quantity: quickViewProduct.quantity
                        });
                        setQuickViewProduct(null);
                        // navigate('/checkout'); // Uncomment when router is available
                      }}
                      disabled={isNavigating}
                    >
                      {isNavigating ? 'Processing...' : 'Buy Now'}
                    </button>
                  </div>
                  
                  <button 
                    className="inline-block w-full mt-4 font-medium text-center text-pink-600 hover:text-pink-700"
                    onClick={() => {
                      navigate(`/product/${quickViewProduct.id}`); // Uncomment when router is available
                      console.log('Navigate to product details');
                    }}
                  >
                    View full details →
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Cart Summary */}
        {cart.length > 0 && (
          <div className="fixed z-40 bottom-4 right-4">
            <div className="p-4 bg-white border-2 border-pink-200 rounded-lg shadow-lg">
              <div className="flex items-center gap-2 mb-2">
                <ShoppingCart className="w-5 h-5 text-pink-600" />
                <span className="font-semibold">Cart ({cart.reduce((sum, item) => sum + item.quantity, 0)})</span>
              </div>
              <div className="text-sm text-gray-600">
                Total: ${cart.reduce((sum, item) => sum + (item.price * item.quantity), 0).toFixed(2)}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CategorySection;