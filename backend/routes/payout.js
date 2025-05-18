const express = require('express');
const router = express.Router();
const payoutController = require('../controllers/payoutController');
const auth = require('../middleware/auth');

// Admin creates payout
router.post('/', auth, payoutController.createPayout);

// Mentor/admin view payouts
router.get('/:mentorId', auth, async (req, res) => {
  const { mentorId } = req.params;
  const payouts = await require('../models/Payout').find({ mentor: mentorId }).populate('sessions');
  res.json(payouts);
});

module.exports = router;
