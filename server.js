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
  'https://expense-tracker-beta-kohl.vercel.app'
];


app.use(cors({
  origin: function(origin, callback) {
    console.log('Request origin:', origin);
    
    // Allow requests with no origin (like Postman)
    if (!origin) {
      return callback(null, true);
    }

    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    }

    console.log('Origin not allowed:', origin);
    callback(new Error('Not allowed by CORS'));
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS']
}));


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

app.use((req, res, next) => {
  console.log('Incoming request from origin:', req.headers.origin);
  next();
});


app.use('/', (req, res) => {
  res.send(`Server running on the ${PORT}`)
})


const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});


