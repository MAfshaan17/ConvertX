import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Toast = ({ message, type, onClose }) => {
  return (
    <AnimatePresence>
      {message && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          className={`fixed bottom-5 right-5 px-6 py-3 rounded-lg shadow-lg text-white font-medium z-50 ${
            type === 'error' ? 'bg-red-500' : 'bg-accent'
          }`}
        >
          <div className="flex items-center space-x-3">
            <span>{message}</span>
            <button onClick={onClose} className="text-white hover:text-gray-200 focus:outline-none">
              &times;
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Toast;
