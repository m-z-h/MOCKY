const mongoose = require('mongoose');

const resultSchema = new mongoose.Schema({
  student: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  test: { type: mongoose.Schema.Types.ObjectId, ref: 'Test', required: true },
  total_score: { type: Number, required: true, default: 0 },
  correct_answers: { type: Number, required: true, default: 0 },
  wrong_answers: { type: Number, required: true, default: 0 },
  unattempted: { type: Number, required: true, default: 0 },
  negative_marks: { type: Number, required: true, default: 0 },
  subject_wise_score: { 
    type: Map, 
    of: {
      score: Number,
      correct: Number,
      wrong: Number,
      unattempted: Number
    } 
  },
  answers: [{
    question: { type: mongoose.Schema.Types.ObjectId, ref: 'Question' },
    selected_answer: { type: String },
    status: { type: String, enum: ['CORRECT', 'WRONG', 'UNATTEMPTED'] }
  }]
}, {
  timestamps: true
});

module.exports = mongoose.model('Result', resultSchema);
