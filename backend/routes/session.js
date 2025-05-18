const express = require('express');
const router = express.Router();
const Session = require('../models/Session');

// Admin: Add session
router.post('/', async (req, res) => {
  try {
    const session = new Session(req.body);
    await session.save();
    res.status(201).json(session);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Mentor: View own sessions
router.get('/mentor/:mentorId', async (req, res) => {
  try {
    const sessions = await Session.find({ mentor: req.params.mentorId });
    res.json(sessions);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
