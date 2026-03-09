const express = require('express');
const { register, verifyOTP, login, getProfile } = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/register', register);
router.post('/verify-otp', verifyOTP);
router.post('/login', login);
router.get('/profile', protect, getProfile);

module.exports = router;
