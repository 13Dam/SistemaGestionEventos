const express = require("express");
const router = express.Router();
const {
  createRegistration,
  getUserRegistrations,
} = require("../controllers/registrationController");
const authenticate = require("../middlewares/authMiddleware");

// Ruta para registrar a un usuario en un evento
router.post("/", authenticate, createRegistration);

// Ruta para obtener todas las inscripciones del usuario autenticado
router.get("/mine", authenticate, getUserRegistrations);

module.exports = router;
