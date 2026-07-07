const express = require('express');
const jwt = require('jsonwebtoken');
const Story = require('../models/Story');
const { defaultContent } = require('../defaultContent');

const router = express.Router();

// Middleware: verify JWT for protected routes
function requireAuth(req, res, next) {
  const auth = req.headers.authorization;
  if (!auth || !auth.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Unauthorized — please log in' });
  }
  try {
    jwt.verify(auth.split(' ')[1], process.env.JWT_SECRET || 'fallback-secret');
    next();
  } catch {
    res.status(401).json({ error: 'Invalid or expired token' });
  }
}

// GET /api/story — public, returns full story content
router.get('/', async (req, res) => {
  try {
    let story = await Story.findOne().lean();
    if (!story) {
      // First run: seed defaults into MongoDB
      const newStory = new Story(defaultContent);
      await newStory.save();
      story = newStory.toObject();
    }
    res.json(story);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT /api/story — protected, saves/updates story
router.put('/', requireAuth, async (req, res) => {
  try {
    const body = req.body;
    let story = await Story.findOne();

    if (!story) {
      story = new Story(body);
      await story.save();
    } else {
      // Update all top-level fields
      const fields = [
        'couple', 'hero', 'theme', 'timeline', 'gallery', 'videos',
        'letters', 'quotes', 'playlist', 'futureDreams',
        'countdownDate', 'footerMessage', 'adminPassword',
      ];
      for (const field of fields) {
        if (body[field] !== undefined) {
          story[field] = body[field];
        }
      }
      story.markModified('couple');
      story.markModified('hero');
      story.markModified('timeline');
      story.markModified('gallery');
      story.markModified('videos');
      story.markModified('letters');
      story.markModified('quotes');
      story.markModified('playlist');
      story.markModified('futureDreams');
      await story.save();
    }

    res.json({ success: true, message: 'Story saved successfully', story: story.toObject() });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
