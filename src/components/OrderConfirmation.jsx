import React from 'react';
import { useSelector } from 'react-redux';
import { Link, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaHome, FaBox, FaUser, FaCalendarAlt, FaTruck, FaShoppingCart } from 'react-icons/fa';

const OrderConfirmation = () => {
  const { items, user, isOrderPlaced } = useSelector((state) => state.order);

  if (!isOrderPlaced) {
    return <Navigate to="/" />;
  }

  // Calculate expected delivery date (5 days from now)
  const deliveryDate = new Date();
  deliveryDate.setDate(deliveryDate.getDate() + 5);

 
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <motion.div 
      className="container mx-auto mt-8 px-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="bg-gradient-to-t from-primary/50 to-null shadow-lg rounded-lg overflow-hidden">
        <div className="p-6">
          <h2 className="text-2xl font-bold mb-4 text-primary flex items-center">
            <FaBox className="mr-2" /> Order Confirmation
          </h2>
          <p className="text-lg mb-4">Thank you for your order!</p>
          
          {user && (
            <motion.div 
              className="mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <h3 className="text-xl font-semibold mb-2 flex items-center">
                <FaUser className="mr-2" /> User Details
              </h3>
              <p><strong>Name:</strong> {user.name}</p>
              <p><strong>Email:</strong> {user.email}</p>
              <p><strong>Address:</strong> {user.address}</p>
            </motion.div>
          )}
          
          {items.length > 0 && (
            <motion.div 
              className="mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <h3 className="text-xl font-semibold mb-2 flex items-center">
                <FaShoppingCart className="mr-2" /> Order Items
              </h3>
              {items.map((item, index) => (
                <div key={index} className="flex justify-between items-center mb-2">
                  <span>{item.title} x {item.quantity}</span>
                  <span>${(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
              <div className="mt-2 pt-2 border-t border-gray-200">
                <strong>Total Amount: ${total.toFixed(2)}</strong>
              </div>
            </motion.div>
          )}
          
          <motion.div 
            className="mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <h3 className="text-xl font-semibold mb-2 flex items-center">
              <FaCalendarAlt className="mr-2" /> Expected Delivery
            </h3>
            <p className="flex items-center">
              <FaTruck className="mr-2" />
              {deliveryDate.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
          >
            <Link to="/">
              <motion.button 
                className="btn btn-primary text-white font-bold py-2 px-4 rounded flex items-center"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <FaHome className="mr-2" /> Back to Home
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default OrderConfirmation;