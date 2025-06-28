const nodemailer = require('nodemailer');
const { EMAIL_USER, EMAIL_PASS, EMAIL_HOST } = require('../config');

const transporter = nodemailer.createTransport({
  service: EMAIL_HOST, 
  auth: {
    user: EMAIL_USER,
    pass: EMAIL_PASS
  }
});

const sendEmail = async (to, subject, text) => {
  const mailOptions = {
    from: EMAIL_USER,
    to,
    subject,
    text
  };

  return transporter.sendMail(mailOptions);
};

module.exports = { sendEmail };
