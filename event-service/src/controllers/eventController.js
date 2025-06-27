const Evento = require("../models/Event");

// Crear un nuevo evento
const crearEvento = async (req, res) => {
  try {
    const nuevoEvento = new Evento({
      ...req.body, // toma los campos del formulario
      creadoPor: req.user.id, // se agrega desde el JWT
    });

    await nuevoEvento.save();

    res.status(201).json(nuevoEvento);
  } catch (error) {
    res.status(500).json({
      mensaje: "Error al crear evento",
      error: error.message,
    });
  }
};

// Listar todos los eventos
const listarEventos = async (req, res) => {
  try {
    const eventos = await Evento.find();
    res.json(eventos);
  } catch (error) {
    res.status(500).json({
      mensaje: "Error al obtener eventos",
      error: error.message,
    });
  }
};

module.exports = { crearEvento, listarEventos };
