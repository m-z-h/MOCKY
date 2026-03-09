const express = require('express');
const {
  createNote,
  getNotes,
  deleteNote
} = require('../controllers/noteController');
const { protect, authorize } = require('../middleware/authMiddleware');

const router = express.Router();

router.route('/')
  .post(protect, authorize('ADMIN', 'PAPER_SETTER'), createNote)
  .get(protect, getNotes);

router.route('/:id')
  .delete(protect, authorize('ADMIN', 'PAPER_SETTER'), deleteNote);

module.exports = router;
