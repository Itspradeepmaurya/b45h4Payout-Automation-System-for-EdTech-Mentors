const Receipt = require('../models/Receipt');
const Payout = require('../models/Payout');

exports.generateReceipt = async (req, res) => {
  try {
    // This is a placeholder—hook in your PDF logic here!
    const { payoutId } = req.body;
    const payout = await Payout.findById(payoutId).populate('mentor');
    const fileUrl = `/receipts/${payoutId}.pdf`; // Save after generating
    const receipt = new Receipt({ payout: payoutId, mentor: payout.mentor, fileUrl });
    await receipt.save();
    res.json(receipt);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
