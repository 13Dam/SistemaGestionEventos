const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ['asistente', 'organizador', 'expositor'],
    default: 'asistente'
  },
  otpSecret: {
    type: String // base32 para compatibilidad con Google Authenticator
  },
  otpEnabled: {
    type: Boolean,
    default: false
  }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
