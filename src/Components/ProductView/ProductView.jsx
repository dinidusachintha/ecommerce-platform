import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useParams, useNavigate } from 'react-router-dom';

// Import placeholder images
import dress1 from '../../assets/images/women2.png';
import heels1 from '../../assets/images/women2.png';
import bag1 from '../../assets/images/women2.png';
import shirt1 from '../../assets/images/men1.png';
import shoes1 from '../../assets/images/men1.png';
import wallet1 from '../../assets/images/men1.png';
import tshirt1 from '../../assets/images/men1.png';
import sneakers1 from '../../assets/images/men1.png';
import teddy1 from '../../assets/images/men1.png';

// Placeholder optional images (replace with actual product-specific images)
import optionalImage1 from '../../assets/images/women2.png';
import optionalImage2 from '../../assets/images/men1.png';
import optionalImage3 from '../../assets/images/kid1.png';
import optionalImage4 from '../../assets/images/women2.png';

const ProductView = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Mock product data with optional images, material, and sizes
  const products = {
    women: [
      {
        id: 1,
        name: "Summer Silk Dress",
        price: 499.99,
        image: dress1,
        description: "An exquisite silk dress with intricate embroidery, ideal for elegant evenings.",
        images: [dress1, optionalImage1, optionalImage2, optionalImage3],
        material: "100% Silk",
        sizes: ["S", "M", "L"]
      },
      {
        id: 2,
        name: "Leather High Heels",
        price: 899.99,
        image: heels1,
        description: "Luxurious leather heels with a signature Gucci design.",
        images: [heels1, optionalImage1, optionalImage2],
        material: "Genuine Leather",
        sizes: ["36", "37", "38"]
      },
      {
        id: 3,
        name: "Gucci Leather Tote",
        price: 1299.99,
        image: bag1,
        description: "A premium leather tote with gold-tone hardware.",
        images: [bag1, optionalImage1, optionalImage3, optionalImage4],
        material: "Leather",
        sizes: ["One Size"]
      }
    ],
    men: [
      {
        id: 4,
        name: "Formal Wool Blazer",
        price: 799.99,
        image: shirt1,
        description: "A tailored wool blazer for sophisticated occasions.",
        images: [shirt1, optionalImage2, optionalImage3],
        material: "Wool Blend",
        sizes: ["S", "M", "L", "XL"]
      },
      {
        id: 5,
        name: "Leather Loafers",
        price: 699.99,
        image: shoes1,
        description: "Handcrafted leather loafers with a modern twist.",
        images: [shoes1, optionalImage1, optionalImage4],
        material: "Leather",
        sizes: ["40", "41", "42"]
      },
      {
        id: 6,
        name: "Gucci Wallet",
        price: 399.99,
        image: wallet1,
        description: "A sleek wallet with iconic Gucci monogram.",
        images: [wallet1, optionalImage2, optionalImage3, optionalImage4],
        material: "Leather",
        sizes: ["One Size"]
      }
    ],
    kids: [
      {
        id: 7,
        name: "Cotton Polo Shirt",
        price: 99.99,
        image: tshirt1,
        description: "A soft cotton polo for young fashion enthusiasts.",
        images: [tshirt1, optionalImage1],
        material: "Cotton",
        sizes: ["S", "M", "L"]
      },
      {
        id: 8,
        name: "Kids Sneakers",
        price: 149.99,
        image: sneakers1,
        description: "Stylish sneakers designed for kids' active lifestyle.",
        images: [sneakers1, optionalImage2, optionalImage3],
        material: "Synthetic Leather",
        sizes: ["28", "29", "30"]
      },
      {
        id: 9,
        name: "Plush Teddy Bear",
        price: 129.99,
        image: teddy1,
        description: "A luxurious plush teddy bear with Gucci detailing.",
        images: [teddy1, optionalImage1, optionalImage2, optionalImage3, optionalImage4],
        material: "Plush Fabric",
        sizes: ["One Size"]
      }
    ]
  };

  // Find product by ID
  const product = Object.values(products)
    .flat()
    .find(p => p.id === parseInt(id));

  // Fallback product
  const defaultProduct = {
    id: 1,
    name: "Summer Silk Dress",
    price: 499.99,
    image: dress1,
    description: "An exquisite silk dress with intricate embroidery, ideal for elegant evenings.",
    images: [dress1, optionalImage1, optionalImage2, optionalImage3],
    material: "100% Silk",
    sizes: ["S", "M", "L"]
  };

  const selectedProduct = product || defaultProduct;

  // State for quantity, cart, selected image, selected size, and payment details
  const [quantity, setQuantity] = useState(1);
  const [cart, setCart] = useState([]);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState(selectedProduct.sizes[0] || "One Size");
  const [isFavorite, setIsFavorite] = useState(false);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, ease: "easeOut" }
    }
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  // Handle quantity change
  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value, 10);
    if (value >= 1) setQuantity(value);
  };

  // Add to cart
  const addToCart = () => {
    const cartItem = {
      id: selectedProduct.id,
      name: selectedProduct.name,
      price: selectedProduct.price,
      quantity: quantity,
      image: selectedProduct.images[selectedImageIndex],
      size: selectedSize
    };
    setCart([...cart, cartItem]);
    alert(`${quantity} x ${selectedProduct.name} (Size: ${selectedSize}) added to cart!`);
  };

  // Remove item from cart
  const removeFromCart = (index) => {
    setCart(cart.filter((_, i) => i !== index));
    alert('Item removed from cart!');
  };

  // Proceed to checkout
  const proceedToCheckout = () => {
    navigate('/checkout', { state: { cart } });
  };

  // Toggle favorite
  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
    alert(`Product ${isFavorite ? 'removed from' : 'added to'} Favorites!`);
  };

  // Handle image navigation
  const handleNextImage = () => {
    setSelectedImageIndex((prev) => (prev + 1) % selectedProduct.images.length);
  };

  const handlePrevImage = () => {
    setSelectedImageIndex((prev) => (prev - 1 + selectedProduct.images.length) % selectedProduct.images.length);
  };

  return (
    <motion.div
      className="flex justify-center min-h-screen pt-20 bg-gray-100"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <div className="w-full max-w-6xl">
        {/* Back Button */}
        <motion.button
          className="mb-8 font-semibold text-black hover:text-gray-700"
          onClick={() => navigate(-1)}
          variants={itemVariants}
          whileHover={{ scale: 1.05 }}
        >
          ← Back to Categories
        </motion.button>

        {/* Product Details */}
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
          {/* Image Gallery */}
          <motion.div variants={itemVariants} className="space-y-6">
            <div className="relative w-full overflow-hidden bg-white rounded-lg shadow-lg">
              <img
                src={selectedProduct.images[selectedImageIndex]}
                alt={selectedProduct.name}
                className="object-contain w-full h-auto max-h-[600px] transition-opacity duration-300"
              />
              <button
                onClick={handlePrevImage}
                className="absolute p-2 text-white transform -translate-y-1/2 bg-black bg-opacity-50 rounded-full left-2 top-1/2 hover:bg-opacity-75"
              >
                ‹
              </button>
              <button
                onClick={handleNextImage}
                className="absolute p-2 text-white transform -translate-y-1/2 bg-black bg-opacity-50 rounded-full right-2 top-1/2 hover:bg-opacity-75"
              >
                ›
              </button>
            </div>
            <div className="flex gap-4 pb-2 overflow-x-auto">
              {selectedProduct.images.map((image, index) => (
                <motion.img
                  key={index}
                  src={image}
                  alt={`${selectedProduct.name} view ${index + 1}`}
                  className={`w-20 h-20 object-cover rounded-md cursor-pointer border-2 ${
                    selectedImageIndex === index ? 'border-gold-500' : 'border-gray-300'
                  }`}
                  onClick={() => setSelectedImageIndex(index)}
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.3 }}
                />
              ))}
            </div>
          </motion.div>

          {/* Product Info */}
          <motion.div variants={itemVariants} className="space-y-6">
            <div>
              <h1 className="mb-4 text-4xl font-bold text-gray-900">{selectedProduct.name}</h1>
              <p className="mb-4 text-3xl font-semibold text-black">${selectedProduct.price.toFixed(2)}</p>
              <p className="mb-4 text-gray-700">{selectedProduct.description}</p>
              <p className="text-gray-600">Material: {selectedProduct.material}</p>
            </div>

            {/* Size Selection */}
            <div className="space-y-2">
              <label className="block text-lg font-medium text-gray-700">Size:</label>
              <div className="flex gap-2">
                {selectedProduct.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-4 py-2 text-sm font-medium rounded-full ${
                      selectedSize === size
                        ? 'bg-black text-white'
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity and Buttons */}
            <div className="space-y-4">
              <div className="flex items-center">
                <label htmlFor="quantity" className="mr-4 text-lg font-medium text-gray-700">
                  Quantity:
                </label>
                <input
                  type="number"
                  id="quantity"
                  value={quantity}
                  onChange={handleQuantityChange}
                  min="1"
                  className="w-16 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                />
              </div>
              <div className="flex gap-4">
                <motion.button
                  className="w-full py-3 text-white transition-colors bg-black rounded-lg hover:bg-gray-800"
                  onClick={addToCart}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Add to Cart
                </motion.button>
                <motion.button
                  className="w-full py-3 text-white transition-colors rounded-lg bg-gold-500 hover:bg-gold-600"
                  onClick={proceedToCheckout}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Proceed to Checkout
                </motion.button>
              </div>
              <motion.button
                className="w-full py-3 text-black transition-colors border border-black rounded-lg hover:bg-gray-100"
                onClick={toggleFavorite}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
              </motion.button>
            </div>
          </motion.div>
        </div>

        {/* Cart Summary */}
        {cart.length > 0 && (
          <motion.div variants={itemVariants} className="mt-12">
            <h2 className="mb-4 text-2xl font-semibold text-gray-900">Cart Summary</h2>
            <div className="p-6 bg-white rounded-lg shadow-md">
              {cart.map((item, index) => (
                <div key={index} className="flex justify-between mb-2 text-gray-700">
                  <span>
                    {item.name} (Size: {item.size}) x {item.quantity}
                  </span>
                  <span className="flex items-center">
                    ${(item.price * item.quantity).toFixed(2)}
                    <button
                      onClick={() => removeFromCart(index)}
                      className="ml-4 text-red-500 hover:text-red-700"
                    >
                      Remove
                    </button>
                  </span>
                </div>
              ))}
              <div className="pt-2 font-bold text-gray-900 border-t border-gray-300">
                Total: ${(cart.reduce((total, item) => total + item.price * item.quantity, 0)).toFixed(2)}
              </div>
            </div>
          </motion.div>
        )}

        {/* Payment Button (shown after adding to cart and selecting size) */}
        {cart.length > 0 && selectedSize && (
          <motion.div variants={itemVariants} className="mt-12">
            <motion.button
              className="w-full py-3 text-white transition-colors rounded-lg bg-gold-500 hover:bg-gold-600"
              onClick={() => navigate('/payment', { state: { cart } })}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Proceed to Payment
            </motion.button>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default ProductView;