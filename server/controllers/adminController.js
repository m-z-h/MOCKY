const User = require('../models/User');
const Test = require('../models/Test');
const Question = require('../models/Question');
const Result = require('../models/Result');

// @desc    Get all users (students, paper setters)
// @route   GET /api/admin/users
// @access  Private (Admin)
exports.getUsers = async (req, res) => {
  try {
    const users = await User.find({ role: { $ne: 'ADMIN' } }).select('-password');
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create a paper setter or new user
// @route   POST /api/admin/users
// @access  Private (Admin)
exports.createUser = async (req, res) => {
  try {
    const { name, email, password, role, category } = req.body;
    
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const user = await User.create({
      name,
      email,
      password,
      role,
      category,
      verified: true // Admin-created users are pre-verified
    });

    res.status(201).json({
      _id: user.id,
      name: user.name,
      email: user.email,
      role: user.role
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete user
// @route   DELETE /api/admin/users/:id
// @access  Private (Admin)
exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (user && user.role !== 'ADMIN') { // Don't allow deleting admins via this route
      await user.deleteOne();
      res.json({ message: 'User removed' });
    } else {
      res.status(404).json({ message: 'User not found or cannot be deleted' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get platform statistics
// @route   GET /api/admin/stats
// @access  Private (Admin)
exports.getStats = async (req, res) => {
  try {
    const totalStudents = await User.countDocuments({ role: 'STUDENT' });
    const totalSetters = await User.countDocuments({ role: 'PAPER_SETTER' });
    const totalTests = await Test.countDocuments();
    const totalQuestions = await Question.countDocuments();
    const totalSubmissions = await Result.countDocuments();

    res.json({
      totalStudents,
      totalSetters,
      totalTests,
      totalQuestions,
      totalSubmissions
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
