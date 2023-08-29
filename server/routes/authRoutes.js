const express = require('express');
const router = express.Router();
const googleAuthController = require('../controllers/authController');

// Route for Google OAuth2 login
router.post('/login', googleAuthController);

module.exports = router;
