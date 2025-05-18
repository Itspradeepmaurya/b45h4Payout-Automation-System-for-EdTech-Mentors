const mongoose = require('mongoose');
const PayoutSchema = new mongoose.Schema({
  mentor: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  sessions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Session' }],
  totalAmount: Number,
  platformFee: Number,
  gst: Number,
  deductions: Number,
  finalAmount: Number,
  status: { type: String, enum: ['pending', 'paid', 'review'], default: 'pending' },
  createdAt: { type: Date, default: Date.now }
});
module.exports = mongoose.model('Payout', PayoutSchema);
    
