// src/context/CartContext.js
import React, { createContext, useState, useContext, useEffect } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  // Load cart from localStorage on initial render
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      setCartItems(JSON.parse(savedCart));
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product, quantity = 1) => {
    setCartItems(prev => {
      const existingItem = prev.find(item => 
        item.id === product.id && 
        item.selectedSize === product.selectedSize && 
        item.selectedColor === product.selectedColor
      );
      
      if (existingItem) {
        return prev.map(item =>
          item.id === product.id && 
          item.selectedSize === product.selectedSize && 
          item.selectedColor === product.selectedColor
            ? { 
                ...item, 
                quantity: item.quantity + quantity,
                totalPrice: (item.quantity + quantity) * item.price
              }
            : item
        );
      }
      return [...prev, { 
        ...product, 
        quantity,
        totalPrice: product.price * quantity
      }];
    });
  };

  const removeItem = (id) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity < 1) return;
    
    setCartItems(prev => prev.map(item => 
      item.id === id 
        ? { 
            ...item, 
            quantity: newQuantity,
            totalPrice: item.price * newQuantity
          } 
        : item
    ));
  };

  const clearCart = () => {
    setCartItems([]);
  };

  // Calculate cart totals
  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shippingCost = subtotal >= 100 ? 0 : 9.99;
  const tax = subtotal * 0.08; // 8% tax
  const total = subtotal + shippingCost + tax;

  return (
    <CartContext.Provider value={{ 
      cartItems, 
      cartCount, 
      addToCart, 
      removeItem, 
      updateQuantity,
      clearCart,
      subtotal,
      shippingCost,
      tax,
      total
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);