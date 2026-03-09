const express = require('express');
const {
  createTest,
  getTests,
  getTestById,
  updateTest,
  deleteTest
} = require('../controllers/testController');
const { protect, authorize } = require('../middleware/authMiddleware');

const router = express.Router();

router.route('/')
  .post(protect, authorize('ADMIN', 'PAPER_SETTER'), createTest)
  .get(protect, getTests);

router.route('/:id')
  .get(protect, getTestById)
  .put(protect, authorize('ADMIN', 'PAPER_SETTER'), updateTest)
  .delete(protect, authorize('ADMIN', 'PAPER_SETTER'), deleteTest);

module.exports = router;
