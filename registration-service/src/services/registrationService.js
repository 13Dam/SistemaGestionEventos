const Registration = require("../models/registrationModel");
const generateQR = require("../utils/qrGenerator");

const registerUserToEvent = async (userId, eventId, registrationType) => {
  const qrData = { userId, eventId, registrationType };
  const qrCode = await generateQR(qrData);

  const registration = await Registration.create({
    userId,
    eventId,
    registrationType,
    qrCode,
  });

  return registration;
};

module.exports = {
  registerUserToEvent,
};
