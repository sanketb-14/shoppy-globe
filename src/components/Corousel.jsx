import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom'; // Add this import

const Carousel = ({ products }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [displayProducts, setDisplayProducts] = useState([]);

  useEffect(() => {
    if (products.length > 0) {
      const randomProducts = [...products].sort(() => 0.5 - Math.random()).slice(0, 5);
      setDisplayProducts(randomProducts);
    }
  }, [products]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % displayProducts.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [displayProducts]);

  if (displayProducts.length === 0) return null;

  const variants = {
    enter: (direction) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: (direction) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0
    })
  };

  const paginate = (newDirection) => {
    setCurrentIndex((prevIndex) => (prevIndex + newDirection + displayProducts.length) % displayProducts.length);
  };

  return (
    <div className="w-full max-w-7xl mb-8 overflow-hidden rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-primary mb-2">Trending Categories</h2>
      <p className="text-lg text-secondary mb-4">Shop from our latest collections</p>
      <div className="relative w-full h-64 sm:h-80">
        <AnimatePresence initial={false} custom={1}>
          <motion.div
            key={currentIndex}
            custom={1}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 }
            }}
            className="absolute w-full h-full bg-gradient-to-r from-primary/50 to-secondary/50"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-secondary/10"></div>
            <img
              src={displayProducts[currentIndex].thumbnail}
              alt={displayProducts[currentIndex].title}
              className="w-full h-full object-contain relative z-10"
            />
            <div className="absolute inset-0 flex flex-col justify-center items-start p-8 z-20">
              <span className="text-sm font-semibold text-white bg-primary/50 px-2 py-1 rounded-full mb-2">
                {displayProducts[currentIndex].category}
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-white mb-2">{displayProducts[currentIndex].title}</h2>
              <p className="text-xl text-white mb-2">Trending {displayProducts[currentIndex].category} for every style</p>
              <p className="text-lg text-white mb-4">Starting from ${displayProducts[currentIndex].price.toFixed(2)}</p>
              <Link 
                to={`/product/${displayProducts[currentIndex].id}`} 
                className="btn btn-gradient hover:btn-gradient-hover"
              >
                Explore
              </Link>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
     
    </div>
  );
};

export default Carousel;