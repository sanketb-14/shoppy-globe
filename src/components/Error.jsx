
import { motion } from 'framer-motion';
import { FaExclamationTriangle, FaRedoAlt } from 'react-icons/fa';


const Error = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-base-200">
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-base-100 p-8 rounded-lg shadow-xl text-center"
        >
          <FaExclamationTriangle className="text-6xl text-red-500 mb-4 mx-auto" />
          <h2 className="text-2xl font-bold text-red-500 mb-4">Oops! Something went wrong</h2>
          <p className="text-gray-600 mb-6">We couldn't load the products. Please try again later.</p>
          <p className="text-sm text-gray-500 mb-6">Error: {error}</p>
          <button
            onClick={handleRetry}
            className="btn btn-primary bg-gradient-to-r from-primary to-secondary text-white"
          >
            <FaRedoAlt className="mr-2" />
            Retry
          </button>
        </motion.div>
      </div>
  )
}

export default Error
