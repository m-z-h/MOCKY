const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  subject: { type: String, required: true },
  chapter: { type: String, required: true },
  difficulty: { type: String, enum: ['EASY', 'MEDIUM', 'HARD'], default: 'MEDIUM' },
  question_text: { type: String, required: true },
  options: [{ type: String }], // Optional for numerical questions
  correct_answer: { type: String, required: true },
  explanation: { type: String },
  question_type: { type: String, enum: ['MCQ', 'NUMERICAL'], default: 'MCQ' },
  marks_correct: { type: Number, default: 4 },
  marks_wrong: { type: Number, default: -1 },
  creator: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
}, {
  timestamps: true
});

module.exports = mongoose.model('Question', questionSchema);
