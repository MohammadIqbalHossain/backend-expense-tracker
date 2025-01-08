const express = require('express');
const router = express.Router();
const Expense = require('../models/Expense'); 

// Get all expenses
router.get('/', async (req, res) => {
  try {
    const {userId} = req.query;
    if(!userId){
      return res.status(400).json({message: "User ID is required!"})
    }
    const expenses = await Expense.find({userId}).sort({ date: -1 });
    res.json(expenses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Add new expense
router.post('/', async (req, res) => {
  const expense = new Expense({
    ...req.body,
    userId: req.body.userId 
  });

  try {
    const newExpense = await expense.save();
    res.status(201).json(newExpense);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

//Delete expense. 
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const expense = await Expense.findOne({_id: id});
    console.log(expense);

    if (!expense) {
      return res.status(404).json({ message: "Expense not found or unauthorized" });
    }

    await Expense.findByIdAndDelete(id);

    if (!expense) {
      return res.status(404).json({ message: "Expense not found" });
    }
    res.json({ message: "Expense deleted successfully!" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;