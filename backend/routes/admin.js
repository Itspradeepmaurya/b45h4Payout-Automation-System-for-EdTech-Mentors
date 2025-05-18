const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const auth = require('../middleware/auth');

// Admin adds a mentor
router.post('/mentors', auth, adminController.createMentor);
router.get('/mentors', auth, adminController.getAllMentors);

module.exports = router;
