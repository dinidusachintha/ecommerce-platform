import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Link } from 'react-router-dom';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';

// Import images
import womenBanner from '../../assets/images/women.png';
import menBanner from '../../assets/images/men1.png';
import kidsBanner from '../../assets/images/kid1.png';

import dress1 from '../../assets/images/women2.png';
import heels1 from '../../assets/images/women2.png';
import bag1 from '../../assets/images/women2.png';
import shirt1 from '../../assets/images/men1.png';
import shoes1 from '../../assets/images/men1.png';
import wallet1 from '../../assets/images/men1.png';
import tshirt1 from '../../assets/images/men1.png';
import sneakers1 from '../../assets/images/men1.png';
import teddy1 from '../../assets/images/men1.png';

const CategorySection = () => {
  const [activeCategory, setActiveCategory] = useState("women");
  const [cart, setCart] = useState([]);
  const [isMobile, setIsMobile] = useState(false);

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
    const existingItem = cart.find(item => item.id === product.id);
    
    if (existingItem) {
      setCart(cart.map(item =>
        item.id === product.id 
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
    
    // Animation feedback
    const button = document.getElementById(`add-to-cart-${product.id}`);
    if (button) {
      button.classList.add('animate-ping');
      setTimeout(() => button.classList.remove('animate-ping'), 500);
    }
  };

  // Quick view modal state
  const [quickViewProduct, setQuickViewProduct] = useState(null);

  return (
    <motion.div 
      className="py-12 bg-gray-50"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <div className="container px-4 mx-auto">
        <motion.h2 
          className="mb-8 text-3xl font-bold text-center md:text-4xl"
          variants={itemVariants}
        >
          Shop by Category
        </motion.h2>
        
        {/* Category Navigation */}
        <motion.div 
          className="flex justify-center mb-8 md:mb-12"
          variants={itemVariants}
        >
          <div className={`inline-flex overflow-auto ${isMobile ? 'w-full px-4' : ''}`}>
            <div className={`flex ${isMobile ? 'space-x-2' : 'rounded-full shadow-md bg-white'}`}>
              {categories.map((category) => (
                <motion.button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`px-4 py-2 md:px-6 md:py-3 font-medium transition-colors ${
                    activeCategory === category.id
                      ? isMobile 
                        ? 'border-b-2 border-pink-500 text-pink-500' 
                        : 'bg-pink-500 text-white'
                      : isMobile 
                        ? 'text-gray-700' 
                        : 'text-gray-700 hover:bg-gray-100'
                  } ${isMobile ? 'text-sm whitespace-nowrap' : 'rounded-full'}`}
                  whileHover={{ scale: isMobile ? 1 : 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {category.name}
                </motion.button>
              ))}
            </div>
          </div>
        </motion.div>
        
        {/* Featured Category Banner */}
        <motion.div 
          className="relative mb-8 overflow-hidden rounded-xl md:mb-12"
          variants={bannerVariants}
        >
          <img
            src={categories.find(c => c.id === activeCategory)?.banner}
            alt="Category Banner"
            className="object-cover w-full h-auto max-h-[400px] md:max-h-[600px]"
          />
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30">
            <motion.h3 
              className="px-4 text-3xl font-bold text-center text-white md:text-4xl"
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              {categories.find(c => c.id === activeCategory)?.name}
            </motion.h3>
          </div>
        </motion.div>
        
        {/* Subcategories */}
        <motion.div 
          className="mb-8 md:mb-12"
          variants={itemVariants}
        >
          <h3 className="mb-4 text-xl font-semibold md:mb-6">Shop by Type</h3>
          <Swiper
            spaceBetween={16}
            slidesPerView={isMobile ? 2.5 : 4.5}
            modules={[Autoplay]}
            autoplay={{
              delay: 3000,
              disableOnInteraction: true
            }}
            className="py-2"
          >
            {categories.find(c => c.id === activeCategory)?.subcategories.map((subcat, index) => (
              <SwiperSlide key={index}>
                <motion.div 
                  className="p-4 text-center transition-all bg-white rounded-lg shadow-md cursor-pointer hover:shadow-lg"
                  whileHover={{ y: -5, scale: 1.02 }}
                >
                  <div className="flex items-center justify-center h-20 mb-2 text-3xl bg-gray-100 rounded-md">
                    {subcat.icon}
                  </div>
                  <p className="font-medium">{subcat.name}</p>
                </motion.div>
              </SwiperSlide>
            ))}
          </Swiper>
        </motion.div>
        
        {/* Products Grid */}
        <motion.div
          variants={containerVariants}
        >
          <motion.h3 
            className="mb-4 text-xl font-semibold md:mb-6"
            variants={itemVariants}
          >
            Featured Products
          </motion.h3>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {products[activeCategory]?.map((product, index) => (
              <motion.div 
                key={product.id}
                className="overflow-hidden transition-all bg-white rounded-lg shadow-md hover:shadow-lg group"
                variants={itemVariants}
                custom={index}
                whileHover={{ scale: 1.02 }}
              >
                <Link to={`/product/${product.id}`} className="block">
                  <div className="relative overflow-hidden">
                    <motion.img
                      src={product.image}
                      alt={product.name}
                      className="object-contain w-full h-auto max-h-[300px]"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.5 }}
                      whileHover={{ scale: 1.05 }}
                    />
                    <div className="absolute inset-0 flex items-center justify-center transition-opacity bg-black opacity-0 bg-opacity-30 group-hover:opacity-100">
                      <motion.button
                        className="px-4 py-2 text-white bg-pink-500 rounded hover:bg-pink-600"
                        onClick={(e) => {
                          e.preventDefault();
                          setQuickViewProduct(product);
                        }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        Quick View
                      </motion.button>
                    </div>
                  </div>
                </Link>
                <div className="p-4">
                  <Link to={`/product/${product.id}`}>
                    <h3 className="mb-1 text-lg font-semibold hover:text-pink-500">{product.name}</h3>
                    <p className="text-sm text-gray-500 line-clamp-2">{product.description}</p>
                  </Link>
                  <div className="flex items-center justify-between mt-3">
                    <p className="font-bold text-pink-500">${product.price.toFixed(2)}</p>
                    <motion.button 
                      id={`add-to-cart-${product.id}`}
                      className="px-3 py-1 text-sm text-white transition-colors bg-pink-500 rounded md:px-4 md:py-2 hover:bg-pink-600"
                      onClick={() => addToCart(product)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Add to Cart
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Quick View Modal */}
      {quickViewProduct && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
    <motion.div 
      className="relative w-full max-w-4xl mx-4 bg-white rounded-lg shadow-xl"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
    >
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
                {quickViewProduct.quantity || 1}
              </span>
              <button 
                className="px-3 py-1 text-gray-600 hover:bg-gray-100"
                onClick={() => setQuickViewProduct({
                  ...quickViewProduct,
                  quantity: (quickViewProduct.quantity || 1) + 1
                })}
              >
                +
              </button>
            </div>
          </div>
          
          {/* Add to Cart Button */}
          <div className="flex items-center space-x-4">
            <motion.button
              className="flex-1 px-4 py-2 text-white bg-pink-500 rounded hover:bg-pink-600 disabled:bg-gray-400"
              onClick={() => {
                if (!quickViewProduct.selectedColor || !quickViewProduct.selectedSize) return;
                
                addToCart({
                  ...quickViewProduct,
                  color: quickViewProduct.selectedColor,
                  size: quickViewProduct.selectedSize,
                  quantity: quickViewProduct.quantity || 1
                });
                setQuickViewProduct(null);
              }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              disabled={!quickViewProduct.selectedColor || !quickViewProduct.selectedSize}
            >
              Add to Cart
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
    </motion.div>
  );
};

export default CategorySection;