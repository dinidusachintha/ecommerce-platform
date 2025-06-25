import React from 'react';

const Hero = () => {
  return (
    <div className="relative flex flex-col items-center justify-center w-full min-h-[70vh] bg-gradient-to-r from-pink-50 to-gray-50 overflow-hidden">
      {/* Background decorative elements (optional) */}
      <div className="absolute top-0 left-0 w-full h-full opacity-10">
        <div className="absolute w-40 h-40 bg-pink-300 rounded-full top-20 left-10 mix-blend-multiply filter blur-xl"></div>
        <div className="absolute bg-purple-300 rounded-full bottom-10 right-10 w-60 h-60 mix-blend-multiply filter blur-xl"></div>
      </div>

      {/* Hero Content */}
      <div className="relative z-10 flex flex-col items-center justify-center w-full max-w-6xl px-4 py-16 mx-auto text-center sm:px-6 lg:px-8">
        <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl md:text-6xl lg:text-7xl">
          <span className="block">Welcome to Our</span>
          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-600">
            Exclusive Collection
          </span>
        </h1>
        
        <p className="max-w-3xl mx-auto mt-6 text-xl text-gray-600 sm:text-2xl">
          Discover unique items and explore our carefully curated selection of premium products.
        </p>
        
        <div className="flex flex-col mt-10 space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4 sm:justify-center">
          <button className="px-8 py-3 text-lg font-medium text-white transition-all duration-300 transform rounded-lg shadow-lg bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 hover:shadow-xl hover:-translate-y-1">
            Explore Now
          </button>
          <button className="px-8 py-3 text-lg font-medium text-pink-600 transition-all duration-300 bg-white border border-pink-500 rounded-lg shadow-lg hover:bg-pink-50 hover:shadow-xl hover:-translate-y-1">
            Learn More
          </button>
        </div>
      </div>

      {/* Hero Image (optional - you can add an image here) */}
      {/* <div className="relative w-full max-w-4xl mx-auto mt-12 sm:mt-16 lg:mt-20">
        <img 
          src="/path-to-your-hero-image.jpg" 
          alt="Hero showcase" 
          className="rounded-lg shadow-2xl"
        />
      </div> */}
    </div>
  );
};

export default Hero;