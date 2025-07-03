// ✅ UPDATED: routes/userRoutes.js
const express = require('express');
const router = express.Router();
const User = require('../models/User');

// GET: All users (for dropdowns, etc.)
router.get('/', async (req, res) => {
  try {
    const users = await User.find({}, 'username email');
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching users', error: err });
  }
});

module.exports = router;
