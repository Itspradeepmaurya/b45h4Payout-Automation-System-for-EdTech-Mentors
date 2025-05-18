const User = require('../models/User');

// Mentor: Get profile info
exports.getProfile = async (req, res) => {
  const user = await User.findById(req.user.id, '-password');
  res.json(user);
};
