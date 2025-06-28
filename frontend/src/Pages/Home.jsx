import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight, X, Plus, Minus, Eye, ShoppingCart, Heart } from 'lucide-react';

const Home = () => {
  const [activeCategory, setActiveCategory] = useState("women");
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [isMobile, setIsMobile] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [showAddedNotification, setShowAddedNotification] = useState(false);
  const [isNavigating, setIsNavigating] = useState(false);
  const navigate = useNavigate();

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
      // ... other women's products
    ],
    men: [
      // ... men's products
    ],
    kids: [
      // ... kids' products
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
  const ProductCard = ({ product }) => {
    const navigate = useNavigate();

    const handleCardClick = () => {
      navigate(`/product/${product.id}`);
    };

    return (
      <div className="relative overflow-hidden transition-all duration-300 bg-white rounded-lg shadow-md group hover:shadow-xl">
        {/* Product image with click handler */}
        <div className="relative overflow-hidden cursor-pointer" onClick={handleCardClick}>
          <img
            src={product.image}
            alt={product.name}
            className="object-cover w-full h-64 transition-transform duration-300 group-hover:scale-105"
          />
        </div>

        {/* Product info */}
        <div className="p-4 cursor-pointer" onClick={handleCardClick}>
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
        </div>

        {/* Add to cart button */}
        <div className="p-4 pt-0">
          <button
            onClick={(e) => {
              e.stopPropagation();
              addToCart(product);
            }}
            className="flex items-center justify-center w-full gap-2 px-4 py-2 text-white transition-colors duration-200 bg-pink-600 rounded-lg hover:bg-pink-700"
          >
            <ShoppingCart className="w-4 h-4" />
            Add to Cart
          </button>
        </div>
      </div>
    );
  };

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
      </div>
    </div>
  );
};

export default Home;