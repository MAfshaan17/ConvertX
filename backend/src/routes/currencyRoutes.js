const express = require('express');
const router = express.Router();
const { getCurrencies, convertCurrency, getHistory, getRates, getDocs } = require('../controllers/currencyController');

router.get('/currencies', getCurrencies);
router.get('/convert', convertCurrency);
router.get('/history', getHistory);
router.get('/rates', getRates);
router.get('/docs', getDocs);

module.exports = router;
