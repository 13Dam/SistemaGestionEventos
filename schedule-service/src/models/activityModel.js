const mongoose = require("mongoose");

const activitySchema = new mongoose.Schema(
  {
    titulo: {
      type: String,
      required: true,
    },
    descripcion: {
      type: String,
    },
    eventoId: {
      type: String,
      required: true, //va a venir del Event Service
    },
    salaId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Room",
      required: true,
    },
    expositorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Expositor",
      required: true,
    },
    fechaInicio: {
      type: Date,
      required: true,
    },
    fechaFin: {
      type: Date,
      required: true,
    },
    estado: {
      type: String,
      enum: ["programada", "en curso", "finalizada", "cancelada"],
      default: "programada",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Activity", activitySchema);
