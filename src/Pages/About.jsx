import React from 'react';
import { Link } from 'react-router-dom';
 // Adjust path based on your project structure

// Placeholder images (fashion-themed from Unsplash)
const images = {
  hero: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1200&auto=format&fit=crop',
  team: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800&auto=format&fit=crop',
  store: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800&auto=format&fit=crop',
  placeholder: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/wcAAgAB/1h8KAAAAABJRU5ErkJggg==',
};

const About = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-200">
    

      {/* Hero Section */}
      <section className="relative w-full h-[50vh] bg-gray-900">
        <img
          src={images.hero}
          alt="Fashion Store Hero"
          className="object-cover w-full h-full opacity-70"
          onError={(e) => (e.target.src = images.placeholder)}
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-white md:text-5xl animate-fadeIn">
              About Our Fashion Store
            </h1>
            <p className="mt-2 text-lg delay-200 text-white/80 animate-fadeIn">
              Discover the story behind your favorite fashion destination
            </p>
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="container px-4 py-12 mx-auto">
        <div className="flex flex-col items-center gap-8 md:flex-row">
          <div className="md:w-1/2">
            <h2 className="mb-4 text-3xl font-bold text-gray-800 animate-slideInLeft">
              Our Story
            </h2>
            <p className="leading-relaxed text-gray-600 delay-100 animate-slideInLeft">
              Founded in 2020, our fashion store began with a vision to bring trendy, high-quality
              apparel to everyone. We believe fashion is a form of self-expression, and our curated
              collections are designed to inspire confidence and individuality. From sustainable
              fabrics to bold designs, we’re passionate about creating pieces that make you feel
              extraordinary.
            </p>
            <div className="mt-6">
              <Link
                to="/collections"
                className="inline-block px-8 py-3 text-lg font-medium text-white transition-all duration-300 transform rounded-lg shadow-lg bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 hover:shadow-xl hover:-translate-y-1"
              >
                Shop Now
              </Link>
            </div>
          </div>
          <div className="md:w-1/2">
            <img
              src={images.store}
              alt="Our Store"
              className="object-cover w-full transition-transform duration-500 transform rounded-lg shadow-lg h-80 hover:scale-105"
              onError={(e) => (e.target.src = images.placeholder)}
            />
          </div>
        </div>
      </section>

      {/* Our Mission Section */}
      <section className="py-12 bg-gray-100">
        <div className="container px-4 mx-auto text-center">
          <h2 className="mb-4 text-3xl font-bold text-gray-800 animate-slideInUp">
            Our Mission
          </h2>
          <p className="max-w-2xl mx-auto leading-relaxed text-gray-600 delay-100 animate-slideInUp">
            We are committed to sustainable fashion, ethical sourcing, and empowering our community.
            Our mission is to provide stylish, affordable clothing while minimizing our environmental
            impact and supporting local artisans.
          </p>
        </div>
      </section>

      {/* Our Team Section */}
      <section className="container px-4 py-12 mx-auto">
        <h2 className="mb-8 text-3xl font-bold text-center text-gray-800 animate-slideInUp">
          Meet Our Team
        </h2>
        <div className="flex flex-col justify-center gap-8 md:flex-row">
          <div className="p-6 text-center transition-all duration-300 transform bg-white rounded-lg shadow-lg hover:shadow-xl hover:-translate-y-1">
            <img
              src={images.team}
              alt="Team Member"
              className="object-cover w-32 h-32 mx-auto mb-4 rounded-full"
              onError={(e) => (e.target.src = images.placeholder)}
            />
            <h3 className="text-xl font-semibold text-gray-800">Jane Doe</h3>
            <p className="text-gray-600">Creative Director</p>
            <p className="mt-2 text-gray-500">
              Jane leads our design team, bringing bold and innovative styles to life.
            </p>
          </div>
          <div className="p-6 text-center transition-all duration-300 transform bg-white rounded-lg shadow-lg hover:shadow-xl hover:-translate-y-1">
            <img
              src={images.team}
              alt="Team Member"
              className="object-cover w-32 h-32 mx-auto mb-4 rounded-full"
              onError={(e) => (e.target.src = images.placeholder)}
            />
            <h3 className="text-xl font-semibold text-gray-800">John Smith</h3>
            <p className="text-gray-600">Lead Stylist</p>
            <p className="mt-2 text-gray-500">
              John curates our collections, ensuring every piece is on-trend and timeless.
            </p>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-12 bg-gradient-to-r from-pink-500 to-purple-600">
        <div className="container px-4 mx-auto text-center">
          <h2 className="mb-4 text-3xl font-bold text-white animate-fadeIn">
            Join Our Fashion Community
          </h2>
          <p className="max-w-xl mx-auto mb-6 delay-100 text-white/80 animate-fadeIn">
            Explore our latest collections and become part of a community that celebrates style and
            individuality.
          </p>
          <Link
            to="/products"
            className="inline-block px-8 py-3 text-lg font-medium text-black text-pink-600 transition-all duration-300 transform bg-white rounded-lg shadow-lg hover:bg-gray-100 hover:shadow-xl hover:-translate-y-1"
          >
            Explore Now
          </Link>
        </div>
      </section>

      
    </div>
  );
};

export default About;

// Custom styles for animations
const styles = `
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
  }
  @keyframes slideInLeft {
    from { opacity: 0; transform: translateX(-20px); }
    to { opacity: 1; transform: translateX(0); }
  }
  @keyframes slideInUp {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }
  .animate-fadeIn {
    animation: fadeIn 1s ease-in-out;
  }
  .animate-slideInLeft {
    animation: slideInLeft 1s ease-in-out;
  }
  .animate-slideInUp {
    animation: slideInUp 1s ease-in-out;
  }
  .delay-100 {
    animation-delay: 100ms;
  }
  .delay-200 {
    animation-delay: 200ms;
  }
`;
const styleSheet = document.createElement('style');
styleSheet.textContent = styles;
document.head.appendChild(styleSheet);