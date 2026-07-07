const express = require('express');
const jwt = require('jsonwebtoken');
const Story = require('../models/Story');

const router = express.Router();

// POST /api/auth/login
router.post('/login', async (req, res) => {
  const { password } = req.body;
  if (!password) return res.status(400).json({ error: 'Password is required' });

  try {
    // Get the current password from the DB (allows admin to change it)
    const story = await Story.findOne().lean();
    const correctPassword =
      story?.adminPassword || process.env.ADMIN_PASSWORD || 'ourlovestory';

    if (password !== correctPassword) {
      return res.status(401).json({ error: 'Incorrect password. Try again.' });
    }

    const token = jwt.sign(
      { admin: true },
      process.env.JWT_SECRET || 'fallback-secret',
      { expiresIn: '24h' }
    );

    res.json({ token, message: 'Login successful' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /api/auth/verify
router.post('/verify', (req, res) => {
  const auth = req.headers.authorization;
  if (!auth || !auth.startsWith('Bearer ')) {
    return res.status(401).json({ valid: false });
  }
  try {
    jwt.verify(auth.split(' ')[1], process.env.JWT_SECRET || 'fallback-secret');
    res.json({ valid: true });
  } catch {
    res.status(401).json({ valid: false });
  }
});

module.exports = router;
