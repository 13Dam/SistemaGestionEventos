const express = require('express');
const router = express.Router();
const { sendNotification } = require('../controllers/notificationController');
const authMiddleware = require('../middlewares/authMiddleware');

router.post('/send', authMiddleware, sendNotification);

module.exports = router;
