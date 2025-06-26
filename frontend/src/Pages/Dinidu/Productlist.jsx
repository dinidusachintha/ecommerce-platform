import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { FiEdit, FiTrash2, FiEye } from 'react-icons/fi';

const Productlist = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteId, setDeleteId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 10;

  // Mock data fetch - replace with actual API call
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // Simulate API call
        setTimeout(() => {
          // Mock data - in a real app, this would come from your backend
          const mockProducts = Array.from({ length: 25 }, (_, i) => ({
            id: i + 1,
            name: `Product ${i + 1}`,
            price: (Math.random() * 100).toFixed(2),
            category: ['women', 'men', 'kids'][Math.floor(Math.random() * 3)],
            colors: ['Red', 'Blue', 'Green', 'Black'].slice(0, Math.floor(Math.random() * 3) + 1),
            sizes: ['S', 'M', 'L', 'XL'].slice(0, Math.floor(Math.random() * 3) + 1),
            description: `This is a detailed description for Product ${i + 1}`,
            images: [
              { url: 'https://via.placeholder.com/150' },
              { url: 'https://via.placeholder.com/150' }
            ]
          }));
          setProducts(mockProducts);
          setLoading(false);
        }, 1000);
      } catch (error) {
        console.error('Error fetching products:', error);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleDelete = (id) => {
    setDeleteId(id);
    // Simulate delete confirmation
    if (window.confirm('Are you sure you want to delete this product?')) {
      // In a real app, you would call your API here
      setTimeout(() => {
        setProducts(products.filter(product => product.id !== id));
        setDeleteId(null);
      }, 500);
    } else {
      setDeleteId(null);
    }
  };

  const handleEdit = (id) => {
    navigate(`/admin/products/edit/${id}`);
  };

  const handleView = (id) => {
    navigate(`/admin/products/view/${id}`);
  };

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination logic
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const getCategoryLabel = (value) => {
    switch (value) {
      case 'women': return "Women's Collection";
      case 'men': return "Men's Collection";
      case 'kids': return "Kids Collection";
      default: return value;
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-8 h-8 border-4 border-blue-500 rounded-full animate-spin border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="container px-4 py-8 mx-auto">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-6xl mx-auto"
      >
        <div className="flex flex-col justify-between mb-8 space-y-4 md:flex-row md:space-y-0 md:items-center">
          <h1 className="text-2xl font-bold">Product List</h1>
          <div className="flex space-x-3">
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={() => navigate('/admin/products/add')}
              className="px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600"
            >
              Add Product
            </button>
          </div>
        </div>

        <div className="overflow-hidden bg-white rounded-lg shadow-md">
          {filteredProducts.length === 0 ? (
            <div className="p-8 text-center">
              <p className="text-gray-500">No products found</p>
            </div>
          ) : (
            <>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">Product</th>
                      <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">Category</th>
                      <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">Price</th>
                      <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">Colors</th>
                      <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">Sizes</th>
                      <th className="px-6 py-3 text-xs font-medium tracking-wider text-right text-gray-500 uppercase">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {currentProducts.map((product) => (
                      <tr key={product.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 w-10 h-10">
                              <img className="object-cover w-10 h-10 rounded" src={product.images[0]?.url} alt={product.name} />
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">{product.name}</div>
                              <div className="text-sm text-gray-500 line-clamp-1">{product.description}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{getCategoryLabel(product.category)}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">${product.price}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex flex-wrap gap-1">
                            {product.colors.map((color, idx) => (
                              <span key={idx} className="px-2 py-1 text-xs text-gray-800 bg-gray-100 rounded-full">
                                {color}
                              </span>
                            ))}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex flex-wrap gap-1">
                            {product.sizes.map((size, idx) => (
                              <span key={idx} className="px-2 py-1 text-xs text-gray-800 bg-gray-100 rounded-full">
                                {size}
                              </span>
                            ))}
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm font-medium text-right whitespace-nowrap">
                          <div className="flex justify-end space-x-2">
                            <button
                              onClick={() => handleView(product.id)}
                              className="p-2 text-blue-500 rounded-full hover:bg-blue-50"
                              title="View"
                            >
                              <FiEye className="w-5 h-5" />
                            </button>
                            <button
                              onClick={() => handleEdit(product.id)}
                              className="p-2 text-green-500 rounded-full hover:bg-green-50"
                              title="Edit"
                            >
                              <FiEdit className="w-5 h-5" />
                            </button>
                            <button
                              onClick={() => handleDelete(product.id)}
                              className="p-2 text-red-500 rounded-full hover:bg-red-50"
                              title="Delete"
                              disabled={deleteId === product.id}
                            >
                              {deleteId === product.id ? (
                                <div className="w-5 h-5 border-2 border-red-500 rounded-full animate-spin border-t-transparent"></div>
                              ) : (
                                <FiTrash2 className="w-5 h-5" />
                              )}
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex items-center justify-between px-6 py-3 bg-gray-50">
                  <div className="text-sm text-gray-700">
                    Showing <span className="font-medium">{indexOfFirstProduct + 1}</span> to{' '}
                    <span className="font-medium">
                      {Math.min(indexOfLastProduct, filteredProducts.length)}
                    </span>{' '}
                    of <span className="font-medium">{filteredProducts.length}</span> results
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => paginate(Math.max(1, currentPage - 1))}
                      disabled={currentPage === 1}
                      className="px-3 py-1 text-sm border border-gray-300 rounded-md disabled:opacity-50"
                    >
                      Previous
                    </button>
                    {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                      // Show pages around current page
                      let pageNum;
                      if (totalPages <= 5) {
                        pageNum = i + 1;
                      } else if (currentPage <= 3) {
                        pageNum = i + 1;
                      } else if (currentPage >= totalPages - 2) {
                        pageNum = totalPages - 4 + i;
                      } else {
                        pageNum = currentPage - 2 + i;
                      }
                      return (
                        <button
                          key={pageNum}
                          onClick={() => paginate(pageNum)}
                          className={`px-3 py-1 text-sm rounded-md ${currentPage === pageNum ? 'bg-blue-500 text-white' : 'border border-gray-300'}`}
                        >
                          {pageNum}
                        </button>
                      );
                    })}
                    <button
                      onClick={() => paginate(Math.min(totalPages, currentPage + 1))}
                      disabled={currentPage === totalPages}
                      className="px-3 py-1 text-sm border border-gray-300 rounded-md disabled:opacity-50"
                    >
                      Next
                    </button>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default Productlist;