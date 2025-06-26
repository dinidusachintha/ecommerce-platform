import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Menu, X, ShoppingCart } from 'lucide-react';
import logo from '../../assets/images/Logo.png'; // Adjust path as needed
import cart from '../../assets/images/cartlogo.png'; // Adjust path as needed

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  // Navigation links
  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/collection', label: 'Collection' },
    { to: '/about', label: 'About' },
    { to: '/contact', label: 'Contact' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black shadow-md">
      <div className="container px-4 py-4 mx-auto">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex-shrink-0">
            <img
              src={logo}
              alt="Ceylon Odyssey Logo"
              className="w-auto h-10 transition-transform duration-300 hover:scale-105"
              onError={(e) => (e.target.src = 'https://via.placeholder.com/150x50?text=Logo')}
            />
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex md:items-center md:space-x-8">
            {/* Navigation Links */}
            <div className="flex items-center space-x-6">
              {navLinks.map(({ to, label }) => (
                <NavLink
                  key={to}
                  to={to}
                  className="relative px-3 py-2 font-medium text-pink-500 transition-all duration-300 group hover:text-sky-600"
                >
                  {label}
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-sky-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
                </NavLink>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="flex items-center ml-8 space-x-4">
              <Link
                to="/login"
                className="px-4 py-2 font-medium text-white transition-all duration-300 bg-transparent border border-pink-500 rounded-full hover:bg-pink-500 hover:border-transparent"
              >
                Sign In
              </Link>
              <Link
                to="/signup"
                className="px-4 py-2 font-medium text-white transition-all duration-300 bg-pink-500 rounded-full hover:bg-pink-700 hover:shadow-lg"
              >
                Sign Up
              </Link>
              <Link
                to="/cart"
                className="relative p-2 transition-all duration-300 bg-gray-800 rounded-full hover:bg-pink-500"
              >
                <img
                  src={cart}
                  alt="Cart"
                  className="w-auto h-8"
                  onError={(e) => (e.target.src = 'https://via.placeholder.com/24?text=Cart')}
                />
                <span className="absolute flex items-center justify-center w-4 h-4 text-xs text-white bg-red-500 rounded-full -top-1 -right-1">
                  0
                </span>
              </Link>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center space-x-4 md:hidden">
            <Link
              to="/cart"
              className="relative p-2 transition-all duration-300 bg-gray-800 rounded-full hover:bg-pink-500"
            >
              <img
                src={cart}
                alt="Cart"
                className="w-auto h-8"
                onError={(e) => (e.target.src = 'https://via.placeholder.com/24?text=Cart')}
              />
              <span className="absolute flex items-center justify-center w-4 h-4 text-xs text-white bg-red-500 rounded-full -top-1 -right-1">
                0
              </span>
            </Link>
            <button
              onClick={toggleMenu}
              className="text-pink-500 transition-transform duration-300 focus:outline-none hover:scale-110"
              aria-label={isOpen ? 'Close Menu' : 'Open Menu'}
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden bg-white shadow-lg transform transition-all duration-500 ease-in-out ${
          isOpen ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'
        }`}
      >
        <div className="px-4 py-6 space-y-4">
          {navLinks.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              className="block px-4 py-3 text-lg font-medium text-pink-500 transition-all duration-300 rounded-md hover:bg-gray-300 hover:text-red-500"
              onClick={toggleMenu}
            >
              {label}
            </NavLink>
          ))}
          <div className="pt-4 border-t border-pink-900">
            <Link
              to="/login"
              className="block px-4 py-3 text-lg font-medium text-pink-500 transition-all duration-300 rounded-md hover:bg-gray-300"
              onClick={toggleMenu}
            >
              Sign In
            </Link>
            <Link
              to="/signup"
              className="block px-4 py-3 text-lg font-medium text-white transition-all duration-300 bg-pink-900 rounded-md hover:bg-pink-700"
              onClick={toggleMenu}
            >
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;