import { Link } from "react-router-dom";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import logo from "../../assets/images/Logo.png";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black shadow-md">
      <div className="container px-4 py-3 mx-auto">
        <div className="flex items-center justify-between">
          {/* Navbar Logo */}
          <div className="flex-shrink-0">
            <Link to="/user-blog">
              <img
                src={logo}
                alt="Ceylon Odyssey Logo"
                className="w-auto h-10"
              />
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex md:items-center md:space-x-8">
            <div className="flex space-x-6">
              <Link to="/" className="px-3 py-2 text-pink-500 transition duration-300 hover:text-red-600">
                HOME
              </Link>
              <Link to="/contact" className="px-3 py-2 text-pink-500 transition duration-300 hover:text-red-600">
                COLLECTION
              </Link>
              <Link to="/blog" className="px-3 py-2 text-pink-500 transition duration-300 hover:text-red-600">
                Blog
              </Link>
              <Link to="/destinations" className="px-3 py-2 text-pink-500 transition duration-300 hover:text-red-600">
                Destinations
              </Link>
            </div>

            {/* Buttons */}
            <div className="flex items-center ml-10 space-x-4">
              <Link
                to="/login"
                className="px-4 py-2 text-white transition duration-300 rounded-full hover:bg-pink-700"
              >
                Sign In
              </Link>
              <Link
                to="/signup"
                className="px-4 py-2 text-white transition duration-300 bg-pink-900 rounded-full hover:bg-pink-700"
              >
                Sign Up
              </Link>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-pink-900 focus:outline-none"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="bg-white shadow-lg md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link 
              to="/about" 
              className="block px-3 py-2 text-gray-700 rounded-md hover:text-pink-600 hover:bg-gray-100"
              onClick={() => setIsOpen(false)}
            >
              HOME
            </Link>
            <Link 
              to="/" 
              className="block px-3 py-2 text-gray-700 rounded-md hover:text-pink-600 hover:bg-gray-100"
              onClick={() => setIsOpen(false)}
            >
              COLLECTION
            </Link>
            <Link 
              to="/collection" 
              className="block px-3 py-2 text-gray-700 rounded-md hover:text-pink-600 hover:bg-gray-100"
              onClick={() => setIsOpen(false)}
            >
              ABOUT
            </Link>
            <Link 
              to="/about" 
              className="block px-3 py-2 text-gray-700 rounded-md hover:text-pink-600 hover:bg-gray-100"
              onClick={() => setIsOpen(false)}
            >
              CONTACT
            </Link>
            <div className="pt-4 mt-4 border-t border-gray-200">
              <Link 
                to="/contact" 
                className="block w-full px-4 py-2 text-center text-pink-600 rounded-md hover:bg-gray-100"
                onClick={() => setIsOpen(false)}
              >
                Sign In
              </Link>
              <Link 
                to="/signup" 
                className="block w-full px-4 py-2 mt-2 text-center text-white bg-pink-600 rounded-md hover:bg-pink-700"
                onClick={() => setIsOpen(false)}
              >
                Sign Up
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;