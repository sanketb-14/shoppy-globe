import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchProducts } from '../redux/features/productSlice';
import { addToCart } from '../redux/features/cartSlice'; // Add this import
import { motion } from 'framer-motion';
import { FaSearch, FaStar, FaEye, FaShoppingCart } from 'react-icons/fa';
import Carousel from './Corousel';
import Loader from './Loader';

const ProductList = () => {
  const dispatch = useDispatch();
  const { items: allProducts, status, error } = useSelector(state => state.products);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [filteredProducts, setFilteredProducts] = useState([]);

  const categories = ['All', ...new Set(allProducts.map(product => product.category))];

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchProducts());
    }
  }, [status, dispatch]);

  useEffect(() => {
    filterProducts();
  }, [selectedCategory, allProducts, searchTerm]);

  const filterProducts = () => {
    let filtered = allProducts;
    if (selectedCategory !== 'All') {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }
    filtered = filtered.filter(product =>
      product.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredProducts(filtered);
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  const calculateDiscountedPrice = (originalPrice) => {
    const discountRate = 0.1; // 10% discount
    return originalPrice * (1 - discountRate);
  };

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
  };

  if (status === 'loading') {
    return <Loader />
  }

  if (status === 'failed') {
    return <div>Error: {error}</div>;
  }

  return (
    <div className='w-full max-w-6xl flex flex-col items-center justify-center m- sm:m-4 p-2 sm:p-4 bg-base-100'>
      
      <motion.div
        className="w-full max-w-md relative mb-8"
        initial={{ width: "80%" }}
        whileFocus={{ width: "100%" }}
        transition={{ duration: 0.3 }}
      >
        <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-2 sm:p-4 pr-10 border rounded-lg bg-transparent shadow-md focus:outline-none focus:ring-2 focus:ring-gradient-to-r from-primary to-secondary"
        />
        <FaSearch className="absolute right-3 top-1/2 transform -translate-y-1/2 text-secondary" />
      </motion.div>

      <Carousel products={allProducts} />

      <ul className='flex flex-wrap justify-center mb-4'>
        {categories.map((category) => (
          <li key={category} className='mx-2 my-1'>
            <button
              className={`btn btn-sm sm:btn-md ${
                selectedCategory === category
                  ? 'bg-gradient-to-r from-primary to-secondary text-white'
                  : 'bg-gradient-to-t from-primary/10 to-null text-secondary'
              }`}
              onClick={() => handleCategoryChange(category)}
            >
              {category}
            </button>
          </li>
        ))}
      </ul>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 bg-base-100 font-pacifico">
        {filteredProducts.map(product => (
          <motion.div
            key={product.id}
            className="bg-gradient-to-b from-primary/20 to-null my-4 mx-1 p-2 sm:p-6 rounded-xl shadow-xl overflow-hidden"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="w-full h-64 ">
              <img src={product.thumbnail} alt={product.title} className="w-full h-full object-cover" />
            </div>
            <div className="p-4">
              <div className="flex justify-between items-start mb-2">
                <h2 className="text-md sm:text-lg font-semibold text-secondary">{product.title}</h2>
                <span className="badge badge-accent">{product.category}</span>
              </div>
              <div className="flex justify-between items-center mb-2">
                <div>
                  <p className="text-2xl font-bold text-accent">
                    ${calculateDiscountedPrice(product.price).toFixed(2)}
                  </p>
                  <p className="text-sm text-gray-500 line-through">
                    ${product.price.toFixed(2)}
                  </p>
                  <p className="text-xs text-green-500">10% off</p>
                </div>
                <div className="flex items-center">
                  <FaStar className="text-yellow-400 mr-1" />
                  <span className="text-gray-600">{product.rating.toFixed(1)}</span>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between mt-4">
              <Link
                to={`/product/${product.id}`}
                className="btn btn-sm sm:btn-md  bg-gradient-to-r from-primary text-white to-secondary"
              >
                <FaEye className="mr-2" />
                View Details
              </Link>
              <button
                onClick={() => handleAddToCart(product)}
                className="btn btn-sm sm:btn-md  bg-gradient-to-r from-blue-500 to-purple-600 text-white"
              >
                <FaShoppingCart className="mr-2" />
                Add to Cart
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;