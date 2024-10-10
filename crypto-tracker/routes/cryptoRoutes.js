const express = require('express');
const Crypto = require('../models/crypto');

const router = express.Router();

// Get latest crypto data
router.get('/stats', async (req, res) => {
  const { coin } = req.query;
  
  if (!coin) {
    return res.status(400).json({ error: 'Coin parameter is required' });
  }

  try {
    const latestData = await Crypto.findOne({ coinId: coin }).sort({ timestamp: -1 });
    
    if (!latestData) {
      return res.status(404).json({ error: 'No data found for this coin' });
    }

    res.json({
      price: latestData.price,
      marketCap: latestData.marketCap,
      '24hChange': latestData.change24h
    });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
