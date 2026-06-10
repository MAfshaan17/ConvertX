import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaExchangeAlt, FaSpinner } from 'react-icons/fa';
import CurrencyDropdown from './CurrencyDropdown';

const ConverterCard = ({
  currencies,
  fromCurrency,
  setFromCurrency,
  toCurrency,
  setToCurrency,
  amount,
  setAmount,
  onConvert,
  loading,
  result
}) => {

  const handleSwap = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  };

  const handleAmountChange = (e) => {
    // Only allow valid positive numbers
    const value = e.target.value;
    if (value === '' || /^\d*\.?\d*$/.test(value)) {
      setAmount(value);
    }
  };

  return (
    <motion.div 
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 260, damping: 20 }}
      className="glass p-8 rounded-3xl shadow-2xl max-w-2xl mx-auto mt-10 relative overflow-hidden"
    >
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-accent"></div>
      
      <h1 className="text-3xl font-bold text-white mb-8 text-center tracking-tight">Currency Converter</h1>

      <div className="flex flex-col space-y-6">
        
        {/* Amount Input */}
        <div>
          <label className="text-sm font-medium text-gray-300 mb-1 block">Amount</label>
          <input
            type="text"
            value={amount}
            onChange={handleAmountChange}
            placeholder="Enter amount"
            className="w-full bg-slate-800 border border-slate-600 text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-200 font-semibold text-lg"
          />
        </div>

        {/* Currency Selectors & Swap */}
        <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0 md:space-x-4 relative">
          <CurrencyDropdown 
            label="From"
            currencies={currencies}
            selectedCurrency={fromCurrency}
            onChange={setFromCurrency}
          />

          <motion.button
            whileHover={{ scale: 1.1, rotate: 180 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleSwap}
            className="p-3 bg-slate-700 hover:bg-slate-600 rounded-full text-white mt-4 md:mt-0 self-center focus:outline-none ring-2 ring-transparent focus:ring-primary transition-all z-10 shadow-lg"
            aria-label="Swap currencies"
          >
            <FaExchangeAlt />
          </motion.button>

          <CurrencyDropdown 
            label="To"
            currencies={currencies}
            selectedCurrency={toCurrency}
            onChange={setToCurrency}
          />
        </div>

        {/* Convert Button */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onConvert}
          disabled={loading || !amount || amount <= 0}
          className="w-full bg-gradient-to-r from-primary to-blue-600 hover:from-blue-600 hover:to-primary text-white font-bold py-4 rounded-xl shadow-lg transition-all flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? (
            <FaSpinner className="animate-spin text-xl" />
          ) : (
            'Convert Now'
          )}
        </motion.button>

        {/* Result Display */}
        {result && !loading && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-6 p-6 bg-slate-800/80 rounded-xl border border-slate-700 text-center"
          >
            <p className="text-gray-400 mb-1 text-lg">
              {amount} {result.from} =
            </p>
            <p className="text-4xl font-bold text-accent">
              {result.result.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 4 })} <span className="text-2xl">{result.to}</span>
            </p>
            <p className="text-gray-400 mt-3 text-sm">
              1 {result.from} = {result.rate} {result.to}
            </p>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default ConverterCard;
