import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart, updateQuantity, clearCart } from '../redux/features/cartSlice';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import emptyCart from "../assets/empty cart.svg";
import { FaTrashAlt } from 'react-icons/fa';

// Component to render individual cart items
const CartItem = ({ item }) => {
  const dispatch = useDispatch();

  return (
    <motion.div 
      className="flex w-full max-w-3xl items-center justify-center  my-2  py-1 sm:py-2  bg-gradient-to-r from-primary/10 to-null  rounded-xl shadow-xl  "
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      layout
    >
      <img src={item.thumbnail} alt={item.title} className="w-1/3 sm:w-1/2  h-auto object-cover mr-1 sm:mr-4" />
      <div className="flex flex-col sm:flex-row border-b-2 py-2 border-secondary sm:py-4  w-full items-end justify-between px-2 sm-px-8 ">
      <div className="  ">
        <h3 className="font-semibold tracking-wider ">{item.title}</h3>
        <p className="text-primary">${item.price.toFixed(2)}</p>
      </div>
      <div className="flex items-center ">
        {/* Decrease quantity button */}
        <motion.button 
          whileTap={{ scale: 0.95 }}
          onClick={() => dispatch(updateQuantity({ id: item.id, quantity: Math.max(1, item.quantity - 1) }))}
          className="btn btn-square btn-xs sm:btn-sm "
        >
          -
        </motion.button>
        {/* Quantity display with animation */}
        <motion.span 
          key={item.quantity}
          initial={{ scale: 1.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="mx-3 font-semibold"
        >
          {item.quantity}
        </motion.span>
        {/* Increase quantity button */}
        <motion.button 
          whileTap={{ scale: 0.95 }}
          onClick={() => dispatch(updateQuantity({ id: item.id, quantity: item.quantity + 1 }))}
          className="btn btn-square btn-xs sm:btn-sm "
        >
          +
        </motion.button>
      </div>
      {/* Remove item button with hover and tap animations */}
      <motion.button 
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => dispatch(removeFromCart(item.id))}
        className=" w-full text-end link link-hover link-error text-sm sm:text-lg my-2 mx-auto "
      >
        Remove
      </motion.button>
      </div>
    </motion.div>
  );
};

const Cart = () => {
  const cartItems = useSelector(state => state.cart);
  const dispatch = useDispatch();
  
  // Calculate total price of items in cart
  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  
  // Calculate total discount
  const discount = cartItems.reduce((sum, item) => sum + (item.discountPercentage || 0) * item.price * item.quantity / 100, 0);

  return (
    <div className="flex flex-col items-center justify-center mx-auto mt-8 p-2 sm:p-4  w-full  bg-gradient-to-t from-primary/10 to-null rounded-lg shadow-lg">
      <div className="w-full flex justify-between items-center mb-4">
        <h2 className="text-xl sm:text-3xl border-b-2 border-primary font-semibold  sm:font-bold text-primary">Your Cart</h2>
        {cartItems.length > 0 && (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => dispatch(clearCart())}
            className="btn btn-sm sm:btn-md btn-error flex items-center gap-2"
          >
            <FaTrashAlt /> Clear Cart
          </motion.button>
        )}
      </div>
      {/* AnimatePresence for smooth enter/exit animations of cart items */}
      <AnimatePresence>
        {cartItems.length === 0 ? (
          // Display when cart is empty
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
          // Display when cart has items
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