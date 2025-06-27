const express = require("express");
const router = express.Router();
const {
  crearEvento,
  listarEventos,
} = require("../controllers/eventController");
const verifyToken = require("../middlewares/verifyToken");
const checkRole = require("../middlewares/checkRole");

//  middleware de autenticación
router.post("/", verifyToken, checkRole(["organizador", "admin"]), crearEvento); // POST /api/eventos
router.get("/", verifyToken, listarEventos); // GET /api/eventos

module.exports = router;
