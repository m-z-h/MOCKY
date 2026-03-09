const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({
  title: { type: String, required: true },
  subject: { type: String, required: true },
  chapter: { type: String, required: true },
  category: { type: String, enum: ['NEET', 'JEE'], required: true },
  content: { type: String, required: true }, // PDF URL or rich text
  uploader: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
}, {
  timestamps: true
});

module.exports = mongoose.model('Note', noteSchema);
