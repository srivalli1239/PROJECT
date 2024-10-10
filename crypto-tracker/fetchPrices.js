const axios = require('axios');  // To make HTTP requests
const Crypto = require('./models/crypto');  // Import the Crypto model
const mongoose = require('mongoose');  // To connect to MongoDB
const { MONGO_URI } = require('./config');  // Import MongoDB connection URI from config.js

// Connect to MongoDB
mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch((error) => console.log('MongoDB connection error:', error));

// Define the CoinGecko API URL
const COINGECKO_API_URL = 'https://api.coingecko.com/api/v3/simple/price';

// List of coin IDs to track
const coins = ['bitcoin', 'matic-network', 'ethereum'];

// Function to fetch and save cryptocurrency data
async function fetchCryptoPrices() {
  try {
    // Fetch data from CoinGecko API
    const response = await axios.get(COINGECKO_API_URL, {
      params: {
        ids: coins.join(','),  // Convert array to comma-separated string
        vs_currencies: 'usd',
        include_market_cap: true,
        include_24hr_change: true
      }
    });

    // Get the response data (prices, market cap, 24h change)
    const cryptoData = response.data;

    // Loop through each cryptocurrency and save it to MongoDB
    for (const coin of coins) {
      const coinData = {
        coinId: coin,  // e.g., 'bitcoin'
        price: cryptoData[coin].usd,  // Current price in USD
        marketCap: cryptoData[coin].usd_market_cap,  // Market cap in USD
        change24h: cryptoData[coin].usd_24h_change  // 24-hour price change percentage
      };

      // Create a new document based on the Crypto model
      const newEntry = new Crypto(coinData);

      // Save the new entry to the MongoDB database
      await newEntry.save();  // Asynchronous saving

      console.log(`Saved data for ${coin} successfully.`);
    }
  } catch (error) {
    // Log any errors that occur during the fetch or save process
    console.error('Error fetching or saving crypto data:', error.message);
  }
}

// Export the function so it can be used elsewhere
module.exports = fetchCryptoPrices;
