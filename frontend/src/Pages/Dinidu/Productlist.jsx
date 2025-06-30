import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { FiEdit, FiTrash2, FiEye, FiPlus } from 'react-icons/fi';
import axios from 'axios';
import { toast } from 'react-toastify';

const ProductList = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 10;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await axios.get('/api/products');
        
        // Validate and normalize the response data
        let productsData = [];
        if (Array.isArray(response.data)) {
          productsData = response.data;
        } else if (response.data && Array.isArray(response.data.products)) {
          productsData = response.data.products;
        } else if (response.data && typeof response.data === 'object') {
          productsData = Object.values(response.data);
        }

        setProducts(productsData || []);
      } catch (err) {
        console.error('Error fetching products:', err);
        setError('Failed to load products. Please try again later.');
        toast.error('Failed to load products');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleDelete = async (id) => {
    setDeleteId(id);
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await axios.delete(`/api/products/${id}`);
        setProducts(prevProducts => 
          Array.isArray(prevProducts) 
            ? prevProducts.filter(product => product?._id !== id) 
            : []
        );
        toast.success('Product deleted successfully');
      } catch (error) {
        console.error('Error deleting product:', error);
        toast.error('Failed to delete product');
      } finally {
        setDeleteId(null);
      }
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

  const handleAdd = () => {
    navigate('/admin/products/add');
  };

  // Safe filtering with null checks
  const filteredProducts = (Array.isArray(products) ? products : [])
    .filter(product => {
      if (!product) return false;
      const searchTermLower = searchTerm.toLowerCase();
      return (
        (product.name?.toLowerCase() || '').includes(searchTermLower) ||
        (product.category?.toLowerCase() || '').includes(searchTermLower) ||
        (product.description?.toLowerCase() || '').includes(searchTermLower)
      );
    });

  // Pagination logic with safe array handling
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.max(1, Math.ceil(filteredProducts.length / productsPerPage));

  const paginate = (pageNumber) => setCurrentPage(Math.max(1, Math.min(pageNumber, totalPages)));

  const getCategoryLabel = (value) => {
    if (!value) return 'Uncategorized';
    switch (value.toLowerCase()) {
      case 'women': return "Women's Collection";
      case 'men': return "Men's Collection";
      case 'kids': return "Kids Collection";
      default: return value;
    }
  };

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-64 p-4 text-center">
        <div className="mb-2 text-lg font-medium text-red-500">{error}</div>
        <button 
          onClick={() => window.location.reload()}
          className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
        >
          Retry
        </button>
      </div>
    );
  }

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
          <h1 className="text-2xl font-bold">Product Management</h1>
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
              onClick={handleAdd}
              className="flex items-center px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600"
            >
              <FiPlus className="mr-2" />
              Add Product
            </button>
          </div>
        </div>

        <div className="overflow-hidden bg-white rounded-lg shadow-md">
          {filteredProducts.length === 0 ? (
            <div className="p-8 text-center">
              <p className="text-gray-500">
                {searchTerm ? 'No products match your search' : 'No products available'}
              </p>
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
                      <tr key={product?._id || Math.random()} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 w-10 h-10">
                              <img 
                                className="object-cover w-10 h-10 rounded" 
                                src={product?.images?.[0] ? `/uploads/${product.images[0]}` : 'https://via.placeholder.com/150'} 
                                alt={product?.name || 'Product image'} 
                              />
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">
                                {product?.name || 'Unnamed Product'}
                              </div>
                              <div className="text-sm text-gray-500 line-clamp-1">
                                {product?.description || 'No description'}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            {getCategoryLabel(product?.category)}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            ${product?.price?.toFixed(2) || '0.00'}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex flex-wrap gap-1">
                            {(Array.isArray(product?.colors) ? product.colors : []).map((color, idx) => (
                              <span key={idx} className="px-2 py-1 text-xs text-gray-800 bg-gray-100 rounded-full">
                                {color || 'N/A'}
                              </span>
                            ))}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex flex-wrap gap-1">
                            {(Array.isArray(product?.sizes) ? product.sizes : []).map((size, idx) => (
                              <span key={idx} className="px-2 py-1 text-xs text-gray-800 bg-gray-100 rounded-full">
                                {size || 'N/A'}
                              </span>
                            ))}
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm font-medium text-right whitespace-nowrap">
                          <div className="flex justify-end space-x-2">
                            <button
                              onClick={() => product?._id && handleView(product._id)}
                              className="p-2 text-blue-500 rounded-full hover:bg-blue-50"
                              title="View"
                            >
                              <FiEye className="w-5 h-5" />
                            </button>
                            <button
                              onClick={() => product?._id && handleEdit(product._id)}
                              className="p-2 text-green-500 rounded-full hover:bg-green-50"
                              title="Edit"
                            >
                              <FiEdit className="w-5 h-5" />
                            </button>
                            <button
                              onClick={() => product?._id && handleDelete(product._id)}
                              className="p-2 text-red-500 rounded-full hover:bg-red-50"
                              title="Delete"
                              disabled={deleteId === product?._id}
                            >
                              {deleteId === product?._id ? (
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
                <div className="flex flex-col items-center justify-between px-6 py-3 bg-gray-50 sm:flex-row">
                  <div className="mb-2 text-sm text-gray-700 sm:mb-0">
                    Showing <span className="font-medium">{indexOfFirstProduct + 1}</span> to{' '}
                    <span className="font-medium">
                      {Math.min(indexOfLastProduct, filteredProducts.length)}
                    </span>{' '}
                    of <span className="font-medium">{filteredProducts.length}</span> results
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => paginate(currentPage - 1)}
                      disabled={currentPage === 1}
                      className="px-3 py-1 text-sm border border-gray-300 rounded-md disabled:opacity-50 hover:bg-gray-100"
                    >
                      Previous
                    </button>
                    {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
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
                          className={`px-3 py-1 text-sm rounded-md ${currentPage === pageNum ? 'bg-blue-500 text-white' : 'border border-gray-300 hover:bg-gray-100'}`}
                        >
                          {pageNum}
                        </button>
                      );
                    })}
                    <button
                      onClick={() => paginate(currentPage + 1)}
                      disabled={currentPage === totalPages}
                      className="px-3 py-1 text-sm border border-gray-300 rounded-md disabled:opacity-50 hover:bg-gray-100"
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

export default ProductList;