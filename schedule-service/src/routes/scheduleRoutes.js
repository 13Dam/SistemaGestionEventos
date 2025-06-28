const express = require("express");
const router = express.Router();
const {
  getActivitiesByEvent,
  createActivity,
  getActivityById,
  updateActivity,
  deleteActivity,
} = require("../controllers/scheduleController");
const {
  verifyToken,
  authorizeRoles,
} = require("../middlewares/authMiddleware");

//Obtener todas las actividades de un evento (asistentes, organizadores, etc.)
router.get("/events/:eventId/activities", verifyToken, getActivitiesByEvent);

//Crear nueva actividad (solo organizadores o administradores)
router.post(
  "/events/:eventId/activities",
  verifyToken,
  authorizeRoles("organizador", "admin"),
  createActivity
);

//Obtener actividad por ID
router.get(
  "/events/:eventId/activities/:activityId",
  verifyToken,
  getActivityById
);

//Actualizar actividad (solo organizadores o admins)
router.put(
  "/events/:eventId/activities/:activityId",
  verifyToken,
  authorizeRoles("organizador", "admin"),
  updateActivity
);

//Eliminar actividad
router.delete(
  "/events/:eventId/activities/:activityId",
  verifyToken,
  authorizeRoles("organizador", "admin"),
  deleteActivity
);

module.exports = router;
