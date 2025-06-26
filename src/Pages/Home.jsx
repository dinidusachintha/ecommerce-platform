import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Link, useNavigate } from 'react-router-dom';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';

// Import images
import womenBanner from '../assets/images/women1.png';
import menBanner from '../assets/images/women1.png';
import kidsBanner from '../assets/images/women1.png';

import dress1 from '../assets/images/women1.png';
import heels1 from '../assets/images/women1.png';
import bag1 from '../assets/images/women1.png';
import shirt1 from '../assets/images/women1.png';
import shoes1 from '../assets/images/women1.png';
import wallet1 from '../assets/images/women1.png';
import tshirt1 from '../assets/images/women1.png';
import sneakers1 from '../assets/images/women1.png';
import teddy1 from '../assets/images/women1.png';

const CategorySection = () => {
  const [activeCategory, setActiveCategory] = useState("women");
  const [cart, setCart] = useState([]);
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
      banner: womenBanner,
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
      banner: menBanner,
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
      banner: kidsBanner,
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
        image: dress1, 
        description: "A stylish and lightweight summer dress",
        colors: ["Pink", "Blue", "White"],
        sizes: ["S", "M", "L"]
      },
      { 
        id: 2, 
        name: "High Heels", 
        price: 89.99, 
        image: heels1, 
        description: "Elegant high heels for formal occasions",
        colors: ["Black", "Nude"],
        sizes: ["36", "37", "38"]
      },
      { 
        id: 3, 
        name: "Leather Bag", 
        price: 129.99, 
        image: bag1, 
        description: "Spacious leather bag with modern design",
        colors: ["Brown", "Black"],
        sizes: ["One Size"]
      }
    ],
    men: [
      { 
        id: 4, 
        name: "Formal Shirt", 
        price: 59.99, 
        image: shirt1, 
        description: "Crisp formal shirt for office or events",
        colors: ["White", "Blue"],
        sizes: ["S", "M", "L", "XL"]
      },
      { 
        id: 5, 
        name: "Casual Shoes", 
        price: 79.99, 
        image: shoes1, 
        description: "Comfortable shoes for everyday wear",
        colors: ["White", "Black"],
        sizes: ["40", "41", "42", "43"]
      },
      { 
        id: 6, 
        name: "Leather Wallet", 
        price: 39.99, 
        image: wallet1, 
        description: "Sleek wallet with multiple compartments",
        colors: ["Black", "Brown"],
        sizes: ["One Size"]
      }
    ],
    kids: [
      { 
        id: 7, 
        name: "Cotton T-Shirt", 
        price: 19.99, 
        image: tshirt1, 
        description: "Soft cotton t-shirt in vibrant colors",
        colors: ["Red", "Blue", "Yellow"],
        sizes: ["4-5", "6-7", "8-9"]
      },
      { 
        id: 8, 
        name: "Sneakers", 
        price: 29.99, 
        image: sneakers1, 
        description: "Durable sneakers for active kids",
        colors: ["Black", "Pink", "Blue"],
        sizes: ["28", "29", "30", "31"]
      },
      { 
        id: 9, 
        name: "Teddy Bear", 
        price: 24.99, 
        image: teddy1, 
        description: "Cuddly teddy bear for kids of all ages",
        colors: ["Brown", "White"],
        sizes: ["Small", "Medium", "Large"]
      }
    ]
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        when: "beforeChildren"
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  const bannerVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  // Add to cart with quantity
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
    
    // Animation feedback
    const button = document.getElementById(`add-to-cart-${product.id}`);
    if (button) {
      button.classList.add('animate-ping');
      setTimeout(() => button.classList.remove('animate-ping'), 500);
    }
  };

  // Open quick view with default selections
  const openQuickView = (product) => {
    setQuickViewProduct({
      ...product,
      selectedColor: null,
      selectedSize: null,
      quantity: 1
    });
  };

  return (
    <motion.div 
      className="py-12 bg-gray-50"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <div className="container px-4 mx-auto">
        {/* ... (rest of your component remains the same until the quick view modal) ... */}

        {/* Quick View Modal */}
        {quickViewProduct && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <motion.div 
              className="relative w-full max-w-4xl mx-4 bg-white rounded-lg shadow-xl"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
            >
              {showAddedNotification && (
                <motion.div
                  className="absolute px-4 py-2 text-white transform -translate-x-1/2 bg-green-500 rounded-lg top-4 left-1/2"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                >
                  Added to cart!
                </motion.div>
              )}

              <button 
                className="absolute p-1 text-gray-500 top-4 right-4 hover:text-gray-700"
                onClick={() => setQuickViewProduct(null)}
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              
              <div className="grid md:grid-cols-2">
                <div className="p-6">
                  <img
                    src={quickViewProduct.image}
                    alt={quickViewProduct.name}
                    className="object-contain w-full h-auto max-h-[400px]"
                  />
                </div>
                
                <div className="p-6">
                  <h2 className="mb-2 text-2xl font-bold">{quickViewProduct.name}</h2>
                  <p className="mb-4 text-xl font-bold text-pink-500">${quickViewProduct.price.toFixed(2)}</p>
                  <p className="mb-4 text-gray-700">{quickViewProduct.description}</p>
                  
                  {/* Color Selection */}
                  <div className="mb-4">
                    <label className="block mb-2 font-medium">Colors:</label>
                    <div className="flex flex-wrap gap-2">
                      {quickViewProduct.colors.map(color => (
                        <button 
                          key={color}
                          className={`px-3 py-1 text-sm border rounded hover:bg-gray-100 ${
                            quickViewProduct.selectedColor === color 
                              ? 'border-pink-500 bg-pink-50 text-pink-600' 
                              : 'border-gray-300'
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
                    {!quickViewProduct.selectedColor && (
                      <p className="mt-1 text-sm text-red-500">Please select a color</p>
                    )}
                  </div>
                  
                  {/* Size Selection */}
                  <div className="mb-6">
                    <label className="block mb-2 font-medium">Sizes:</label>
                    <div className="flex flex-wrap gap-2">
                      {quickViewProduct.sizes.map(size => (
                        <button 
                          key={size}
                          className={`px-3 py-1 text-sm border rounded hover:bg-gray-100 ${
                            quickViewProduct.selectedSize === size 
                              ? 'border-pink-500 bg-pink-50 text-pink-600' 
                              : 'border-gray-300'
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
                    {!quickViewProduct.selectedSize && (
                      <p className="mt-1 text-sm text-red-500">Please select a size</p>
                    )}
                  </div>
                  
                  {/* Quantity Selector */}
                  <div className="mb-6">
                    <label className="block mb-2 font-medium">Quantity:</label>
                    <div className="flex items-center border rounded w-fit">
                      <button 
                        className="px-3 py-1 text-gray-600 hover:bg-gray-100"
                        onClick={() => setQuickViewProduct({
                          ...quickViewProduct,
                          quantity: Math.max(1, quickViewProduct.quantity - 1)
                        })}
                      >
                        -
                      </button>
                      <span className="w-12 px-4 py-1 text-center">
                        {quickViewProduct.quantity}
                      </span>
                      <button 
                        className="px-3 py-1 text-gray-600 hover:bg-gray-100"
                        onClick={() => setQuickViewProduct({
                          ...quickViewProduct,
                          quantity: quickViewProduct.quantity + 1
                        })}
                      >
                        +
                      </button>
                    </div>
                  </div>
                  
                  {/* Action Buttons */}
                  <div className="flex items-center gap-4">
                    <motion.button
                      className="flex-1 px-4 py-2 text-white bg-pink-500 rounded hover:bg-pink-600 disabled:bg-gray-400"
                      onClick={() => {
                        if (!quickViewProduct.selectedColor || !quickViewProduct.selectedSize) return;
                        
                        addToCart({
                          ...quickViewProduct,
                          color: quickViewProduct.selectedColor,
                          size: quickViewProduct.selectedSize,
                          quantity: quickViewProduct.quantity
                        });
                        setShowAddedNotification(true);
                        setTimeout(() => setShowAddedNotification(false), 2000);
                      }}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      disabled={!quickViewProduct.selectedColor || !quickViewProduct.selectedSize}
                    >
                      Add to Cart
                    </motion.button>

                    <motion.button
                      className="flex-1 px-4 py-2 text-white bg-black rounded hover:bg-gray-800 disabled:bg-gray-400"
                      onClick={() => {
                        if (!quickViewProduct.selectedColor || !quickViewProduct.selectedSize) return;
                        
                        setIsNavigating(true);
                        addToCart({
                          ...quickViewProduct,
                          color: quickViewProduct.selectedColor,
                          size: quickViewProduct.selectedSize,
                          quantity: quickViewProduct.quantity
                        });
                        setQuickViewProduct(null);
                        navigate('/checkout');
                      }}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      disabled={!quickViewProduct.selectedColor || !quickViewProduct.selectedSize || isNavigating}
                    >
                      {isNavigating ? 'Processing...' : 'Buy Now'}
                    </motion.button>
                  </div>
                  
                  <Link 
                    to={`/product/${quickViewProduct.id}`}
                    className="inline-block mt-4 text-pink-500 hover:underline"
                  >
                    View full details →
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default CategorySection;