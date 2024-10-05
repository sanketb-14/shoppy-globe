import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToCart } from '../redux/features/cartSlice';
import { motion } from 'framer-motion';
import { FaShoppingCart, FaStar, FaTags, FaBox, FaExchangeAlt, FaCheck } from 'react-icons/fa';
import Loader from './Loader';

const ProductDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isAddedToCart, setIsAddedToCart] = useState(false);

  useEffect(() => {
    const fetchProductDetail = async () => {
      try {
        const response = await fetch(`https://dummyjson.com/products/${id}`);
        if (!response.ok) {
          throw new Error('Product not found');
        }
        const data = await response.json();
        setProduct(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchProductDetail();
  }, [id]);

  const handleAddToCart = () => {
    dispatch(addToCart(product));
    setIsAddedToCart(true);
    
    // Reset the button after 2 seconds
    setTimeout(() => {
      setIsAddedToCart(false);
    }, 2000);
  };

  if (loading) return <Loader />;
  if (error) return <div>Error: {error}</div>;
  if (!product) return <div>Product not found</div>;

  return (
    <div className="container mx-auto mt-8 px-4">
      <motion.div 
        className="bg-gradient-to-b from-primary/50 to-null shadow-lg rounded-lg overflow-hidden"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex flex-col lg:flex-row">
          <motion.div 
            className="lg:w-1/2"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <motion.img 
              className="w-full h-96 object-contain"
              src={product.thumbnail}
              alt={product.title}
              initial={{ scale: 1.1 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5 }}
            />
          </motion.div>
          <div className="lg:w-1/2 p-8">
            <div className="flex flex-wrap gap-2 mb-4">
              {product.tags.map((tag, index) => (
                <motion.span
                  key={index}
                  className="badge  sm:badge-md badge-secondary  px-2 py-1 rounded-full text-sm flex items-center"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <FaTags className="mr-1" /> {tag}
                </motion.span>
              ))}
            </div>
            <div className="uppercase tracking-wide text-sm text-secondary font-semibold">{product.category}</div>
            <h2 className="block mt-1 text-lg leading-tight font-medium text-primary">{product.title}</h2>
            <p className="mt-2 text-base">{product.description}</p>
            <div className="mt-4">
              <span className="text-secondary font-bold text-xl">${product.price.toFixed(2)}</span>
              {product.discountPercentage > 0 && (
                <span className="ml-2 text-sm text-red-500">({product.discountPercentage}% off)</span>
              )}
            </div>
            <div className="mt-4">
              <motion.button 
                onClick={handleAddToCart}
                className={`btn-gradient btn-lg text-white font-bold py-2 px-4 rounded flex items-center justify-center w-48 ${isAddedToCart ? 'bg-green-500 hover:bg-green-600' : 'hover:btn-gradient-hover'}`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {isAddedToCart ? (
                  <>
                    <FaCheck className="mr-2" /> Added to Cart
                  </>
                ) : (
                  <>
                    <FaShoppingCart className="mr-2" /> Add to Cart
                  </>
                )}
              </motion.button>
            </div>
            <motion.div 
              className="mt-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <h3 className="text-lg font-semibold mb-2">Stock Status</h3>
              <p className={`flex items-center ${product.stock > 0 ? 'text-green-500' : 'text-red-500'}`}>
                <FaBox className="mr-2" />
                {product.stock > 0 ? 'In Stock' : 'Out of Stock'}
              </p>
            </motion.div>
            <motion.div 
              className="mt-4 "
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <h3 className="text-lg font-semibold ">Return Policy</h3>
              <p className="flex items-center text-slate-400">
                <FaExchangeAlt className="mr-2" />
                30-day return policy for unopened items
              </p>
            </motion.div>
            <motion.div 
              className="mt-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <h3 className="text-lg font-semibold mb-2">Rating</h3>
              <p className="flex items-center text-yellow-700">
                <FaStar className="mr-2" />
                {product.rating} out of 5
              </p>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ProductDetail;