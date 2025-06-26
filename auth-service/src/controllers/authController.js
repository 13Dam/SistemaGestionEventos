const User = require('../models/User');
const RefreshToken = require('../models/RefreshToken');
const {
  registerUser,
  validateLogin
} = require('../services/authService');

const {
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken
} = require('../services/jwtService');

const {
  generateOTPSecret,
  verifyTOTP
} = require('../services/otpService');

const bcrypt = require('bcrypt');

// POST /register
const register = async (req, res) => {
  try {
    const { email, password, role } = req.body;

    const user = await registerUser({ email, password, role });

    const otp = generateOTPSecret();
    user.otpSecret = otp.base32;
    user.otpEnabled = true;
    await user.save();

    res.status(201).json({
      message: 'Usuario registrado con éxito',
      otpSecret: otp.otpauth_url // Para escanear con Google Authenticator
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// POST /login
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await validateLogin(email, password);

    if (user.otpEnabled) {
      return res.status(200).json({
        message: 'OTP requerido',
        requiresOTP: true,
        userId: user._id
      });
    }

    // En caso que no tenga OTP activado
    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    await RefreshToken.create({
      userId: user._id,
      token: refreshToken,
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
    });

    res.status(200).json({ accessToken, refreshToken });
  } catch (err) {
    res.status(401).json({ error: err.message });
  }
};

// POST /verify-otp
const verifyOtp = async (req, res) => {
  try {
    const { userId, otp } = req.body;
    const user = await User.findById(userId);

    if (!user || !user.otpEnabled) {
      return res.status(400).json({ error: 'Usuario no válido para 2FA' });
    }

    const valid = verifyTOTP(otp, user.otpSecret);
    if (!valid) return res.status(401).json({ error: 'OTP inválido' });

    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    await RefreshToken.create({
      userId: user._id,
      token: refreshToken,
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
    });

    res.status(200).json({ accessToken, refreshToken });
  } catch (err) {
    res.status(500).json({ error: 'Error interno al verificar OTP' });
  }
};

// POST /refresh
const refresh = async (req, res) => {
  try {
    const { refreshToken } = req.body;
    if (!refreshToken) return res.status(400).json({ error: 'Token faltante' });

    const payload = verifyRefreshToken(refreshToken);

    const tokenInDb = await RefreshToken.findOne({
      userId: payload.id,
      token: refreshToken
    });

    if (!tokenInDb) return res.status(403).json({ error: 'Refresh token inválido' });

    const user = await User.findById(payload.id);
    const newAccessToken = generateAccessToken(user);

    res.status(200).json({ accessToken: newAccessToken });
  } catch (err) {
    res.status(401).json({ error: 'Refresh token inválido o expirado' });
  }
};

module.exports = {
  register,
  login,
  verifyOtp,
  refresh
};
