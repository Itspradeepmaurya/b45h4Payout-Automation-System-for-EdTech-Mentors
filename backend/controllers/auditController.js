const AuditLog = require('../models/AuditLog');
exports.createLog = async (action, changedBy, details) => {
  await AuditLog.create({ action, changedBy, details });
};
exports.getLogs = async (req, res) => {
  const logs = await AuditLog.find().populate('changedBy', 'name');
  res.json(logs);
};
