import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes, FaSearch, FaListUl, FaSpinner, FaExchangeAlt, FaArrowLeft } from 'react-icons/fa';
import { getCurrencyLabel, getCountryFromCurrency, getFlagUrl, getCurrencyName } from '../utils/currencyUtils';
import { getRates } from '../services/api';

const RatesComparisonModal = ({ isOpen, onClose, rates: initialRates, baseCurrency }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [rates, setRates] = useState(initialRates);
  const [loading, setLoading] = useState(false);
  const [selectedCurrency, setSelectedCurrency] = useState(null);

  if (!rates) return null;

  const currencyCodes = Object.keys(rates);
  
  const filteredCodes = currencyCodes.filter(code => 
    code.toLowerCase().includes(searchTerm.toLowerCase()) || 
    getCurrencyLabel(code).toLowerCase().includes(searchTerm.toLowerCase()) ||
    getCountryFromCurrency(code).toLowerCase().includes(searchTerm.toLowerCase())
  );

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
          
          {/* Modal Container */}
          <div className="fixed inset-0 z-[101] flex items-center justify-center p-4 md:p-8 pointer-events-none">
            <motion.div 
              initial={{ opacity: 0, y: 50, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="w-full max-w-5xl h-[85vh] relative pointer-events-auto glass border border-slate-600 rounded-2xl shadow-2xl flex flex-col overflow-hidden bg-slate-900/95"
            >
              <div className="flex items-center justify-between p-6 border-b border-slate-700 bg-slate-800/80">
                <div className="flex items-center space-x-3">
                  <FaListUl className="text-primary text-xl" />
                  <h2 className="text-xl font-bold text-white">Full Market Comparison (Standard: {baseCurrency})</h2>
                </div>
              <button 
                onClick={onClose}
                className="text-gray-400 hover:text-white p-2 rounded-full hover:bg-slate-700 transition-colors focus:outline-none"
              >
                <FaTimes size={24} />
              </button>
            </div>
            
            <div className="p-6 border-b border-slate-700 bg-slate-800/40">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaSearch className="text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search currencies or countries..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-600 text-white rounded-lg pl-10 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-200"
                />
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-6 bg-slate-900/50">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredCodes.map(code => (
                  <div 
                    key={code} 
                    onClick={() => setSelectedCurrency(code)}
                    className="bg-slate-800 p-4 rounded-xl border border-slate-700 hover:border-primary transition-colors flex items-center justify-between space-x-4 cursor-pointer hover:bg-slate-750 group"
                  >
                    <div className="flex items-center space-x-4 overflow-hidden">
                      <img 
                        src={getFlagUrl(code)} 
                        alt={`${code} Flag`} 
                        className="w-10 h-10 object-cover rounded-full shadow-md group-hover:scale-110 transition-transform"
                        onError={(e) => { e.target.src = 'https://upload.wikimedia.org/wikipedia/commons/e/e1/Globe.svg'; }}
                      />
                      <div className="truncate">
                        <p className="font-bold text-white truncate" title={getCurrencyLabel(code)}>{getCurrencyLabel(code)}</p>
                        <p className="text-xs text-gray-400 mt-1 truncate">{getCountryFromCurrency(code)}</p>
                      </div>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <p className="text-primary font-mono font-bold group-hover:text-accent transition-colors">
                        {rates[code].toLocaleString(undefined, { maximumFractionDigits: 4 })}
                      </p>
                    </div>
                  </div>
                ))}
                
                {filteredCodes.length === 0 && (
                  <div className="col-span-full text-center py-10 text-gray-400">
                    No currencies found matching "{searchTerm}"
                  </div>
                )}
              </div>
            </div>
          {/* Nested Detail Overlay */}
          <AnimatePresence>
            {selectedCurrency && rates && (
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="absolute inset-0 z-[102] bg-slate-900 flex flex-col"
              >
                <div className="flex items-center justify-between p-6 border-b border-slate-700 bg-slate-800/80">
                  <button 
                    onClick={() => setSelectedCurrency(null)}
                    className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors focus:outline-none"
                  >
                    <FaArrowLeft />
                    <span className="font-bold">Back to List</span>
                  </button>
                  <button 
                    onClick={() => { setSelectedCurrency(null); onClose(); }}
                    className="text-gray-400 hover:text-white p-2 rounded-full hover:bg-slate-700 transition-colors focus:outline-none"
                  >
                    <FaTimes size={24} />
                  </button>
                </div>
                
                <div className="flex-1 overflow-y-auto p-6 md:p-12 flex flex-col items-center">
                  <motion.div 
                    initial={{ scale: 0.8 }}
                    animate={{ scale: 1 }}
                    className="mb-6 relative"
                  >
                    <img 
                      src={getFlagUrl(selectedCurrency)} 
                      alt={`${selectedCurrency} Flag`} 
                      className="w-48 md:w-64 h-auto aspect-[3/2] object-cover rounded-2xl shadow-2xl border-4 border-slate-700"
                      onError={(e) => { e.target.src = 'https://upload.wikimedia.org/wikipedia/commons/e/e1/Globe.svg'; }}
                    />
                  </motion.div>
                  <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-2 text-center">
                    {getCurrencyName(selectedCurrency)}
                  </h2>
                  <p className="text-xl text-primary mb-8 tracking-widest">{selectedCurrency} • {getCountryFromCurrency(selectedCurrency)}</p>
                  
                  <div className="w-full max-w-2xl bg-slate-800/50 rounded-3xl p-6 md:p-10 border border-slate-700 space-y-8">
                    
                    <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
                      <div className="text-center md:text-left flex-1">
                        <p className="text-gray-400 text-sm uppercase tracking-wider mb-2">Base Standard</p>
                        <p className="text-2xl font-bold text-white">1 {baseCurrency}</p>
                      </div>
                      
                      <div className="px-6 flex flex-col items-center text-accent">
                        <FaExchangeAlt size={24} />
                      </div>

                      <div className="text-center md:text-right flex-1">
                        <p className="text-gray-400 text-sm uppercase tracking-wider mb-2">Equivalent In</p>
                        <p className="text-2xl font-bold text-primary">
                          {rates[selectedCurrency].toLocaleString(undefined, { maximumFractionDigits: 6 })} {selectedCurrency}
                        </p>
                      </div>
                    </div>

                    <div className="w-full h-px bg-slate-700"></div>

                    <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
                      <div className="text-center md:text-left flex-1">
                        <p className="text-gray-400 text-sm uppercase tracking-wider mb-2">Selected Currency</p>
                        <p className="text-2xl font-bold text-white">1 {selectedCurrency}</p>
                      </div>
                      
                      <div className="px-6 flex flex-col items-center text-accent">
                        <FaExchangeAlt size={24} />
                      </div>

                      <div className="text-center md:text-right flex-1">
                        <p className="text-gray-400 text-sm uppercase tracking-wider mb-2">Inverse Rate</p>
                        <p className="text-2xl font-bold text-primary">
                          {(1 / rates[selectedCurrency]).toLocaleString(undefined, { maximumFractionDigits: 6 })} {baseCurrency}
                        </p>
                      </div>
                    </div>

                  </div>

                  <button
                    onClick={() => setSelectedCurrency(null)}
                    className="mt-10 bg-slate-800 hover:bg-slate-700 text-white font-bold py-3 px-8 rounded-full border border-slate-600 transition-all flex items-center space-x-3 shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    <FaArrowLeft />
                    <span>Go Back to List</span>
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
};

export default RatesComparisonModal;
