
const mongoose = require('mongoose');

const spendingLimitSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true
  },
  monthlyTotal: {
    type: Number,
    required: true
  },
  categories: {
    Groceries: { type: Number, default: 0 },
    Transportation: { type: Number, default: 0 },
    Healthcare: { type: Number, default: 0 },
    Utility: { type: Number, default: 0 },
    Charity: { type: Number, default: 0 },
    Miscellaneous: { type: Number, default: 0 }
  }
},  { timestamps: true });

module.exports = mongoose.model('SpendingLimit', mongoose.models.SpendingLimit || spendingLimitSchema);
