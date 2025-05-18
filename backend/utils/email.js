const nodemailer = require('nodemailer');

exports.sendEmail = async (to, subject, text, attachments = []) => {
  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });
  let info = await transporter.sendMail({
    from: `"EdTech Platform" <${process.env.EMAIL_USER}>`,
    to,
    subject,
    text,
    attachments,
  });
  return info;
};
