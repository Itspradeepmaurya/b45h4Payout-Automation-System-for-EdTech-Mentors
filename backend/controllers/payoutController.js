const Payout = require('../models/Payout');
const Session = require('../models/Session');

// Calculate payout logic
exports.createPayout = async (req, res) => {
  try {
    const { mentor, sessionIds, platformFeePercent, gstPercent, deductions } = req.body;
    // Fetch all sessions for this payout
    const sessions = await Session.find({ _id: { $in: sessionIds } });
    let totalAmount = 0;
    sessions.forEach(session => {
      totalAmount += (session.duration / 60) * session.ratePerHour;
    });
    const platformFee = totalAmount * (platformFeePercent / 100);
    const gst = (totalAmount - platformFee) * (gstPercent / 100);
    const finalAmount = totalAmount - platformFee + gst - deductions;

    const payout = new Payout({
      mentor,
      sessions: sessionIds,
      totalAmount,
      platformFee,
      gst,
      deductions,
      finalAmount
    });
    await payout.save();

    // Update sessions as 'paid' or 'under review'
    await Session.updateMany({ _id: { $in: sessionIds } }, { status: 'paid' });

    res.json(payout);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
