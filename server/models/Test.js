const mongoose = require('mongoose');

const testSchema = new mongoose.Schema({
  title: { type: String, required: true },
  category: { type: String, enum: ['NEET', 'JEE'], required: true },
  type: { type: String, enum: ['MOCK', 'PRACTICE', 'CHAPTER'], default: 'MOCK' },
  questions: [{ 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Question' 
  }],
  duration: { type: Number, required: true }, // duration in minutes
  creator: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  isPublished: { type: Boolean, default: false }
}, {
  timestamps: true
});

module.exports = mongoose.model('Test', testSchema);
