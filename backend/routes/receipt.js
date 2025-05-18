const express = require('express');
const router = express.Router();
const receiptController = require('../controllers/receiptController');
const auth = require('../middleware/auth');

// Admin generates receipt for a payout
router.post('/generate', auth, receiptController.generateReceipt);

module.exports = router;
