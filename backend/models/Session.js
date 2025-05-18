const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const sessionController = require('../controllers/sessionController');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
const auth = require('../middleware/auth');

// Add single session (already in previous messages)
// Upload sessions in bulk from CSV
router.post('/upload-csv', auth, upload.single('file'), sessionController.uploadSessionsCSV);

module.exports = router;

const SessionSchema = new mongoose.Schema({
  mentor: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  sessionDate: Date,
  sessionType: String,
  duration: Number, // in minutes
  ratePerHour: Number,
  status: { type: String, enum: ['pending', 'approved', 'paid'], default: 'pending' },
});
module.exports = mongoose.model('Session', SessionSchema);
