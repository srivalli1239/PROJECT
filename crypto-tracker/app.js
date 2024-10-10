const cron = require('node-cron');
const fetchCryptoPrices = require('./fetchPrices');
const express = require('express');
const mongoose = require('mongoose');
const { MONGO_URI } = require('./config');
const cryptoRoutes = require('./routes/cryptoRoutes');

const app = express();
app.use(express.json());

// MongoDB connection
mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

// Background job to fetch prices every 2 hours
cron.schedule('0 */2 * * *', () => {
  console.log('Fetching crypto prices...');
  fetchCryptoPrices();
});

// API routes
app.use('/api', cryptoRoutes);

// Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
