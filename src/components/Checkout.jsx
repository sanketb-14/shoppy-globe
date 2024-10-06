import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { clearCart } from '../redux/features/cartSlice';
import { placeOrder } from '../redux/features/orderSlice';

const Checkout = () => {
  const cartItems = useSelector(state => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: ''
  });

  // Calculate the total price of items in the cart
  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  // Update form data when input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission, place order, clear cart, and navigate to confirmation
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(placeOrder({
      items: cartItems,
      user: formData
    }));
    dispatch(clearCart());
    navigate('/order-confirmation');
  };

  return (
    <motion.div 
      className="container mx-auto mt-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-2xl font-bold mb-4">Checkout</h2>
      <form onSubmit={handleSubmit} className="max-w-lg">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="address">
            Address
          </label>
          <textarea
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          ></textarea>
        </div>
        <div className="mb-4">
          <p className="text-xl font-semibold">Total: ${total.toFixed(2)}</p>
        </div>
        <button 
          type="submit" 
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Place Order
        </button>
      </form>
    </motion.div>
  );
};

export default Checkout;