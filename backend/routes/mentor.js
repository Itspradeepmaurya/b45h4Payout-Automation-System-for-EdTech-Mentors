const express = require('express');
const router = express.Router();
const mentorController = require('../controllers/mentorController');
const auth = require('../middleware/auth');

// Mentor views own profile
router.get('/me', auth, mentorController.getProfile);

module.exports = router;
