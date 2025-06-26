const nodemailer = require('nodemailer');

const sendEmail = async (to, subject, html) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER, // tu email
      pass: process.env.EMAIL_PASS  // tu contraseña o app password
    }
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to,
    subject,
    html
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Correo enviado:', info.response);
  } catch (err) {
    console.error('Error al enviar correo:', err);
  }
};

module.exports = { sendEmail };
