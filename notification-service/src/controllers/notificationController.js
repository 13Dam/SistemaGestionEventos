const { addToQueue, processQueue } = require('../utils/queue');
const { sendEmail } = require('../services/emailService');

const sendNotification = (req, res) => {
  const { participantId, type, subject, message, sendAt } = req.body;

  const participantEmail = `${participantId || req.body.participantEmail}`;

  const notification = { participantId, type, subject, message, sendAt, participantEmail };

  addToQueue(notification);

  res.status(202).json({ message: 'Notificación en cola para envío' });

  // Procesamos la cola asíncronamente
  processQueue(async (notif) => {
    if (notif.type === 'email') {
      await sendEmail(notif.participantEmail, notif.subject, notif.message);
      console.log(`Email enviado a ${notif.participantEmail}`);
    } else {
      console.log(`Tipo de notificación ${notif.type} no soportado aún.`);
    }
  });
};

module.exports = { sendNotification };
