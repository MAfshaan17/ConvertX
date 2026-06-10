import React from 'react';
import { getCurrencyLabel } from '../utils/currencyUtils';

const CurrencyDropdown = ({ currencies, selectedCurrency, onChange, label }) => {
  return (
    <div className="flex flex-col flex-1">
      <label className="text-sm font-medium text-gray-300 mb-1">{label}</label>
      <div className="relative">
        <select
          value={selectedCurrency}
          onChange={(e) => onChange(e.target.value)}
          className="w-full appearance-none bg-slate-800 border border-slate-600 text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-200"
        >
          {currencies.map((currency) => (
            <option key={currency} value={currency}>
              {getCurrencyLabel(currency)}
            </option>
          ))}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-400">
          <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
        </div>
      </div>
    </div>
  );
};

export default CurrencyDropdown;
