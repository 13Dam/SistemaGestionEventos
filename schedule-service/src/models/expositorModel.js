const mongoose = require("mongoose");

const expositorSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true, //ID del usuario en Auth Service
    },
    nombre: {
      type: String,
      required: true,
    },
    perfil: {
      type: String, //bio, link externo, etc.
    },
    email: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Expositor", expositorSchema);
