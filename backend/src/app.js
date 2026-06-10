const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const { errorHandler } = require('./middleware/errorMiddleware');
const currencyRoutes = require('./routes/currencyRoutes');

const app = express();

// Security Middlewares
app.use(helmet()); // Secure HTTP headers
app.use(cors()); // Enable CORS for all origins
app.use(express.json()); // Body parser
app.use(morgan('dev')); // Logging

// Rate limiting (max 100 requests per 15 minutes per IP)
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, 
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: 'Too many requests from this IP, please try again after 15 minutes',
  },
});

app.use('/api/', apiLimiter);

// Routes
app.use('/api', currencyRoutes);

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'API is running' });
});

// Global Error Handler
app.use(errorHandler);

module.exports = app;
