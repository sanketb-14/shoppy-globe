import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { FaShoppingCart, FaHome } from 'react-icons/fa';

import ChangeTheme from './ChangeTheme';

import { motion } from 'framer-motion';

const Header = () => {
  const cartItems = useSelector(state => state.cart);
  const cartItemCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <header className="navbar bg-base-100 text-primary">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="flex items-center">
          {/* <motion.img
            src={logo}
            alt="ShoppyGlobe Logo"
            className="w-12 sm:w-16 h-12 sm:h-16 mr-2"
            initial={{ opacity: 0 , scale: 0.5}}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 2, ease: "linear" }}
          /> */}
          <motion.span 
            className="text-2xl sm:text-5xl tracking-wider font-bold font-['Dancing_Script']"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 2, ease: "easeInOut" }}
          >
            {[..."ShoppyGlobe"].map((letter, index) => (
              <motion.span
                key={index}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                {letter}
              </motion.span>
            ))}
          </motion.span>
        </Link>
        <nav>
          <ul className="flex space-x-1 text-sm sm:text-lg sm:space-x-4 justify-center items-center ">
            <li>
              <Link to="/" className="btn btn-gradient hover:btn-gradient-hover">
                <FaHome className="mr-1" />
                Home
              </Link>
            </li>
            <li>
              <div className="flex-none">
                <div className="dropdown dropdown-end">
                  <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
                    <div className="indicator">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                      <span className="badge badge-sm indicator-item">{cartItemCount}</span>
                    </div>
                  </div>
                  <div
                    tabIndex={0}
                    className="card card-compact dropdown-content bg-base-100 z-[1] mt-3 w-52 shadow">
                    <div className="card-body">
                      <span className="text-lg font-bold">{cartItemCount} Items</span>
                      <span className="text-info">Subtotal: ${cartItems.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2)}</span>
                      <div className="card-actions">
                        <Link to="/cart" className="btn btn-gradient hover:btn-gradient-hover w-full">View cart</Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </li>
            <li>
              <ChangeTheme />
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;