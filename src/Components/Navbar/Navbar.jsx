import { Link, NavLink } from "react-router-dom";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import logo from "../../assets/images/Logo.png";
import cart from "../../assets/images/cartlogo.png";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black shadow-md">
      <div className="container px-4 py-3 mx-auto">
        <div className="flex items-center justify-between">
          {/* Navbar Logo */}
          <div className="flex-shrink-0">
            <Link to="/">
              <img src={logo} alt="Ceylon Odyssey Logo" className="w-auto h-10" />
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex md:items-center md:space-x-8">
            <div className="flex items-center space-x-6">
              <NavLink 
                to="/" 
                className={({ isActive }) => 
                  `px-3 py-2 transition duration-300 hover:text-red-600 ${
                    isActive ? 'text-red-500 font-bold' : 'text-pink-500'
                  }`
                }
              >
                HOME
              </NavLink>
              <NavLink 
                to="/collection" 
                className={({ isActive }) => 
                  `px-3 py-2 transition duration-300 hover:text-red-600 ${
                    isActive ? 'text-red-500 font-bold' : 'text-pink-500'
                  }`
                }
              >
                COLLECTION
              </NavLink>
              <NavLink 
                to="/about" 
                className={({ isActive }) => 
                  `px-3 py-2 transition duration-300 hover:text-red-600 ${
                    isActive ? 'text-red-500 font-bold' : 'text-pink-500'
                  }`
                }
              >
                ABOUT
              </NavLink>
              <NavLink 
                to="/contact" 
                className={({ isActive }) => 
                  `px-3 py-2 transition duration-300 hover:text-red-600 ${
                    isActive ? 'text-red-500 font-bold' : 'text-pink-500'
                  }`
                }
              >
                CONTACT
              </NavLink>
            </div>

            {/* Buttons */}
            <div className="flex items-center ml-10 space-x-4">
              <Link
                to="/login"
                className="px-4 py-2 text-white transition duration-300 rounded-full hover:bg-pink-700"
              >
                SIGN IN
              </Link>
              <Link
                to="/signup"
                className="px-4 py-2 text-white transition duration-300 bg-pink-900 rounded-full hover:bg-pink-700"
              >
                SIGN UP
              </Link>
              <Link 
                to="/cart" 
                className="p-1 transition duration-300 rounded-full hover:bg-pink-900"
              >
                <img src={cart} alt="cart logo" className="w-auto h-8" />
              </Link>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center space-x-4 md:hidden">
            <Link 
              to="/cart" 
              className="p-1 transition duration-300 rounded-full hover:bg-pink-900"
            >
              <img src={cart} alt="cart logo" className="w-auto h-8" />
            </Link>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-pink-500 focus:outline-none"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="absolute w-full bg-white shadow-lg md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <NavLink 
              to="/" 
              className={({ isActive }) => 
                `block px-3 py-2 rounded-md hover:bg-gray-300 ${
                  isActive ? 'text-red-500 font-bold' : 'text-pink-500'
                }`
              }
              onClick={() => setIsOpen(false)}
            >
              HOME
            </NavLink>
            <NavLink 
              to="/collection" 
              className={({ isActive }) => 
                `block px-3 py-2 rounded-md hover:bg-gray-300 ${
                  isActive ? 'text-red-500 font-bold' : 'text-pink-500'
                }`
              }
              onClick={() => setIsOpen(false)}
            >
              COLLECTION
            </NavLink>
            <NavLink 
              to="/about" 
              className={({ isActive }) => 
                `block px-3 py-2 rounded-md hover:bg-gray-300 ${
                  isActive ? 'text-red-500 font-bold' : 'text-pink-500'
                }`
              }
              onClick={() => setIsOpen(false)}
            >
              ABOUT
            </NavLink>
            <NavLink 
              to="/contact" 
              className={({ isActive }) => 
                `block px-3 py-2 rounded-md hover:bg-gray-300 ${
                  isActive ? 'text-red-500 font-bold' : 'text-pink-500'
                }`
              }
              onClick={() => setIsOpen(false)}
            >
              CONTACT
            </NavLink>
            <div className="pt-4 mt-4 border-t border-pink-900">
              <Link 
                to="/login" 
                className="block w-full px-4 py-2 text-center text-pink-500 rounded-md hover:bg-pink-900"
                onClick={() => setIsOpen(false)}
              >
                Sign In
              </Link>
              <Link 
                to="/signup" 
                className="block w-full px-4 py-2 mt-2 text-center text-white bg-pink-900 rounded-md hover:bg-pink-700"
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