const mongoose = require('mongoose');  // Import Mongoose

module.exports = {
  MONGO_URI: 'mongodb+srv://Vallisree_123:<Vallisree_123>@cluster0.dacra.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'
};

// mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
//   .then(() => console.log('Connected to MongoDB'))
//   .catch((error) => console.error('MongoDB connection error:', error));
