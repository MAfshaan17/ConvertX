import React, { useState, useEffect, useCallback } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ConverterCard from './components/ConverterCard';
import HistoryList from './components/HistoryList';
import MarketInsights from './components/MarketInsights';
import DocumentationModal from './components/DocumentationModal';
import Toast from './components/Toast';
import { getCurrencies, convertCurrency, getHistory } from './services/api';

const App = () => {
  const [currencies, setCurrencies] = useState([]);
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('INR');
  const [amount, setAmount] = useState('100');
  
  const [result, setResult] = useState(null);
  const [history, setHistory] = useState([]);
  
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState({ message: '', type: '' });
  
  const [isDocsOpen, setIsDocsOpen] = useState(false);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast({ message: '', type: '' }), 4000);
  };

  const fetchCurrencies = useCallback(async () => {
    try {
      const res = await getCurrencies();
      if (res.success) {
        setCurrencies(res.data);
      }
    } catch (error) {
      showToast('Failed to load currencies. Is the backend running?', 'error');
    }
  }, []);

  const fetchHistory = useCallback(async () => {
    try {
      const res = await getHistory();
      if (res.success) {
        setHistory(res.data);
      }
    } catch (error) {
      console.error('Failed to load history', error);
    }
  }, []);

  useEffect(() => {
    fetchCurrencies();
    fetchHistory();
  }, [fetchCurrencies, fetchHistory]);

  const handleConvert = async () => {
    if (!amount || isNaN(amount) || amount <= 0) {
      showToast('Please enter a valid amount', 'error');
      return;
    }

    setLoading(true);
    try {
      const res = await convertCurrency(fromCurrency, toCurrency, amount);
      if (res.success) {
        setResult(res.data);
        showToast('Conversion successful!');
        fetchHistory(); // Refresh history
      } else {
        showToast(res.message || 'Conversion failed', 'error');
      }
    } catch (error) {
      const msg = error.response?.data?.message || 'Network Error. Could not convert.';
      showToast(msg, 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-darkBg text-white selection:bg-primary selection:text-white relative">
      {/* Background decoration */}
      <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-primary opacity-20 blur-[100px] rounded-full pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-accent opacity-10 blur-[120px] rounded-full pointer-events-none"></div>

      <Navbar onOpenDocs={() => setIsDocsOpen(true)} />
      
      <main className="flex-grow container mx-auto px-4 py-8 z-10 relative">
        <ConverterCard 
          currencies={currencies}
          fromCurrency={fromCurrency}
          setFromCurrency={setFromCurrency}
          toCurrency={toCurrency}
          setToCurrency={setToCurrency}
          amount={amount}
          setAmount={setAmount}
          onConvert={handleConvert}
          loading={loading}
          result={result}
        />
        
        <MarketInsights baseCurrency="USD" />
        
        <HistoryList history={history} />
      </main>

      <Footer />
      
      <DocumentationModal isOpen={isDocsOpen} onClose={() => setIsDocsOpen(false)} />
      
      <Toast 
        message={toast.message} 
        type={toast.type} 
        onClose={() => setToast({ message: '', type: '' })} 
      />
    </div>
  );
};

export default App;
