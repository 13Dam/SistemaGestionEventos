const mongoose = require("mongoose");

const roomSchema = new mongoose.Schema(
  {
    nombre: {
      type: String,
      required: true,
    },
    ubicacion: {
      type: String,
    },
    capacidad: {
      type: Number,
      default: 0,
    },
    eventoId: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Room", roomSchema);
