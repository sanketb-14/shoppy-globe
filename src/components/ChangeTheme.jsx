import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaSun, FaMoon } from 'react-icons/fa';

const ChangeTheme = () => {
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleTheme = () => {
    setIsDarkTheme(!isDarkTheme);
    document.documentElement.setAttribute('data-theme', isDarkTheme ? 'winter' : 'night');
  };

  return (
    <div className="flex items-center justify-center">
      <motion.button
        onClick={toggleTheme}
        className={`btn ${isMobile ? 'btn-sm' : 'btn-md'} btn-circle btn-ghost`}
        initial={{ scale: 0.8, rotate: 0 }}
        animate={{ scale: 1, rotate: isDarkTheme ? 360 : 0 }}
        transition={{ duration: 0.3 }}
      >
        {isDarkTheme ? <FaSun className={isMobile ? 'text-sm' : 'text-base'} /> : <FaMoon className={isMobile ? 'text-sm' : 'text-base'} />}
      </motion.button>
    </div>
  );
};

export default ChangeTheme;
