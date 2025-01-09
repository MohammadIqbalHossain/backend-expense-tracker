const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
require('dotenv').config();

const app = express();
app.use(express.json());

const isDevelopment = process.env.NODE_ENV === 'development';
console.log('Environment:', process.env.NODE_ENV);

const allowedOrigins = [
  'http://localhost:3000',
  'https://expense-tracker-beta-kohl.vercel.app',
  'https://expense-tracker-beta-kohl.vercel.app/'
];

// Updating the cors confifgs to resolve cors error.
app.use(cors({
  origin: allowedOrigins,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  credentials: true,
  allowedHeaders: ['Content-Type', 'Authorization'],
  exposedHeaders: ['Content-Range', 'X-Content-Range'],
  maxAge: 86400 
}));

// This middleware removes unnecessery trailing slashces.
app.use((req, res, next) => {
  if (req.path.slice(-1) === '/' && req.path.length > 1) {
    const query = req.url.slice(req.path.length);
    const safePath = req.path.slice(0, -1).replace(/\/+/g, '/');
    res.redirect(301, safePath + query);
  } else {
    next();
  }
});

// Test route
app.get('/api/test-cors', (req, res) => {
  res.json({
    message: 'CORS is working',
    origin: req.headers.origin,
    env: process.env.NODE_ENV
  });
});

//Connection to MongoDB atlas.
connectDB();

// Routes
app.use('/api/expenses', require('./routes/expenses'));
app.use('/api/limits', require('./routes/limits'));

//Showing PORT connection message!
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});