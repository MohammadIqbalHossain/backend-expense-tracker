// backend/models/Expense.js
const mongoose = require('mongoose');

const expenseSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: [true, "user ID is required"]
  },
  category: {
    type: String,
    required: true,
    enum: ['Groceries', 'Transportation', 'Healthcare', 'Utility', 'Charity', 'Miscellaneous']
  },
  amount: {
    type: Number,
    required: true
  },
  purpose: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  userId: {
    type: String,
    required: true
  }
}, 
  { timestamps: true }
);

const Expense = mongoose.model('Expense', expenseSchema);
module.exports = Expense;