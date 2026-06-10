import React from 'react';

const Footer = () => {
  return (
    <footer className="mt-12 py-6 text-center text-gray-400 text-sm glass">
      <p>&copy; {new Date().getFullYear()} ConvertX Pro. All rights reserved.</p>
      <p className="mt-1">Powered by ExchangeRate API & React</p>
    </footer>
  );
};

export default Footer;
