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

  // Fetch categories and products from backend
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        // Fetch categories
        const categoriesRes = await axios.get('/api/categories');
        console.log('Categories response:', categoriesRes.data);
        const categoriesData = Array.isArray(categoriesRes.data) ? categoriesRes.data : [];
        setCategories(categoriesData);

        // Set the first category as active if available
        if (categoriesData.length > 0) {
          setActiveCategory(categoriesData[0].id);
        }

        // Fetch products for each category
        const productsData = {};
        for (const category of categoriesData) {
          const productsRes = await axios.get(`/api/products?category=${category.id}`);
          console.log(`Products for ${category.id}:`, productsRes.data);
          productsData[category.id] = Array.isArray(productsRes.data) ? productsRes.data : [];
        }
        setProducts(productsData);

        setLoading(false);
      } catch (err) {
        console.error('Error fetching data:', err);
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
        quantity: 1,
      });

      const existingItem = cart.find((item) => item._id === product._id);

      if (existingItem) {
        setCart(
          cart.map((item) =>
            item._id === product._id ? { ...item, quantity: item.quantity + 1 } : item
          )
        );
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

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        when: 'beforeChildren',
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: 'easeOut',
      },
    },
  };

  const bannerVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: 'easeOut',
      },
    },
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

  if (!categories.length) {
    return (
      <div className="p-4 text-center text-gray-500">
        No categories available.
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
        {/* Category buttons */}
        <div className="flex justify-center mb-8 space-x-4">
          {categories.map((category) => (
            <motion.button
              key={category._id}
              onClick={() => setActiveCategory(category.id)}
              className={`px-4 py-2 rounded ${
                activeCategory === category.id
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-200 text-gray-700'
              }`}
              variants={itemVariants}
            >
              {category.name}
            </motion.button>
          ))}
        </div>

        {/* Product cards */}
        {products[activeCategory]?.length ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {products[activeCategory].map((product) => (
              <motion.div
                key={product._id}
                variants={itemVariants}
                className="p-4 bg-white rounded shadow"
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="object-cover w-full h-48 mb-4"
                />
                <h3 className="text-lg font-semibold">{product.name}</h3>
                <p className="text-gray-600">${product.price}</p>
                <button
                  id={`add-to-cart-${product._id}`}
                  onClick={() => addToCart(product)}
                  className="px-4 py-2 mt-4 text-white bg-blue-500 rounded hover:bg-blue-600"
                >
                  Add to Cart
                </button>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="p-4 text-center text-gray-500">
            No products available for this category.
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default CategorySection;