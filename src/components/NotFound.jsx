import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import noFound from "../assets/404.svg"

const NotFound = () => {
  return (
    // This motion.div creates an animation effect when the component mounts
    <motion.div 
      className="container mx-auto mt-8 text-center"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <img src={noFound} alt="404 Not Found" className="mx-auto mb-8 w-64 h-64" />
      <h1 className="text-4xl font-bold mb-4">404 - Page Not Found</h1>
      <p className="text-xl mb-8">Oops! The page you're looking for doesn't exist.</p>
      {/* This Link component creates a button that navigates back to the home page */}
      <Link 
        to="/" 
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Go back to Home
      </Link>
    </motion.div>
  );
};

export default NotFound;