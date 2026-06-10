import React from 'react';
import { motion } from 'framer-motion';
import { FaHistory } from 'react-icons/fa';

const HistoryList = ({ history }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="mt-10 glass rounded-2xl p-6 md:p-8 max-w-4xl mx-auto"
    >
      <div className="flex items-center space-x-2 mb-6">
        <FaHistory className="text-primary text-xl" />
        <h2 className="text-xl font-semibold text-white">Recent Conversions</h2>
      </div>

      {history.length === 0 ? (
        <p className="text-gray-400 text-center py-4">No recent conversions found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-600 text-gray-300">
                <th className="py-3 px-4">From</th>
                <th className="py-3 px-4">To</th>
                <th className="py-3 px-4">Amount</th>
                <th className="py-3 px-4">Result</th>
                <th className="py-3 px-4">Rate</th>
                <th className="py-3 px-4">Date</th>
              </tr>
            </thead>
            <tbody>
              {history.map((item, index) => (
                <tr key={index} className="border-b border-gray-700 hover:bg-slate-800/50 transition-colors">
                  <td className="py-3 px-4 font-medium">{item.from}</td>
                  <td className="py-3 px-4 font-medium">{item.to}</td>
                  <td className="py-3 px-4">{item.amount.toLocaleString()}</td>
                  <td className="py-3 px-4 text-accent font-semibold">{item.result.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 4 })}</td>
                  <td className="py-3 px-4 text-gray-400">{item.rate}</td>
                  <td className="py-3 px-4 text-gray-400 text-sm">
                    {new Date(item.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </motion.div>
  );
};

export default HistoryList;
