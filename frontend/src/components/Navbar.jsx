import React from 'react';
import { motion } from 'framer-motion';
import { FaExchangeAlt } from 'react-icons/fa';

const Navbar = ({ onOpenDocs }) => {
  return (
    <motion.nav 
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="glass sticky top-0 z-50 px-6 py-4 flex justify-between items-center"
    >
      <div className="flex items-center space-x-2 text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
        <FaExchangeAlt className="text-primary" />
        <span>ConvertX Pro</span>
      </div>
      <div>
        <button 
          onClick={onOpenDocs} 
          className="text-gray-300 hover:text-white transition-colors text-sm font-medium focus:outline-none"
        >
          Documentation
        </button>
      </div>
    </motion.nav>
  );
};

export default Navbar;
