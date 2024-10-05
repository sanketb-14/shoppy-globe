import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart, updateQuantity } from '../redux/features/cartSlice';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import emptyCart from "../assets/empty cart.svg"

const CartItem = ({ item }) => {
  const dispatch = useDispatch();

  return (
    <motion.div 
      className="flex items-center border-b py-4"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      layout
    >
      <img src={item.thumbnail} alt={item.title} className="w-16 sm:w-24 h-16 sm:h-24 object-cover mr-1 sm:mr-4" />
      <div className="flex-grow">
        <h3 className="font-semibold">{item.title}</h3>
        <p className="text-primary">${item.price.toFixed(2)}</p>
      </div>
      <div className="flex items-center">
        <motion.button 
          whileTap={{ scale: 0.95 }}
          onClick={() => dispatch(updateQuantity({ id: item.id, quantity: Math.max(1, item.quantity - 1) }))}
          className="bg-info px-1 sm:px-3 py-1 rounded-full text-lg font-bold"
        >
          -
        </motion.button>
        <motion.span 
          key={item.quantity}
          initial={{ scale: 1.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="mx-3 font-semibold"
        >
          {item.quantity}
        </motion.span>
        <motion.button 
          whileTap={{ scale: 0.95 }}
          onClick={() => dispatch(updateQuantity({ id: item.id, quantity: item.quantity + 1 }))}
          className="bg-info px-1 sm:px-3 py-1 rounded-full text-lg font-bold"
        >
          +
        </motion.button>
      </div>
      <motion.button 
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => dispatch(removeFromCart(item.id))}
        className="ml-1 sm:ml-4  text-red-500 hover:text-red-700"
      >
        Remove
      </motion.button>
    </motion.div>
  );
};

const Cart = () => {
  const cartItems = useSelector(state => state.cart);
  const dispatch = useDispatch();
  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const discount = cartItems.reduce((sum, item) => sum + (item.discountPercentage || 0) * item.price * item.quantity / 100, 0);

  // Remove the useEffect hook that was updating order items

  return (
    <div className="container mx-auto mt-8 p-8 bg-gradient-to-r from-primary/30 to-null rounded-lg shadow-lg">
      <h2 className="text-xl sm:text-2xl font-semibold  sm:font-bold mb-4 text-primary">Your Cart</h2>
      <AnimatePresence>
        {cartItems.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="flex flex-col items-center justify-center h-[60vh]"
          >
            <h3 className="text-xl sm:text-2xl font-semibold mb-8 text-gray-600">Your cart is empty</h3>
            <img src={emptyCart} alt="Empty Cart" className="w-1/2 max-w-md" />
          </motion.div>
        ) : (
          <>
            {cartItems.map(item => (
              <CartItem key={item.id} item={item} />
            ))}
            <div className="mt-4 sm:mt-8 flex justify-between items-start">
              <div>
                <p className="text-md sm:text-lg font-semibold text-green-600">You save: ${discount.toFixed(2)}</p>
              </div>
              <div className="text-right">
                <p className="text-xl font-semibold text-secondary">Total: ${total.toFixed(2)}</p>
                <Link 
                  to="/checkout"
                  className="btn btn-sm sm:btn-md  bg-gradient-to-r from-blue-500 to-purple-600 text-white mt-4 w-full max-w-3xl "
                >
                  Proceed to Checkout
                </Link>
              </div>
            </div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Cart;