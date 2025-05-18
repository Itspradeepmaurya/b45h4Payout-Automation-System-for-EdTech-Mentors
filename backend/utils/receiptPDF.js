const PDFDocument = require('pdfkit');
const fs = require('fs');

exports.generateReceiptPDF = (payout, filePath) => {
  const doc = new PDFDocument();
  doc.pipe(fs.createWriteStream(filePath));
  doc.fontSize(18).text('Payout Receipt', { align: 'center' });
  doc.text(`Mentor: ${payout.mentor.name}`);
  doc.text(`Total Amount: ₹${payout.totalAmount}`);
  doc.text(`Platform Fee: ₹${payout.platformFee}`);
  doc.text(`GST: ₹${payout.gst}`);
  doc.text(`Deductions: ₹${payout.deductions}`);
  doc.text(`Final Amount: ₹${payout.finalAmount}`);
  doc.end();
};
