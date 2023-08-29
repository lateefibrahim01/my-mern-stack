const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const taskRoutes = require('./routes/taskRoutes');

const app = express();
const PORT = process.env.PORT; // Replace with your desired port number
const MONGODB_URI = process.env.MONGODB_URI; // Replace with your MongoDB connection string
const JWT_SECRET_KEY = process.env.JWT_SECRET; // Replace with your JWT secret key

// Connect to the MongoDB database
mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch((error) => console.error('MongoDB connection error:', error.message));

// Middleware to parse incoming JSON data
app.use(express.json());

// Routes
app.use('/auth', authRoutes);
app.use('/tasks', taskRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err.message);
  res.status(500).json({ error: 'Something went wrong' });
});

// Start the server
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
