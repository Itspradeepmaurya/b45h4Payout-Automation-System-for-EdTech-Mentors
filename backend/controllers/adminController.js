const User = require('../models/User');

// Admin: Create mentor user
exports.createMentor = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ msg: 'Email already exists' });
    const hashed = await require('bcryptjs').hash(password, 10);
    const mentor = new User({ name, email, password: hashed, role: 'mentor' });
    await mentor.save();
    res.json(mentor);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Admin: Get all mentors
exports.getAllMentors = async (req, res) => {
  const mentors = await User.find({ role: 'mentor' }, 'name email');
  res.json(mentors);
};
