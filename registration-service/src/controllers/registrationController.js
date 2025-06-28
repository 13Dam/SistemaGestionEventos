const { registerUserToEvent } = require("../services/registrationService");
const Registration = require("../models/registrationModel");

// Crear inscripción a un evento
const createRegistration = async (req, res, next) => {
  try {
    const { eventId, registrationType } = req.body;
    const userId = req.user.id;

    const newRegistration = await registerUserToEvent(
      userId,
      eventId,
      registrationType
    );

    res.status(201).json(newRegistration);
  } catch (error) {
    next(error);
  }
};

// Obtener inscripciones del usuario autenticado
const getUserRegistrations = async (req, res, next) => {
  try {
    const userId = req.user.id;

    const registrations = await Registration.find({ userId });
    res.json(registrations);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createRegistration,
  getUserRegistrations,
};
