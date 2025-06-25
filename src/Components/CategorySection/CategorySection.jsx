import React, { useContext, useState } from 'react';
import { ShopContext } from '../../Context/ShopContext';
import Title from '../Title';

const CategorySection = () => {
  const { products, currency } = useContext(ShopContext);
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Filter products based on selected category
  const filteredProducts = selectedCategory === 'All'
    ? products
    : products.filter(product => product.category === selectedCategory);

  return (
    <div className="px-4 my-10 sm:px-6 lg:px-8">
      {/* Category Title */}
      <div className="py-8 mb-6 text-center">
        <Title text1={'SHOP BY'} text2={'CATEGORY'} />
      </div>

      {/* Category Filter Buttons */}
      <div className="flex justify-center gap-4 mb-8">
        {['All', 'Men', 'Women', 'Kids'].map(category => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-6 py-2 rounded-full text-sm font-medium transition-colors ${
              selectedCategory === category
                ? 'bg-gray-700 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Product Cards */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filteredProducts.length > 0 ? (
          filteredProducts.map(product => (
            <div
              key={product.id}
              className="overflow-hidden transition-shadow border rounded-lg shadow-sm hover:shadow-md"
            >
              <img
                src={product.image}
                alt={product.name}
                className="object-cover w-full h-48"
              />
              <div className="p-4">
                <h3 className="text-lg font-medium text-gray-800 truncate">
                  {product.name}
                </h3>
                <p className="text-gray-600">
                  {currency}{product.price}
                </p>
                <button className="w-full py-2 mt-4 text-white transition-colors bg-gray-700 rounded-md hover:bg-gray-800">
                  View
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500 col-span-full">
            No products available in this category.
          </p>
        )}
      </div>
    </div>
  );
};

export default CategorySection;