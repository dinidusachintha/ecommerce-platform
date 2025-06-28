import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Link } from 'react-router-dom';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';
import axios from 'axios';

const CategorySection = () => {
  const [activeCategory, setActiveCategory] = useState("women");
  const [cart, setCart] = useState([]);
  const [isMobile, setIsMobile] = useState(false);
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch categories and products from backend
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Fetch categories
        const categoriesRes = await axios.get('/api/categories');
        setCategories(categoriesRes.data);
        
        // Fetch products for each category
        const productsData = {};
        for (const category of categoriesRes.data) {
          const productsRes = await axios.get(`/api/products?category=${category.id}`);
          productsData[category.id] = productsRes.data;
        }
        setProducts(productsData);
        
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Check screen size
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Add to cart with quantity
  const addToCart = async (product) => {
    try {
      await axios.post('/api/cart', {
        productId: product._id,
        quantity: 1
      });
      
      const existingItem = cart.find(item => item._id === product._id);
      
      if (existingItem) {
        setCart(cart.map(item =>
          item._id === product._id 
            ? { ...item, quantity: item.quantity + 1 }
            : item
        ));
      } else {
        setCart([...cart, { ...product, quantity: 1 }]);
      }
      
      // Animation feedback
      const button = document.getElementById(`add-to-cart-${product._id}`);
      if (button) {
        button.classList.add('animate-ping');
        setTimeout(() => button.classList.remove('animate-ping'), 500);
      }
    } catch (err) {
      console.error('Error adding to cart:', err);
    }
  };

  // Quick view modal state
  const [quickViewProduct, setQuickViewProduct] = useState(null);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-8 h-8 border-4 border-blue-500 rounded-full animate-spin border-t-transparent"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 text-center text-red-500">
        Error loading products: {error}
      </div>
    );
  }

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

  return (
    <motion.div 
      className="py-12 bg-gray-50"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <div className="container px-4 mx-auto">
        {/* ... rest of your JSX remains the same, just replace hardcoded data with dynamic data ... */}
        
        {/* Example of dynamic rendering: */}
        {categories.map((category) => (
          <motion.button
            key={category._id}
            onClick={() => setActiveCategory(category.id)}
            // ... rest of button props
          >
            {category.name}
          </motion.button>
        ))}
        
        {/* Dynamic products rendering */}
        {products[activeCategory]?.map((product) => (
          <motion.div key={product._id}>
            {/* ... product card JSX ... */}
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default CategorySection;