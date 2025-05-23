const mongoose = require('mongoose');
const AuditLogSchema = new mongoose.Schema({
  action: String,
  changedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  timestamp: { type: Date, default: Date.now },
  details: mongoose.Schema.Types.Mixed
});
module.exports = mongoose.model('AuditLog', AuditLogSchema);
