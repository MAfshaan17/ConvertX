import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FaChartLine, FaArrowUp, FaArrowDown, FaEquals } from 'react-icons/fa';
import { getRates } from '../services/api';
import { getCurrencyLabel } from '../utils/currencyUtils';
import RatesComparisonModal from './RatesComparisonModal';

const MarketInsights = ({ baseCurrency }) => {
  const [insights, setInsights] = useState(null);
  const [loading, setLoading] = useState(false);
  const [rawRates, setRawRates] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchInsights = async () => {
      setLoading(true);
      try {
        const res = await getRates(baseCurrency);
        if (res.success && res.data) {
          const rates = res.data;
          const currencyCodes = Object.keys(rates).filter(c => c !== baseCurrency);
          
          if (currencyCodes.length === 0) return;

          let best = currencyCodes[0];
          let worst = currencyCodes[0];
          let sum = 0;

          currencyCodes.forEach(code => {
            const rate = rates[code];
            if (rate < rates[best]) best = code;
            if (rate > rates[worst]) worst = code;
            sum += rate;
          });

          const avg = sum / currencyCodes.length;

          setRawRates(rates);
          setInsights({
            best: { code: best, rate: rates[best] },
            worst: { code: worst, rate: rates[worst] },
            average: avg
          });
        }
      } catch (error) {
        console.error("Failed to fetch market insights", error);
      } finally {
        setLoading(false);
      }
    };

    fetchInsights();
  }, [baseCurrency]);

  if (loading) {
    return (
      <div className="mt-8 glass rounded-2xl p-8 max-w-4xl mx-auto flex justify-center">
        <div className="animate-pulse text-primary">Loading Insights...</div>
      </div>
    );
  }

  if (!insights) return null;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className={`mt-8 glass rounded-2xl p-6 md:p-8 max-w-4xl mx-auto relative ${isModalOpen ? 'z-[100]' : 'z-10'}`}
    >
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <FaChartLine className="text-primary text-2xl" />
          <h2 className="text-xl font-bold text-white">Market Insights (Base: {baseCurrency})</h2>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-slate-800 hover:bg-slate-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors border border-slate-600 focus:outline-none focus:ring-2 focus:ring-primary"
        >
          View Full Comparison
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Strongest */}
        <div className="bg-slate-800/60 p-5 rounded-xl border border-slate-700 hover:border-accent transition-colors">
          <div className="flex items-center space-x-2 text-accent mb-2">
            <FaArrowUp />
            <span className="font-semibold text-sm tracking-wider uppercase">Strongest</span>
          </div>
          <p className="text-xl font-bold text-white truncate" title={getCurrencyLabel(insights.best.code)}>
            {getCurrencyLabel(insights.best.code)}
          </p>
          <p className="text-gray-400 mt-2 font-mono bg-slate-900/50 p-2 rounded text-sm">
            1 {baseCurrency} = {insights.best.rate.toLocaleString()} {insights.best.code}
          </p>
        </div>

        {/* Weakest */}
        <div className="bg-slate-800/60 p-5 rounded-xl border border-slate-700 hover:border-red-500 transition-colors">
          <div className="flex items-center space-x-2 text-red-400 mb-2">
            <FaArrowDown />
            <span className="font-semibold text-sm tracking-wider uppercase">Weakest</span>
          </div>
          <p className="text-xl font-bold text-white truncate" title={getCurrencyLabel(insights.worst.code)}>
            {getCurrencyLabel(insights.worst.code)}
          </p>
          <p className="text-gray-400 mt-2 font-mono bg-slate-900/50 p-2 rounded text-sm">
            1 {baseCurrency} = {insights.worst.rate.toLocaleString()} {insights.worst.code}
          </p>
        </div>

        {/* Average */}
        <div className="bg-slate-800/60 p-5 rounded-xl border border-slate-700 hover:border-blue-400 transition-colors">
          <div className="flex items-center space-x-2 text-blue-400 mb-2">
            <FaEquals />
            <span className="font-semibold text-sm tracking-wider uppercase">Global Average</span>
          </div>
          <p className="text-xl font-bold text-white">
            All Currencies
          </p>
          <p className="text-gray-400 mt-2 font-mono bg-slate-900/50 p-2 rounded text-sm">
            ~ {insights.average.toLocaleString(undefined, { maximumFractionDigits: 4 })}
          </p>
        </div>
      </div>

      <RatesComparisonModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        rates={rawRates} 
        baseCurrency={baseCurrency} 
      />
    </motion.div>
  );
};

export default MarketInsights;
