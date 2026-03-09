const Note = require('../models/Note');

// @desc    Create a new note
// @route   POST /api/notes
// @access  Private (Paper Setter, Admin)
exports.createNote = async (req, res) => {
  try {
    const { title, subject, chapter, category, content } = req.body;

    const note = await Note.create({
      title,
      subject,
      chapter,
      category,
      content,
      uploader: req.user._id
    });

    res.status(201).json(note);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get all notes
// @route   GET /api/notes
// @access  Private
exports.getNotes = async (req, res) => {
  try {
    const { subject, chapter, category } = req.query;
    let query = {};

    if (subject) query.subject = subject;
    if (chapter) query.chapter = chapter;

    if (req.user.role === 'STUDENT' && req.user.category) {
      query.category = req.user.category;
    } else if (category && req.user.role !== 'STUDENT') {
      query.category = category;
    }

    const notes = await Note.find(query).populate('uploader', 'name');
    res.json(notes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete note
// @route   DELETE /api/notes/:id
// @access  Private (Paper Setter, Admin)
exports.deleteNote = async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);

    if (note) {
      if (note.uploader.toString() !== req.user._id.toString() && req.user.role !== 'ADMIN') {
        return res.status(403).json({ message: 'Not authorized to delete this note' });
      }

      await note.deleteOne();
      res.json({ message: 'Note removed' });
    } else {
      res.status(404).json({ message: 'Note not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
