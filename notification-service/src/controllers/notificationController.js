const { addToQueue, processQueue } = require("../utils/queue");
const { sendEmail } = require("../services/emailService");

const sendNotification = (req, res) => {
  const { userId, type, title, message, sendAt, userEmail } = req.body;

  // Validación
  if (!userId || !userEmail || !title || !message || !type) {
    return res.status(400).json({ error: "Faltan campos obligatorios" });
  }

  const notification = { userId, userEmail, type, title, message, sendAt };

  addToQueue(notification);

  res.status(202).json({ message: "Notificación en cola para envío" });

  processQueue(async (notif) => {
    if (notif.type === "email") {
      await sendEmail(notif.userEmail, notif.title, notif.message);
      console.log(`Email enviado a ${notif.userEmail}`);
    } else {
      console.log(`Tipo de notificación ${notif.type} no soportado aún.`);
    }
  });
};

module.exports = { sendNotification };
