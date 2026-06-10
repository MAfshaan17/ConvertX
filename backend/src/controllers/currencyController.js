const exchangeService = require('../services/exchangeService');
const History = require('../models/History');
const fs = require('fs');
const path = require('path');

/**
 * @desc    Get all available currencies
 * @route   GET /api/currencies
 * @access  Public
 */
const getCurrencies = async (req, res, next) => {
  try {
    const currencies = await exchangeService.getCurrencies();
    res.status(200).json({
      success: true,
      data: currencies,
    });
  } catch (error) {
    res.status(500);
    next(error);
  }
};

/**
 * @desc    Convert currency and save to history
 * @route   GET /api/convert
 * @access  Public
 */
const convertCurrency = async (req, res, next) => {
  try {
    const { from, to, amount } = req.query;

    if (!from || !to || !amount) {
      res.status(400);
      throw new Error('Please provide from, to, and amount parameters.');
    }

    const parsedAmount = parseFloat(amount);
    if (isNaN(parsedAmount) || parsedAmount <= 0) {
      res.status(400);
      throw new Error('Amount must be a valid positive number.');
    }

    const rates = await exchangeService.getRates(from.toUpperCase());
    
    if (!rates[to.toUpperCase()]) {
      res.status(400);
      throw new Error('Invalid target currency code.');
    }

    const rate = rates[to.toUpperCase()];
    const result = parsedAmount * rate;

    // Save to History asynchronously (non-blocking if it fails, but we await to ensure it completes before response if strict consistency is needed. Here we await it.)
    try {
      await History.create({
        from: from.toUpperCase(),
        to: to.toUpperCase(),
        amount: parsedAmount,
        result: result,
        rate: rate,
      });
    } catch (dbError) {
      console.error('Failed to save history to DB:', dbError.message);
      // We still want to return the result even if history fails to save (e.g. no DB connected)
    }

    res.status(200).json({
      success: true,
      data: {
        from: from.toUpperCase(),
        to: to.toUpperCase(),
        amount: parsedAmount,
        result: result,
        rate: rate,
      },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get conversion history
 * @route   GET /api/history
 * @access  Public
 */
const getHistory = async (req, res, next) => {
  try {
    const history = await History.find().sort({ createdAt: -1 }).limit(10);
    res.status(200).json({
      success: true,
      data: history,
    });
  } catch (error) {
    console.error('DB fetch error, maybe DB is not connected.');
    // If DB is not connected, gracefully return empty array
    res.status(200).json({
      success: true,
      data: [],
    });
  }
};

/**
 * @desc    Get full rates against a base currency
 * @route   GET /api/rates?base=USD
 * @access  Public
 */
const getRates = async (req, res, next) => {
  try {
    const base = req.query.base || 'USD';
    const rates = await exchangeService.getRates(base.toUpperCase());
    res.status(200).json({
      success: true,
      data: rates,
      base: base.toUpperCase()
    });
  } catch (error) {
    res.status(500);
    next(error);
  }
};

/**
 * @desc    Get project documentation (README.md)
 * @route   GET /api/docs
 * @access  Public
 */
const getDocs = async (req, res, next) => {
  try {
    const readmePath = path.join(__dirname, '../../../../README.md');
    let content = '';
    if (fs.existsSync(readmePath)) {
      content = fs.readFileSync(readmePath, 'utf8');
    } else {
      content = '# Documentation not found\\nPlease ensure README.md exists in the root folder.';
    }
    
    res.status(200).json({
      success: true,
      data: content,
    });
  } catch (error) {
    res.status(500);
    next(error);
  }
};

module.exports = {
  getCurrencies,
  convertCurrency,
  getHistory,
  getRates,
  getDocs,
};
