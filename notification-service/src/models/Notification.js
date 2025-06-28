const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  userEmail: { type: String, required: true },
  eventId: { type: String }, // opcional
  title: { type: String, required: true },
  message: { type: String, required: true },
  type: {
    type: String,
    enum: ["email", "reminder", "update", "alert"],
    required: true,
  },
  sendAt: { type: Date },
  read: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
  deliveryMethod: {
    type: String,
    enum: ["email", "inApp"],
    default: "email",
  },
});

module.exports = mongoose.model("Notification", notificationSchema);
