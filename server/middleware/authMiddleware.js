const jwt = require('jsonwebtoken');
const User = require('../models/User');

const JWT_SECRET_KEY = process.env.JWT_SECRET; // Replace with your actual JWT secret key

const authMiddleware = async (req, res, next) => {
  const token = req.header('Authorization');

  if (!token) {
    return res.status(401).json({ error: 'No token found, authorization denied' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET_KEY);

    // Check if the user exists in the database
    const user = await User.findById(decoded.userId);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Attach the user object to the request for use in the controllers
    req.user = user;
    next();
  } catch (error) {
    console.error('Authentication error:', error.message);
    res.status(401).json({ error: 'Invalid token, authorization denied' });
  }
};

module.exports = authMiddleware;
