const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');

// Protected route (only accessible with a valid token)
router.get('/profile', authMiddleware, (req, res) => {
  // Access the user data attached to the request object
  res.json({ message: 'Profile data', user: req.user });
});

module.exports = router;
