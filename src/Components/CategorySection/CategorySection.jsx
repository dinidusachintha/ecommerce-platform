import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

// Import images from your assets folder
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

  const categories = [
    {
      id: "women",
      name: "Women's Collection",
      banner: womenBanner,
      subcategories: ["Dresses", "Shoes", "Bags", "Accessories"]
    },
    {
      id: "men",
      name: "Men's Collection",
      banner: menBanner,
      subcategories: ["Shirts", "Shoes", "Watches", "Bags"]
    },
    {
      id: "kids",
      name: "Kids Collection",
      banner: kidsBanner,
      subcategories: ["Clothing", "Shoes", "Toys", "Accessories"]
    }
  ];

  const products = {
    women: [
      { id: 1, name: "Summer Dress", price: "$49.99", image: dress1 },
      { id: 2, name: "High Heels", price: "$89.99", image: heels1 },
      { id: 3, name: "Leather Bag", price: "$129.99", image: bag1 }
    ],
    men: [
      { id: 4, name: "Formal Shirt", price: "$59.99", image: shirt1 },
      { id: 5, name: "Casual Shoes", price: "$79.99", image: shoes1 },
      { id: 6, name: "Leather Wallet", price: "$39.99", image: wallet1 }
    ],
    kids: [
      { id: 7, name: "Cotton T-Shirt", price: "$19.99", image: tshirt1 },
      { id: 8, name: "Sneakers", price: "$29.99", image: sneakers1 },
      { id: 9, name: "Teddy Bear", price: "$24.99", image: teddy1 }
    ]
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
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

  return (
    <motion.div 
      className="py-12 bg-gray-50"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <div className="container px-4 mx-auto">
        <motion.h2 
          className="mb-8 text-3xl font-bold text-center"
          variants={itemVariants}
        >
          Shop by Category
        </motion.h2>
        
        {/* Category Navigation */}
        <motion.div 
          className="flex justify-center mb-12"
          variants={itemVariants}
        >
          <div className="inline-flex overflow-hidden bg-white rounded-full shadow-md">
            {categories.map((category) => (
              <motion.button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`px-6 py-3 font-medium transition-colors ${
                  activeCategory === category.id
                    ? 'bg-pink-500 text-white'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {category.name}
              </motion.button>
            ))}
          </div>
        </motion.div>
        
        {/* Featured Category Banner */}
        <motion.div 
          className="relative mb-12 overflow-hidden rounded-xl h-96"
          variants={bannerVariants}
        >
          <img
            src={categories.find(c => c.id === activeCategory)?.banner}
            alt="Category Banner"
            className="object-cover w-full h-full"
          />
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30">
            <motion.h3 
              className="text-4xl font-bold text-white"
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
          className="mb-12"
          variants={itemVariants}
        >
          <h3 className="mb-6 text-xl font-semibold">Shop by Type</h3>
          <Swiper
            spaceBetween={16}
            slidesPerView={2.5}
            breakpoints={{
              640: { slidesPerView: 3.5 },
              768: { slidesPerView: 4.5 },
              1024: { slidesPerView: 5.5 }
            }}
          >
            {categories.find(c => c.id === activeCategory)?.subcategories.map((subcat, index) => (
              <SwiperSlide key={index}>
                <motion.div 
                  className="p-4 text-center transition-shadow bg-white rounded-lg shadow-md cursor-pointer hover:shadow-lg"
                  whileHover={{ y: -5 }}
                >
                  <div className="flex items-center justify-center h-24 mb-2 bg-gray-100 rounded-md">
                    <span className="text-gray-400">Icon</span>
                  </div>
                  <p className="font-medium">{subcat}</p>
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
            className="mb-6 text-xl font-semibold"
            variants={itemVariants}
          >
            Featured Products
          </motion.h3>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {products[activeCategory]?.map((product, index) => (
              <motion.div 
                key={product.id}
                className="overflow-hidden transition-shadow bg-white rounded-lg shadow-md hover:shadow-lg"
                variants={itemVariants}
                custom={index}
                whileHover={{ scale: 1.03 }}
              >
                <div className="h-64 overflow-hidden">
                  <motion.img
                    src={product.image}
                    alt={product.name}
                    className="object-cover w-full h-full"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    whileHover={{ scale: 1.1 }}
                  />
                </div>
                <div className="p-4">
                  <h3 className="mb-2 text-lg font-semibold">{product.name}</h3>
                  <p className="mb-4 font-bold text-pink-500">{product.price}</p>
                  <motion.button 
                    className="w-full py-2 text-white transition-colors bg-pink-500 rounded hover:bg-pink-600"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Add to Cart
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default CategorySection;