const express = require('express');
const router = express.Router();

const {
  register,
  login,
  verifyOtp,
  refresh
} = require('../controllers/authController');

router.post('/register', register);

router.post('/login', login);

router.post('/verify-otp', verifyOtp);

router.post('/refresh', refresh);

module.exports = router;
