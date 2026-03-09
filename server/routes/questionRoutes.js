const express = require('express');
const {
  createQuestion,
  getQuestions,
  getQuestionById,
  updateQuestion,
  deleteQuestion
} = require('../controllers/questionController');
const { protect, authorize } = require('../middleware/authMiddleware');

const router = express.Router();

router.route('/')
  .post(protect, authorize('ADMIN', 'PAPER_SETTER'), createQuestion)
  .get(protect, getQuestions); // Students can also GET if we provide filters (e.g. for practice config)

router.route('/:id')
  .get(protect, getQuestionById)
  .put(protect, authorize('ADMIN', 'PAPER_SETTER'), updateQuestion)
  .delete(protect, authorize('ADMIN', 'PAPER_SETTER'), deleteQuestion);

module.exports = router;
