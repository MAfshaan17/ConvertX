import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const getCurrencies = async () => {
  const response = await axios.get(`${API_URL}/currencies`);
  return response.data;
};

export const convertCurrency = async (from, to, amount) => {
  const response = await axios.get(`${API_URL}/convert`, {
    params: { from, to, amount }
  });
  return response.data;
};

export const getHistory = async () => {
  const response = await axios.get(`${API_URL}/history`);
  return response.data;
};

export const getRates = async (base) => {
  const response = await axios.get(`${API_URL}/rates`, { params: { base } });
  return response.data;
};

export const getDocs = async () => {
  const response = await axios.get(`${API_URL}/docs`);
  return response.data;
};
