// Import required packages
const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config(); // Load environment variables from .env file
const cors = require('cors'); // For handling CORS with frontend

// Initialize Express app
const app = express();

// Middleware
app.use(express.json()); // Parse JSON request bodies
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173', // Allow requests from your frontend
}));

// Load environment variables
const mongoURI = process.env.MONGODB_URI;
const port = process.env.PORT || 5000;

// Debug: Log the MongoDB URI to ensure it's loaded correctly
console.log('Mongo URI:', mongoURI);

// Check if MongoDB URI is defined
if (!mongoURI) {
  console.error('Error: MONGODB_URI is undefined. Please check your .env file.');
  process.exit(1); // Exit the process if URI is not defined
}

// MongoDB connection (removed deprecated options)
mongoose.connect(mongoURI)
  .then(() => console.log('MongoDB connected successfully'))
  .catch((err) => {
    console.error('MongoDB connection error:', err.message);
    process.exit(1); // Exit on connection failure
  });

// Basic route for testing
app.get('/', (req, res) => {
  res.json({ message: 'Backend server is running!' });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});