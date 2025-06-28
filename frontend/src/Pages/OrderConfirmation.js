// src/pages/OrderConfirmation.js
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const OrderConfirmation = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md p-8 mx-4 text-center bg-white rounded-lg shadow-lg"
      >
        <div className="flex items-center justify-center w-16 h-16 mx-auto mb-6 bg-green-100 rounded-full">
          <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h1 className="mb-2 text-2xl font-bold text-gray-900">Order Confirmed!</h1>
        <p className="mb-6 text-gray-600">Thank you for your purchase. Your order has been received and is being processed.</p>
        <div className="p-4 mb-6 rounded-lg bg-gray-50">
          <p className="font-medium">Order Number: <span className="text-gray-900">#{Math.floor(Math.random() * 1000000)}</span></p>
        </div>
        <p className="mb-6 text-gray-600">We've sent a confirmation email with all the details.</p>
        <Link 
          to="/" 
          className="inline-block px-6 py-3 text-white transition-colors bg-black rounded-lg hover:bg-gray-800"
        >
          Continue Shopping
        </Link>
      </motion.div>
    </div>
  );
};

export default OrderConfirmation;