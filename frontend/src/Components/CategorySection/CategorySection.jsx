import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Link } from 'react-router-dom';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';
import axios from 'axios';

const CategorySection = () => {
  const [activeCategory, setActiveCategory] = useState(null);
  const [cart, setCart] = useState([]);
  const [isMobile, setIsMobile] = useState(false);
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [refreshKey, setRefreshKey] = useState(0);

  // Check screen size
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Fetch data
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Fetch categories
        const categoriesRes = await axios.get('/api/categories');
        setCategories(categoriesRes.data);
        
        // Set active category if not set
        if (!activeCategory && categoriesRes.data.length > 0) {
          setActiveCategory(categoriesRes.data[0].id);
        }
        
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
  }, [refreshKey]);

  const handleRefresh = () => {
    setRefreshKey(prev => prev + 1);
  };

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

  return (
    <motion.div 
      className="py-12 bg-gray-50"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <div className="container px-4 mx-auto">
        <div className="flex justify-between mb-8">
          <h2 className="text-3xl font-bold">Shop by Category</h2>
          <button 
            onClick={handleRefresh}
            className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
          >
            Refresh Products
          </button>
        </div>

        {/* Category Tabs */}
        <div className="flex mb-8 overflow-x-auto">
          {categories.map((category) => (
            <motion.button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              variants={itemVariants}
              className={`px-6 py-2 mr-2 rounded-full whitespace-nowrap ${
                activeCategory === category.id
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              {category.name}
            </motion.button>
          ))}
        </div>

        {/* Products */}
        {activeCategory && (
          <motion.div 
            className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
            variants={containerVariants}
          >
            {products[activeCategory]?.map((product) => (
              <motion.div
                key={product._id}
                variants={itemVariants}
                className="overflow-hidden bg-white rounded-lg shadow-md hover:shadow-lg"
              >
                <Link to={`/products/${product._id}`}>
                  <div className="relative h-48 overflow-hidden">
                    {product.images?.[0] && (
                      <img
                        src={product.images[0]}
                        alt={product.name}
                        className="object-cover w-full h-full"
                      />
                    )}
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-800">{product.name}</h3>
                    <p className="text-gray-600">${product.price.toFixed(2)}</p>
                  </div>
                </Link>
                <div className="px-4 pb-4">
                  <button
                    id={`add-to-cart-${product._id}`}
                    onClick={() => addToCart(product)}
                    className="w-full px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
                  >
                    Add to Cart
                  </button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Empty State */}
        {activeCategory && products[activeCategory]?.length === 0 && (
          <div className="p-8 text-center bg-white rounded-lg">
            <p className="text-gray-500">No products found in this category</p>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default CategorySection;