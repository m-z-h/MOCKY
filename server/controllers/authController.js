const User = require('../models/User');
const jwt = require('jsonwebtoken');
const sendEmail = require('../utils/sendEmail');

// Generate JWT token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });
};

// Generate 6-digit OTP
const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

// @desc    Register a new user
// @route   POST /api/auth/register
// @access  Public
exports.register = async (req, res) => {
  try {
    const { name, email, password, category } = req.body;

    const userExists = await User.findOne({ email });
    if (userExists) {
      if (userExists.verified) {
        return res.status(400).json({ message: 'User already exists and is verified' });
      } else {
        // Resend OTP if user exists but unverified
        const otp = generateOTP();
        userExists.otp = otp;
        userExists.otpExpiry = Date.now() + 5 * 60 * 1000; // 5 mins
        userExists.name = name;
        userExists.password = password; // pre-save hook will hash it
        userExists.category = category;
        await userExists.save();

        await sendEmail({
          email: userExists.email,
          subject: 'Account Verification OTP - Mock Test Platform',
          message: `Your OTP for account verification is: ${otp}. It will expire in 5 minutes.`,
        });

        return res.status(200).json({ message: 'OTP resent to email. Please verify.' });
      }
    }

    const otp = generateOTP();
    const otpExpiry = Date.now() + 5 * 60 * 1000; // 5 mins

    const user = await User.create({
      name,
      email,
      password,
      category,
      otp,
      otpExpiry
    });

    try {
      await sendEmail({
        email: user.email,
        subject: 'Welcome! Account Verification OTP',
        message: `Your OTP for account verification is: ${otp}. It will fade in 5 minutes.`,
      });
    } catch (error) {
       console.error("Email could not be sent", error);
       // Still proceed but maybe log it
    }

    res.status(201).json({
      message: 'Registration successful. Please check your email for OTP.',
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Verify OTP
// @route   POST /api/auth/verify-otp
// @access  Public
exports.verifyOTP = async (req, res) => {
  try {
    const { email, otp } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }

    if (user.verified) {
      return res.status(400).json({ message: 'User is already verified' });
    }

    if (user.otp !== otp || user.otpExpiry < Date.now()) {
      return res.status(400).json({ message: 'Invalid or expired OTP' });
    }

    user.verified = true;
    user.otp = undefined;
    user.otpExpiry = undefined;
    await user.save();

    res.status(200).json({
      _id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      category: user.category,
      token: generateToken(user._id),
      message: 'Account verified successfully'
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Auth user & get token
// @route   POST /api/auth/login
// @access  Public
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
      if (!user.verified) {
        return res.status(401).json({ message: 'Account not verified. Please verify OTP first.' });
      }

      res.json({
        _id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        category: user.category,
        token: generateToken(user._id),
      });
    } else {
      res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get user profile
// @route   GET /api/auth/profile
// @access  Private
exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('-password');
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
