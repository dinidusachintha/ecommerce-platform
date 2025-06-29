// src/components/Footer.js
import React from 'react';

const Footer = () => {
  return (
    <footer className="py-8 text-white bg-gray-800">
      <div className="container px-4 mx-auto">
        <div className="flex flex-col items-center justify-between md:flex-row">
          <div className="mb-4 md:mb-0">
            <h3 className="text-xl font-bold">ShopEase</h3>
            <p className="text-gray-400">Your one-stop shopping destination</p>
          </div>
          <div className="flex space-x-6">
            <a href="#" className="hover:text-pink-400">About</a>
            <a href="#" className="hover:text-pink-400">Contact</a>
            <a href="#" className="hover:text-pink-400">Privacy Policy</a>
            <a href="#" className="hover:text-pink-400">Terms</a>
          </div>
        </div>
        <div className="mt-8 text-center text-gray-400">
          <p>© {new Date().getFullYear()} ShopEase. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;