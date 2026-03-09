const express = require('express');
const {
  getUsers,
  createUser,
  deleteUser,
  getStats
} = require('../controllers/adminController');
const { protect, authorize } = require('../middleware/authMiddleware');

const router = express.Router();

// Apply middleware to all routes in this file
router.use(protect);
router.use(authorize('ADMIN'));

router.route('/users')
  .get(getUsers)
  .post(createUser);

router.route('/users/:id')
  .delete(deleteUser);

router.get('/stats', getStats);

module.exports = router;
