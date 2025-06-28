
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

// Mock cart data (replace with actual cart context or state management)
const initialCartItems = [
  {
    id: 1,
    name: 'Sample Product 1',
    price: 29.99,
    image: '/images/sample-product1.jpg',
    selectedColor: 'Black',
    selectedSize: 'M',
    quantity: 1,
  },
  {
    id: 2,
    name: 'Sample Product 2',
    price: 49.99,
    image: '/images/sample-product2.jpg',
    selectedColor: 'Blue',
    selectedSize: 'L',
    quantity: 2,
  },
];

const Cart = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState(initialCartItems);

  // Calculate totals
  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const tax = subtotal * 0.1; // Assuming 10% tax rate
  const total = subtotal + tax;

  // Update item quantity
  const updateQuantity = (id, quantity) => {
    if (quantity < 1) return;
    setCartItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantity } : item))
    );
  };

  // Remove item from cart
  const removeItem = (id) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  // Clear entire cart
  const clearCart = () => {
    setCartItems([]);
  };

  return (
    <div className="min-h-screen py-12 bg-gray-50">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-extrabold text-gray-900">Shopping Cart</h1>
          <div className="flex items-center mt-4">
            <div className="flex-1 border-t-2 border-gray-300"></div>
            <div className="px-4 text-sm text-gray-500">
              {cartItems.length} {cartItems.length === 1 ? 'item' : 'items'} in cart
            </div>
            <div className="flex-1 border-t-2 border-gray-300"></div>
          </div>
        </div>

        {cartItems.length === 0 ? (
          <div className="text-center">
            <p className="text-lg text-gray-600">Your cart is empty</p>
            <motion.button
              onClick={() => navigate('/products')}
              className="px-6 py-3 mt-4 text-lg font-medium text-white bg-black rounded-lg hover:bg-gray-800"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Continue Shopping
            </motion.button>
          </div>
        ) : (
          <div className="lg:grid lg:grid-cols-3 lg:gap-12">
            {/* Left Column - Cart Items */}
            <div className="lg:col-span-2">
              <div className="p-6 bg-white rounded-lg shadow-sm">
                <div className="divide-y divide-gray-200">
                  {cartItems.map((item) => (
                    <div
                      key={`${item.id}-${item.selectedSize}-${item.selectedColor}`}
                      className="flex py-6"
                    >
                      <div className="flex-shrink-0">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="object-cover w-24 h-24 rounded-md"
                        />
                      </div>
                      <div className="flex flex-col flex-1 ml-6">
                        <div>
                          <div className="flex justify-between text-base font-medium text-gray-900">
                            <h3>{item.name}</h3>
                            <p className="ml-4">${(item.price * item.quantity).toFixed(2)}</p>
                          </div>
                          <p className="mt-1 text-sm text-gray-500">
                            {item.selectedColor} / {item.selectedSize}
                          </p>
                        </div>
                        <div className="flex items-end justify-between flex-1 mt-4 text-sm">
                          <div className="flex items-center border rounded-md">
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="px-4 py-2 text-gray-600 hover:bg-gray-100"
                              aria-label={`Decrease quantity of ${item.name}`}
                            >
                              -
                            </button>
                            <span className="px-4 py-2 text-gray-700">{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="px-4 py-2 text-gray-600 hover:bg-gray-100"
                              aria-label={`Increase quantity of ${item.name}`}
                            >
                              +
                            </button>
                          </div>
                          <button
                            onClick={() => removeItem(item.id)}
                            className="font-medium text-red-600 hover:text-red-500"
                            aria-label={`Remove ${item.name} from cart`}
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="flex justify-between mt-6">
                  <motion.button
                    onClick={() => navigate('/products')}
                    className="flex items-center text-gray-600 hover:text-gray-900"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <svg
                      className="w-5 h-5 mr-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M10 19l-7-7m0 0l7-7m-7 7h18"
                      />
                    </svg>
                    Continue Shopping
                  </motion.button>
                  <motion.button
                    onClick={clearCart}
                    className="text-sm font-medium text-red-600 hover:text-red-500"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Clear Cart
                  </motion.button>
                </div>
              </div>
            </div>

            {/* Right Column - Order Summary */}
            <div className="mt-8 lg:mt-0">
              <div className="sticky p-6 bg-white rounded-lg shadow-sm h-fit top-4">
                <h2 className="mb-6 text-lg font-medium text-gray-900">Order Summary</h2>
                <div className="divide-y divide-gray-200">
                  <div className="flex justify-between mb-2 text-base font-medium text-gray-900">
                    <p>Subtotal</p>
                    <p>${subtotal.toFixed(2)}</p>
                  </div>
                  <div className="flex justify-between mb-2 text-base font-medium text-gray-900">
                    <p>Tax</p>
                    <p>${tax.toFixed(2)}</p>
                  </div>
                  <div className="flex justify-between pt-4 mt-4 text-lg font-bold text-gray-900 border-t border-gray-200">
                    <p>Total</p>
                    <p>${total.toFixed(2)}</p>
                  </div>
                </div>
                <motion.button
                  onClick={() => navigate('/checkout')}
                  className="w-full py-4 mt-6 text-lg font-medium text-white bg-black rounded-lg hover:bg-gray-800"
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  disabled={cartItems.length === 0}
                >
                  Proceed to Checkout
                </motion.button>
                <div className="flex items-center justify-center mt-6">
                  <svg
                    className="w-5 h-5 text-gray-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="ml-2 text-sm text-gray-500">Secure checkout</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
