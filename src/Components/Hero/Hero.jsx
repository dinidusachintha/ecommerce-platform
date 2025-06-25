import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

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
    <div className="relative w-full min-h-[70vh] bg-gradient-to-r from-pink-50 to-gray-50 overflow-hidden pt-12">
      <div className="container flex flex-col items-center h-full mx-auto md:flex-row">
        {/* Slideshow Section - Left Side */}
        <div className="w-full h-full px-4 py-8 md:w-1/2 md:py-0">
          <div className="relative h-full overflow-hidden shadow-xl rounded-xl">
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
                      className="object-cover w-full h-full"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-10"></div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>

        {/* Hero Content - Right Side */}
        <div className="flex items-center w-full h-full px-4 py-8 md:w-1/2 md:py-0">
          <div className="relative z-10 w-full max-w-lg mx-auto text-center md:text-left">
            <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl md:text-6xl lg:text-7xl">
              <span className="block">Welcome to Our</span>
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-600">
                Exclusive Collection
              </span>
            </h1>
            
            <p className="max-w-xl mx-auto mt-6 text-xl text-gray-600 md:mx-0 sm:text-2xl">
              Discover unique items and explore our carefully curated selection of premium products.
            </p>
            
            <div className="flex flex-col mt-10 space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4 sm:justify-start md:justify-start">
              <button className="px-8 py-3 text-lg font-medium text-white transition-all duration-300 transform rounded-lg shadow-lg bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 hover:shadow-xl hover:-translate-y-1">
                Explore Now
              </button>
              <button className="px-8 py-3 text-lg font-medium text-pink-600 transition-all duration-300 bg-white border border-pink-500 rounded-lg shadow-lg hover:bg-pink-50 hover:shadow-xl hover:-translate-y-1">
                Learn More
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;