import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, Heart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Home = () => {
  const [activeCategory, setActiveCategory] = useState("women");
  const [isHovering, setIsHovering] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Categories Data
  const categories = [
    {
      id: "women",
      name: "Women's Collection",
      banner: "https://images.unsplash.com/photo-1483985988355-763728e1935b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1800&q=80"
    },
    {
      id: "men",
      name: "Men's Collection",
      banner: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1800&q=80"
    },
    {
      id: "kids",
      name: "Kids Collection",
      banner: "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1800&q=80"
    }
  ];

  // Fetch products from backend
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await axios.get('http://localhost:5000/api/products');
        setProducts(response.data);
        setError(null);
      } catch (err) {
        console.error('Error fetching products:', err);
        setError('Failed to load products. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Filter products by active category
  const filteredProducts = products.filter(
    product => product.category === activeCategory
  );

  // Handle product click
  const handleProductClick = (productId) => {
    navigate(`/products/${productId}`);
  };

  // Animation Variants
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  const hoverScale = {
    scale: 1.03,
    transition: { type: "spring", stiffness: 300 }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen pt-24">
        <div className="w-8 h-8 border-4 border-pink-500 rounded-full border-t-transparent animate-spin"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen pt-24">
        <p className="mb-4 text-lg text-gray-700">{error}</p>
        <button 
          onClick={() => window.location.reload()}
          className="px-4 py-2 text-white bg-pink-600 rounded-lg hover:bg-pink-700"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="pt-24 bg-gray-50">
      {/* Full-width Hero Banner */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="relative h-[60vh] w-full overflow-hidden"
      >
        <img
          src={categories.find(cat => cat.id === activeCategory)?.banner}
          alt="Banner"
          className="object-cover w-full h-full"
        />
        <div className="absolute inset-0 flex items-center justify-center bg-black/30">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="px-4 text-center text-white"
          >
            <h1 className="mb-4 text-4xl font-bold md:text-5xl">
              {categories.find(cat => cat.id === activeCategory)?.name}
            </h1>
            <p className="max-w-2xl mx-auto mb-6 text-lg md:text-xl">
              Discover our curated collection
            </p>
          </motion.div>
        </div>
      </motion.section>

      {/* Category Navigation Tabs */}
      <motion.div
        variants={fadeIn}
        initial="hidden"
        animate="visible"
        className="container px-4 py-12 mx-auto"
      >
        <div className="flex justify-center mb-12">
          <div className="flex p-1 bg-white rounded-lg shadow-md">
            {categories.map((category) => (
              <motion.button
                key={category.id}
                whileHover={{ scale: 1.05 }}
                onClick={() => setActiveCategory(category.id)}
                className={`px-6 py-3 rounded-lg font-medium transition-all ${
                  activeCategory === category.id
                    ? 'bg-pink-600 text-white shadow-md'
                    : 'text-gray-600 hover:bg-pink-50'
                }`}
              >
                {category.name}
              </motion.button>
            ))}
          </div>
        </div>

        {/* Products Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
        >
          <AnimatePresence>
            {filteredProducts?.map((product) => (
              <motion.div
                key={product._id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                whileHover={hoverScale}
                className="relative overflow-hidden bg-white shadow-md cursor-pointer rounded-xl group"
                onMouseEnter={() => setIsHovering(product._id)}
                onMouseLeave={() => setIsHovering(null)}
                onClick={() => handleProductClick(product._id)}
              >
                {/* Product Image */}
                <div className="relative overflow-hidden h-80">
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
                  />
                  {/* Quick Actions */}
                  {isHovering === product._id && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="absolute flex flex-col gap-2 top-4 right-4"
                    >
                      <button 
                        className="p-2 bg-white rounded-full shadow-md hover:bg-pink-50"
                        onClick={(e) => {
                          e.stopPropagation();
                          // Add to wishlist functionality
                        }}
                      >
                        <Heart className="w-5 h-5 text-gray-700" />
                      </button>
                      <button 
                        className="p-2 bg-white rounded-full shadow-md hover:bg-pink-50"
                        onClick={(e) => {
                          e.stopPropagation();
                          // Add to cart functionality
                        }}
                      >
                        <ShoppingCart className="w-5 h-5 text-gray-700" />
                      </button>
                    </motion.div>
                  )}
                </div>

                {/* Product Info */}
                <div className="p-5">
                  <h3 className="mb-2 text-lg font-semibold">{product.name}</h3>
                  <p className="mb-3 text-sm text-gray-600 line-clamp-2">
                    {product.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-lg font-bold text-pink-600">
                        ${product.price.toFixed(2)}
                      </span>
                      {product.originalPrice && product.originalPrice > product.price && (
                        <span className="ml-2 text-sm text-gray-400 line-through">
                          ${product.originalPrice.toFixed(2)}
                        </span>
                      )}
                    </div>
                    <div className="flex items-center">
                      <span className="text-yellow-400">★★★★☆</span>
                      <span className="ml-1 text-sm text-gray-500">
                        ({product.reviews || 0})
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Empty State */}
        {filteredProducts?.length === 0 && (
          <div className="flex flex-col items-center justify-center py-12">
            <h3 className="mb-4 text-xl font-medium text-gray-700">No products found</h3>
            <p className="text-gray-500">We couldn't find any products in this category</p>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default Home;