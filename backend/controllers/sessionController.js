const Session = require('../models/Session');
const csv = require('csvtojson');

exports.uploadSessionsCSV = async (req, res) => {
  try {
    const filePath = req.file.path;
    const sessionsArr = await csv().fromFile(filePath);
    const saved = await Session.insertMany(sessionsArr);
    res.json({ uploaded: saved.length });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
