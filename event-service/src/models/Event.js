const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema(
  {
    titulo: { type: String, required: true },
    descripcion: String,
    fechaInicio: { type: Date, required: true },
    fechaFin: { type: Date, required: true },
    ubicacion: { type: String, required: true },
    capacidad: { type: Number, required: true },
    estado: {
      type: String,
      enum: ["planificación", "activo", "finalizado"],
      default: "planificación",
    },
    creadoPor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Usuario", // para saber quién lo creó, con un populate()
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Evento", eventSchema);
