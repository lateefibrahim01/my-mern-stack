const { OAuth2Client } = require('google-auth-library');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Replace these with your actual values from the Google API Console
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const JWT_SECRET_KEY = process.env.JWT_SECRET;

const client = new OAuth2Client(GOOGLE_CLIENT_ID);

// Function to generate a JWT token
const generateToken = (user) => {
  const token = jwt.sign({ userId: user._id }, JWT_SECRET_KEY, {
    expiresIn: '15d', // Token expiration set to 15 days
  });
  return token;
};

// Google OAuth2 authentication controller
const googleAuthController = async (req, res) => {
  const { idToken } = req.body;
  try {
    // Verify the Google ID token
    const ticket = await client.verifyIdToken({
      idToken,
      audience: GOOGLE_CLIENT_ID,
    });
    const payload = ticket.getPayload();
    const { sub, name, email } = payload;

    // Check if the user exists in the database
    let user = await User.findOne({ googleId: sub });

    // If the user doesn't exist, create a new user in the database
    if (!user) {
      user = await User.create({
        googleId: sub,
        displayName: name,
        email,
      });
    }

    // Generate a JWT token and send it in the response
    const token = generateToken(user);
    res.json({ token });
  } catch (error) {
    console.error('Google authentication error:', error.message);
    res.status(401).json({ error: 'Authentication failed' });
  }
};

module.exports = googleAuthController;
