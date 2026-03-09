const Question = require('../models/Question');

// @desc    Create a new question
// @route   POST /api/questions
// @access  Private (Paper Setter, Admin)
exports.createQuestion = async (req, res) => {
  try {
    const { subject, chapter, difficulty, question_text, options, correct_answer, explanation, question_type, marks_correct, marks_wrong } = req.body;

    const question = await Question.create({
      subject,
      chapter,
      difficulty,
      question_text,
      options,
      correct_answer,
      explanation,
      question_type,
      marks_correct,
      marks_wrong,
      creator: req.user._id
    });

    res.status(201).json(question);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get all questions (with filters)
// @route   GET /api/questions
// @access  Private (Paper Setter, Admin)
exports.getQuestions = async (req, res) => {
  try {
    const { subject, chapter, difficulty, type } = req.query;
    let query = {};

    if (subject) query.subject = subject;
    if (chapter) query.chapter = chapter;
    if (difficulty) query.difficulty = difficulty;
    if (type) query.question_type = type;

    const questions = await Question.find(query).populate('creator', 'name email');
    res.json(questions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get a single question
// @route   GET /api/questions/:id
// @access  Private
exports.getQuestionById = async (req, res) => {
  try {
    const question = await Question.findById(req.params.id);
    if (question) {
      res.json(question);
    } else {
      res.status(404).json({ message: 'Question not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update a question
// @route   PUT /api/questions/:id
// @access  Private (Paper Setter, Admin)
exports.updateQuestion = async (req, res) => {
  try {
    const question = await Question.findById(req.params.id);

    if (question) {
      // Check if user is the creator or an admin
      if (question.creator.toString() !== req.user._id.toString() && req.user.role !== 'ADMIN') {
        return res.status(403).json({ message: 'Not authorized to update this question' });
      }

      const updatedQuestion = await Question.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
      });

      res.json(updatedQuestion);
    } else {
      res.status(404).json({ message: 'Question not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete a question
// @route   DELETE /api/questions/:id
// @access  Private (Paper Setter, Admin)
exports.deleteQuestion = async (req, res) => {
  try {
    const question = await Question.findById(req.params.id);

    if (question) {
      if (question.creator.toString() !== req.user._id.toString() && req.user.role !== 'ADMIN') {
        return res.status(403).json({ message: 'Not authorized to delete this question' });
      }

      await question.deleteOne();
      res.json({ message: 'Question removed' });
    } else {
      res.status(404).json({ message: 'Question not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
