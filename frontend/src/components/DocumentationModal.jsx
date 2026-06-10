import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import { getDocs } from '../services/api';
import { FaTimes, FaBook } from 'react-icons/fa';

const DocumentationModal = ({ isOpen, onClose }) => {
  const [content, setContent] = useState('Loading documentation...');

  useEffect(() => {
    if (isOpen) {
      const fetchDocs = async () => {
        try {
          const res = await getDocs();
          if (res.success) {
            setContent(res.data);
          } else {
            setContent('# Error loading documentation.');
          }
        } catch (error) {
          setContent('# Error\\nCould not fetch documentation from server.');
        }
      };
      fetchDocs();
    }
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
          />
          
          {/* Modal */}
          <motion.div 
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed inset-4 md:inset-10 lg:inset-x-32 z-[101] glass border border-slate-600 rounded-2xl shadow-2xl flex flex-col overflow-hidden"
          >
            <div className="flex items-center justify-between p-6 border-b border-slate-700 bg-slate-900/50">
              <div className="flex items-center space-x-3">
                <FaBook className="text-primary text-xl" />
                <h2 className="text-xl font-bold text-white">API Documentation & Guide</h2>
              </div>
              <button 
                onClick={onClose}
                className="text-gray-400 hover:text-white p-2 rounded-full hover:bg-slate-700 transition-colors focus:outline-none"
              >
                <FaTimes size={24} />
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-6 md:p-10 prose prose-invert prose-blue max-w-none">
              <ReactMarkdown>{content}</ReactMarkdown>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default DocumentationModal;
