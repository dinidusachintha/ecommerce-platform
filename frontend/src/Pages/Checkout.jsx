import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const Checkout = () => {
  const navigate = useNavigate();
  const [cart, setCart] = useState([]);
  const [subtotal, setSubtotal] = useState(0);
  const [shippingCost, setShippingCost] = useState(0);
  const [tax, setTax] = useState(0);
  const [total, setTotal] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);

  // Form states
  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    address: '',
    apartment: '',
    city: '',
    country: 'United States',
    state: '',
    zip: '',
    phone: '',
    saveInfo: false,
    shippingMethod: 'standard',
    paymentMethod: 'credit',
    cardNumber: '',
    cardName: '',
    cardExpiry: '',
    cardCvc: '',
    giftMessage: ''
  });

  const [errors, setErrors] = useState({});

  // Load cart data (in a real app, this would come from your state management or API)
  useEffect(() => {
    const mockCart = [
      {
        id: 1,
        name: "Premium Leather Jacket",
        price: 299.99,
        quantity: 1,
        size: "M",
        color: "Black",
        image: "/images/jacket.jpg"
      },
      {
        id: 2,
        name: "Designer Sneakers",
        price: 199.99,
        quantity: 1,
        size: "10",
        color: "White",
        image: "/images/sneakers.jpg"
      }
    ];
    setCart(mockCart);
  }, []);

  // Calculate order summary
  useEffect(() => {
    const sub = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    setSubtotal(sub);
    
    // Calculate shipping (free over $100)
    const shipping = sub >= 100 ? 0 : 9.99;
    setShippingCost(shipping);
    
    // Calculate tax (simplified)
    const taxAmount = sub * 0.08; // 8% tax
    setTax(taxAmount);
    
    setTotal(sub + shipping + taxAmount);
  }, [cart]);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Clear error when typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  // Validate form
  const validateForm = () => {
    const newErrors = {};
    const requiredFields = [
      'email', 'firstName', 'lastName', 'address', 'city', 'country', 'state', 'zip', 'phone'
    ];
    
    if (formData.paymentMethod === 'credit') {
      requiredFields.push('cardNumber', 'cardName', 'cardExpiry', 'cardCvc');
    }
    
    requiredFields.forEach(field => {
      if (!formData[field]) {
        newErrors[field] = 'This field is required';
      }
    });
    
    // Email validation
    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    
    // Card number validation (simplified)
    if (formData.paymentMethod === 'credit' && formData.cardNumber.replace(/\s/g, '').length !== 16) {
      newErrors.cardNumber = 'Please enter a valid card number';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsProcessing(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsProcessing(false);
      setOrderSuccess(true);
      
      // In a real app, you would redirect to order confirmation page
      setTimeout(() => {
        navigate('/order-confirmation');
      }, 2000);
    }, 2000);
  };

  // Format credit card number
  const formatCardNumber = (value) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = matches && matches[0] || '';
    const parts = [];
    
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    
    if (parts.length) {
      return parts.join(' ');
    } else {
      return value;
    }
  };

  // Format expiry date
  const formatExpiry = (value) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    
    if (v.length >= 3) {
      return `${v.substring(0, 2)}/${v.substring(2, 4)}`;
    }
    return value;
  };

  // Handle special input formatting
  const handleSpecialInput = (e) => {
    const { name, value } = e.target;
    
    if (name === 'cardNumber') {
      setFormData(prev => ({ ...prev, [name]: formatCardNumber(value) }));
    } else if (name === 'cardExpiry') {
      setFormData(prev => ({ ...prev, [name]: formatExpiry(value) }));
    } else {
      handleChange(e);
    }
  };

  // Remove item from cart
  const removeItem = (id) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  // Update quantity
  const updateQuantity = (id, newQuantity) => {
    if (newQuantity < 1) return;
    
    setCart(prev => prev.map(item => 
      item.id === id ? { ...item, quantity: newQuantity } : item
    ));
  };

  return (
    <div className="min-h-screen py-12 bg-gray-50">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <button 
            onClick={() => navigate(-1)}
            className="flex items-center text-gray-600 hover:text-gray-900"
          >
            <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to cart
          </button>
          <h1 className="mt-4 text-3xl font-extrabold text-gray-900">Checkout</h1>
          <div className="flex items-center mt-4">
            <div className="flex-1 border-t-2 border-gray-300"></div>
            <div className="px-4 text-sm text-gray-500">3-step checkout</div>
            <div className="flex-1 border-t-2 border-gray-300"></div>
          </div>
          <div className="grid grid-cols-3 gap-4 mt-2">
            <div className={`text-center ${orderSuccess ? 'text-black font-bold' : 'text-gray-500'}`}>
              <div className={`w-8 h-8 mx-auto rounded-full flex items-center justify-center ${orderSuccess ? 'bg-black text-white' : 'bg-gray-200'}`}>
                1
              </div>
              <div className="mt-2">Information</div>
            </div>
            <div className="text-center text-gray-500">
              <div className="flex items-center justify-center w-8 h-8 mx-auto bg-gray-200 rounded-full">
                2
              </div>
              <div className="mt-2">Shipping</div>
            </div>
            <div className="text-center text-gray-500">
              <div className="flex items-center justify-center w-8 h-8 mx-auto bg-gray-200 rounded-full">
                3
              </div>
              <div className="mt-2">Payment</div>
            </div>
          </div>
        </div>

        {/* Order Success */}
        {orderSuccess && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-4 mb-8 text-green-700 bg-green-100 border border-green-400 rounded"
          >
            <p className="font-bold">Order successfully placed!</p>
            <p>Redirecting to order confirmation...</p>
          </motion.div>
        )}

        <div className="lg:grid lg:grid-cols-2 lg:gap-12">
          {/* Left Column - Form */}
          <div className="mb-12 lg:mb-0">
            <form onSubmit={handleSubmit}>
              {/* Contact Information */}
              <div className="p-6 mb-6 bg-white rounded-lg shadow-sm">
                <h2 className="mb-4 text-lg font-medium text-gray-900">Contact information</h2>
                <div className="mb-4">
                  <label htmlFor="email" className="block mb-1 text-sm font-medium text-gray-700">
                    Email address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full p-3 border rounded-lg ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
                  />
                  {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email}</p>}
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="saveInfo"
                    name="saveInfo"
                    checked={formData.saveInfo}
                    onChange={handleChange}
                    className="w-4 h-4 text-black border-gray-300 rounded focus:ring-black"
                  />
                  <label htmlFor="saveInfo" className="block ml-2 text-sm text-gray-700">
                    Email me with news and offers
                  </label>
                </div>
              </div>

              {/* Shipping Address */}
              <div className="p-6 mb-6 bg-white rounded-lg shadow-sm">
                <h2 className="mb-4 text-lg font-medium text-gray-900">Shipping address</h2>
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <label htmlFor="firstName" className="block mb-1 text-sm font-medium text-gray-700">
                      First name
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      className={`w-full p-3 border rounded-lg ${errors.firstName ? 'border-red-500' : 'border-gray-300'}`}
                    />
                    {errors.firstName && <p className="mt-1 text-sm text-red-500">{errors.firstName}</p>}
                  </div>
                  <div>
                    <label htmlFor="lastName" className="block mb-1 text-sm font-medium text-gray-700">
                      Last name
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      className={`w-full p-3 border rounded-lg ${errors.lastName ? 'border-red-500' : 'border-gray-300'}`}
                    />
                    {errors.lastName && <p className="mt-1 text-sm text-red-500">{errors.lastName}</p>}
                  </div>
                </div>
                <div className="mb-4">
                  <label htmlFor="address" className="block mb-1 text-sm font-medium text-gray-700">
                    Address
                  </label>
                  <input
                    type="text"
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    className={`w-full p-3 border rounded-lg ${errors.address ? 'border-red-500' : 'border-gray-300'}`}
                  />
                  {errors.address && <p className="mt-1 text-sm text-red-500">{errors.address}</p>}
                </div>
                <div className="mb-4">
                  <label htmlFor="apartment" className="block mb-1 text-sm font-medium text-gray-700">
                    Apartment, suite, etc. (optional)
                  </label>
                  <input
                    type="text"
                    id="apartment"
                    name="apartment"
                    value={formData.apartment}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-lg"
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="city" className="block mb-1 text-sm font-medium text-gray-700">
                    City
                  </label>
                  <input
                    type="text"
                    id="city"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    className={`w-full p-3 border rounded-lg ${errors.city ? 'border-red-500' : 'border-gray-300'}`}
                  />
                  {errors.city && <p className="mt-1 text-sm text-red-500">{errors.city}</p>}
                </div>
                <div className="grid grid-cols-3 gap-4 mb-4">
                  <div className="col-span-2">
                    <label htmlFor="country" className="block mb-1 text-sm font-medium text-gray-700">
                      Country/Region
                    </label>
                    <select
                      id="country"
                      name="country"
                      value={formData.country}
                      onChange={handleChange}
                      className="w-full p-3 border border-gray-300 rounded-lg"
                    >
                      <option>United States</option>
                      <option>Canada</option>
                      <option>Mexico</option>
                      <option>United Kingdom</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="zip" className="block mb-1 text-sm font-medium text-gray-700">
                      ZIP
                    </label>
                    <input
                      type="text"
                      id="zip"
                      name="zip"
                      value={formData.zip}
                      onChange={handleChange}
                      className={`w-full p-3 border rounded-lg ${errors.zip ? 'border-red-500' : 'border-gray-300'}`}
                    />
                    {errors.zip && <p className="mt-1 text-sm text-red-500">{errors.zip}</p>}
                  </div>
                </div>
                <div className="mb-4">
                  <label htmlFor="phone" className="block mb-1 text-sm font-medium text-gray-700">
                    Phone
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className={`w-full p-3 border rounded-lg ${errors.phone ? 'border-red-500' : 'border-gray-300'}`}
                  />
                  {errors.phone && <p className="mt-1 text-sm text-red-500">{errors.phone}</p>}
                  <p className="mt-1 text-sm text-gray-500">For delivery questions only</p>
                </div>
              </div>

              {/* Shipping Method */}
              <div className="p-6 mb-6 bg-white rounded-lg shadow-sm">
                <h2 className="mb-4 text-lg font-medium text-gray-900">Shipping method</h2>
                <div className="space-y-4">
                  <div className={`p-4 border rounded-lg cursor-pointer ${formData.shippingMethod === 'standard' ? 'border-black' : 'border-gray-300'}`}>
                    <div className="flex items-center">
                      <input
                        type="radio"
                        id="standard"
                        name="shippingMethod"
                        value="standard"
                        checked={formData.shippingMethod === 'standard'}
                        onChange={handleChange}
                        className="w-4 h-4 text-black border-gray-300 focus:ring-black"
                      />
                      <div className="ml-3">
                        <label htmlFor="standard" className="block text-sm font-medium text-gray-700">
                          Standard Shipping
                        </label>
                        <p className="text-sm text-gray-500">3-5 business days</p>
                      </div>
                      <div className="ml-auto text-sm font-medium">
                        {shippingCost === 0 ? 'FREE' : `$${shippingCost.toFixed(2)}`}
                      </div>
                    </div>
                  </div>
                  <div className={`p-4 border rounded-lg cursor-pointer ${formData.shippingMethod === 'express' ? 'border-black' : 'border-gray-300'}`}>
                    <div className="flex items-center">
                      <input
                        type="radio"
                        id="express"
                        name="shippingMethod"
                        value="express"
                        checked={formData.shippingMethod === 'express'}
                        onChange={handleChange}
                        className="w-4 h-4 text-black border-gray-300 focus:ring-black"
                      />
                      <div className="ml-3">
                        <label htmlFor="express" className="block text-sm font-medium text-gray-700">
                          Express Shipping
                        </label>
                        <p className="text-sm text-gray-500">1-2 business days</p>
                      </div>
                      <div className="ml-auto text-sm font-medium">
                        $14.99
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Payment Method */}
              <div className="p-6 mb-6 bg-white rounded-lg shadow-sm">
                <h2 className="mb-4 text-lg font-medium text-gray-900">Payment</h2>
                <div className="space-y-4">
                  <div className={`p-4 border rounded-lg cursor-pointer ${formData.paymentMethod === 'credit' ? 'border-black' : 'border-gray-300'}`}>
                    <div className="flex items-center">
                      <input
                        type="radio"
                        id="credit"
                        name="paymentMethod"
                        value="credit"
                        checked={formData.paymentMethod === 'credit'}
                        onChange={handleChange}
                        className="w-4 h-4 text-black border-gray-300 focus:ring-black"
                      />
                      <div className="ml-3">
                        <label htmlFor="credit" className="block text-sm font-medium text-gray-700">
                          Credit Card
                        </label>
                        <div className="flex mt-2">
                          <img src="/images/visa.png" alt="Visa" className="h-8 mr-2" />
                          <img src="/images/mastercard.png" alt="Mastercard" className="h-8 mr-2" />
                          <img src="/images/amex.png" alt="American Express" className="h-8" />
                        </div>
                      </div>
                    </div>
                    {formData.paymentMethod === 'credit' && (
                      <div className="mt-4 space-y-4">
                        <div>
                          <label htmlFor="cardNumber" className="block mb-1 text-sm font-medium text-gray-700">
                            Card number
                          </label>
                          <input
                            type="text"
                            id="cardNumber"
                            name="cardNumber"
                            value={formData.cardNumber}
                            onChange={handleSpecialInput}
                            placeholder="0000 0000 0000 0000"
                            className={`w-full p-3 border rounded-lg ${errors.cardNumber ? 'border-red-500' : 'border-gray-300'}`}
                          />
                          {errors.cardNumber && <p className="mt-1 text-sm text-red-500">{errors.cardNumber}</p>}
                        </div>
                        <div>
                          <label htmlFor="cardName" className="block mb-1 text-sm font-medium text-gray-700">
                            Name on card
                          </label>
                          <input
                            type="text"
                            id="cardName"
                            name="cardName"
                            value={formData.cardName}
                            onChange={handleChange}
                            className={`w-full p-3 border rounded-lg ${errors.cardName ? 'border-red-500' : 'border-gray-300'}`}
                          />
                          {errors.cardName && <p className="mt-1 text-sm text-red-500">{errors.cardName}</p>}
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label htmlFor="cardExpiry" className="block mb-1 text-sm font-medium text-gray-700">
                              Expiration date (MM/YY)
                            </label>
                            <input
                              type="text"
                              id="cardExpiry"
                              name="cardExpiry"
                              value={formData.cardExpiry}
                              onChange={handleSpecialInput}
                              placeholder="MM/YY"
                              className={`w-full p-3 border rounded-lg ${errors.cardExpiry ? 'border-red-500' : 'border-gray-300'}`}
                            />
                            {errors.cardExpiry && <p className="mt-1 text-sm text-red-500">{errors.cardExpiry}</p>}
                          </div>
                          <div>
                            <label htmlFor="cardCvc" className="block mb-1 text-sm font-medium text-gray-700">
                              CVC
                            </label>
                            <input
                              type="text"
                              id="cardCvc"
                              name="cardCvc"
                              value={formData.cardCvc}
                              onChange={handleChange}
                              placeholder="123"
                              className={`w-full p-3 border rounded-lg ${errors.cardCvc ? 'border-red-500' : 'border-gray-300'}`}
                            />
                            {errors.cardCvc && <p className="mt-1 text-sm text-red-500">{errors.cardCvc}</p>}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                  <div className={`p-4 border rounded-lg cursor-pointer ${formData.paymentMethod === 'paypal' ? 'border-black' : 'border-gray-300'}`}>
                    <div className="flex items-center">
                      <input
                        type="radio"
                        id="paypal"
                        name="paymentMethod"
                        value="paypal"
                        checked={formData.paymentMethod === 'paypal'}
                        onChange={handleChange}
                        className="w-4 h-4 text-black border-gray-300 focus:ring-black"
                      />
                      <div className="ml-3">
                        <label htmlFor="paypal" className="block text-sm font-medium text-gray-700">
                          PayPal
                        </label>
                        <p className="text-sm text-gray-500">You'll be redirected to PayPal</p>
                      </div>
                      <img src="/images/paypal.png" alt="PayPal" className="h-6 ml-auto" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Gift Message */}
              <div className="p-6 mb-6 bg-white rounded-lg shadow-sm">
                <h2 className="mb-4 text-lg font-medium text-gray-900">Gift message (optional)</h2>
                <textarea
                  id="giftMessage"
                  name="giftMessage"
                  value={formData.giftMessage}
                  onChange={handleChange}
                  rows="3"
                  className="w-full p-3 border border-gray-300 rounded-lg"
                  placeholder="Add a personal message..."
                ></textarea>
              </div>

              {/* Submit Button */}
              <motion.button
                type="submit"
                className="w-full py-4 text-lg font-medium text-white bg-black rounded-lg hover:bg-gray-800"
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                disabled={isProcessing}
              >
                {isProcessing ? 'Processing...' : `Pay $${total.toFixed(2)}`}
              </motion.button>
            </form>
          </div>

          {/* Right Column - Order Summary */}
          <div className="sticky p-6 bg-white rounded-lg shadow-sm h-fit top-4">
            <h2 className="mb-6 text-lg font-medium text-gray-900">Order Summary</h2>
            
            {/* Cart Items */}
            <div className="divide-y divide-gray-200">
              {cart.map(item => (
                <div key={item.id} className="flex py-4">
                  <div className="flex-shrink-0">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="object-cover w-20 h-20 rounded-md"
                    />
                  </div>
                  <div className="flex flex-col flex-1 ml-4">
                    <div>
                      <div className="flex justify-between text-base font-medium text-gray-900">
                        <h3>{item.name}</h3>
                        <p className="ml-4">${item.price.toFixed(2)}</p>
                      </div>
                      <p className="mt-1 text-sm text-gray-500">
                        {item.color} / {item.size}
                      </p>
                    </div>
                    <div className="flex items-end justify-between flex-1 text-sm">
                      <div className="flex items-center border rounded-md">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="px-3 py-1 text-gray-600"
                        >
                          -
                        </button>
                        <span className="px-2">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="px-3 py-1 text-gray-600"
                        >
                          +
                        </button>
                      </div>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="font-medium text-red-600 hover:text-red-500"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="pt-6 mt-6 border-t border-gray-200">
              <div className="flex justify-between mb-2 text-base font-medium text-gray-900">
                <p>Subtotal</p>
                <p>${subtotal.toFixed(2)}</p>
              </div>
              <div className="flex justify-between mb-2 text-base font-medium text-gray-900">
                <p>Shipping</p>
                <p>{shippingCost === 0 ? 'FREE' : `$${shippingCost.toFixed(2)}`}</p>
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

            {/* Promo Code */}
            <div className="mt-6">
              <label htmlFor="promo-code" className="block mb-1 text-sm font-medium text-gray-700">
                Promo code
              </label>
              <div className="flex">
                <input
                  type="text"
                  id="promo-code"
                  name="promo-code"
                  className="flex-1 p-3 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-black focus:border-black"
                  placeholder="Enter code"
                />
                <button className="px-4 py-3 text-gray-700 bg-gray-200 rounded-r-lg hover:bg-gray-300">
                  Apply
                </button>
              </div>
            </div>

            {/* Secure Checkout */}
            <div className="flex items-center justify-center mt-6">
              <svg className="w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
              </svg>
              <span className="ml-2 text-sm text-gray-500">Secure checkout</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;