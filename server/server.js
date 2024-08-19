// Importing required modules
const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');

// parse env variables
require('dotenv').config();

// Configuring port
const port = process.env.PORT || 9000;

const mongoUri = process.env.MONGO_URI || 'mongodb://localhost:27017/express-mongo';

// Create an Express app
const app = express();

// Connect to MongoDB
mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Configure middlewares
app.use(cors());
app.use(express.json());

// Static folder
app.use(express.static(__dirname + '/views/'));

// Defining route middleware
app.use('/api', require('./routes/api'));

// Listening to port
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}/api`);
});

module.exports = app;
