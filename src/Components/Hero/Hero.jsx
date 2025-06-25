import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

// Sample images (replace with your actual images)
const slides = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1492707892479-7bc8d5a4ee93',
    alt: 'Fashion collection'
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b',
    alt: 'Elegant dresses'
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1525507119028-ed4c629a60a3',
    alt: 'Accessories showcase'
  }
];

const Hero = () => {
  return (
    <div className="relative w-full min-h-[70vh] bg-gradient-to-r from-pink-50 to-gray-50 overflow-hidden">
      {/* Slideshow Section */}
      <div className="absolute inset-0 z-0 w-full h-full">
        <Swiper
          spaceBetween={0}
          centeredSlides={true}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
          }}
          navigation={true}
          modules={[Autoplay, Pagination, Navigation]}
          className="w-full h-full"
        >
          {slides.map((slide) => (
            <SwiperSlide key={slide.id}>
              <div className="relative w-full h-full">
                <img 
                  src={slide.image} 
                  alt={slide.alt}
                  className="object-cover w-full h-full opacity-40"
                />
                <div className="absolute inset-0 bg-black bg-opacity-20"></div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Hero Content */}
      <div className="relative z-10 flex flex-col items-center justify-center w-full h-full max-w-6xl px-4 py-16 mx-auto text-center sm:px-6 lg:px-8">
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
    </div>
  );
};

export default Hero;