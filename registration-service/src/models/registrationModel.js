const mongoose = require("mongoose");

const registrationSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  eventId: {
    type: String,
    required: true,
  },
  registrationType: {
    type: String,
    enum: ["standard", "vip", "early-bird"],
    default: "standard",
  },
  qrCode: {
    type: String, // Guarda imagen como base64 (DataURL) o una URL si se sube a un bucket
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Registration", registrationSchema);
