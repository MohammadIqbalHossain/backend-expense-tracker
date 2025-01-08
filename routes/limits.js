const express = require('express');
const router = express.Router();
const SpendingLimit = require('../models/SpendingLimit');


// Get spending limits
router.get('/', async (req, res) => {
  try {
    const limits = await SpendingLimit.findOne({ userId: 'default-user' });
    res.json(limits);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Set spending limits
router.post('/', async (req, res) => {
  try {

    if (!req.body || !req.body.monthlyTotal) {
      return res.status(400).json({ message: 'Invalid request body' });
    }

    const limits = await SpendingLimit.findOneAndUpdate(
      { userId: req.body.userId || 'default-user ID' },
      { 
        ...req.body,
        userId: req.body.userId || 'default-user ID',
        lastUpdated: new Date()
      },
      { new: true, upsert: true }
    );

    res.json(limits);
  } catch (error) {
    console.error('Server error:', error);
    res.status(500).json({ 
      message: error.message,
      details: error.stack
    });
  }
});

module.exports = router;