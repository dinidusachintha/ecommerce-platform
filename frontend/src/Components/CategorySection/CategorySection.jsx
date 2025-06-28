import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CategorySection = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/api/categories');
        
        // Handle different possible response formats
        let categoriesData = [];
        if (Array.isArray(response.data)) {
          categoriesData = response.data;
        } else if (response.data?.categories) {
          categoriesData = response.data.categories;
        } else if (response.data?.results) {
          categoriesData = response.data.results;
        }
        
        if (!Array.isArray(categoriesData)) {
          throw new Error('Invalid data format received');
        }
        
        setCategories(categoriesData);
        setLoading(false);
      } catch (err) {
        console.error('Fetch error:', err);
        setError(err.message);
        setLoading(false);
        setCategories([]);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="category-container">
      <h2>Categories</h2>
      <div className="category-list">
        {categories.map((category) => (
          <div key={category.id} className="category-item">
            <h3>{category.name}</h3>
            {/* Render other category details */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategorySection;