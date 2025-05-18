const mongoose = require('mongoose');
const ReceiptSchema = new mongoose.Schema({
  payout: { type: mongoose.Schema.Types.ObjectId, ref: 'Payout' },
  mentor: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  fileUrl: String, // where the PDF is stored if generated
  createdAt: { type: Date, default: Date.now }
});
module.exports = mongoose.model('Receipt', ReceiptSchema);
