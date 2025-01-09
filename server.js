const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
require('dotenv').config();

const app = express();


app.use(express.json());

// app.use(cors());

app.use(cors({
  origin:  ['http://localhost:3000', 'https://expense-tracker-beta-kohl.vercel.app', 'localhost/:1'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS']
}));


// app.use(cors({
//   origin: function(origin, callback) {
//     // Allow requests with no origin (like mobile apps or curl requests)
//     if (!origin) return callback(null, true);
    
//     if (allowedOrigins.indexOf(origin) === -1) {
//       const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
//       return callback(new Error(msg), false);
//     }
//     return callback(null, true);
//   },
//   credentials: true,
//   methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS']
// }));



// const isDevelopment = process.env.NODE_ENV === 'development';
// console.log('Environment:', process.env.NODE_ENV);

// const allowedOrigins = [
//   'http://localhost:3000',
//   'https://expense-tracker-beta-kohl.vercel.app'
// ];

// app.use((req, res, next) => {
//   console.log('Incoming request from origin:', req.headers.origin);
//   next();
// });

// app.use(cors({
//   origin: function(origin, callback) {
//     console.log('Request origin:', origin);
    
//     // Allow requests with no origin (like Postman)
//     if (!origin) {
//       return callback(null, true);
//     }

//     if (allowedOrigins.includes(origin)) {
//       return callback(null, true);
//     }

//     console.log('Origin not allowed:', origin);
//     callback(new Error('Not allowed by CORS'));
//   },
//   credentials: true,
//   methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS']
// }));


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

app.use('/', (req, res) => {
  res.send(`Server running on the ${PORT}`)
})


const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});