const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
require('dotenv').config();

const app = express();

// app.use(cors());
app.use(express.json());

app.use(cors({
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS']
}));


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