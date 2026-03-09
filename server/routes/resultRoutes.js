const express = require('express');
const {
  submitTest,
  getMyResults,
  getResultById,
  getTestResults
} = require('../controllers/resultController');
const { protect, authorize } = require('../middleware/authMiddleware');

const router = express.Router();

router.route('/')
  .post(protect, authorize('STUDENT'), submitTest)
  .get(protect, authorize('STUDENT'), getMyResults);

router.route('/:id')
  .get(protect, getResultById);

router.route('/test/:testId')
  .get(protect, authorize('ADMIN', 'PAPER_SETTER'), getTestResults);

module.exports = router;
