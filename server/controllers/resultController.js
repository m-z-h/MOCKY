const Result = require('../models/Result');
const Test = require('../models/Test');
const Question = require('../models/Question');

// @desc    Submit a test and calculate result
// @route   POST /api/results
// @access  Private (Student)
exports.submitTest = async (req, res) => {
  try {
    const { testId, answers } = req.body;

    const test = await Test.findById(testId).populate('questions');
    if (!test) {
      return res.status(404).json({ message: 'Test not found' });
    }

    let total_score = 0;
    let correct_answers = 0;
    let wrong_answers = 0;
    let unattempted = 0;
    let negative_marks = 0;
    
    // Map to keep track of subject-wise stats
    const subjectStats = new Map();

    const resultAnswers = [];

    // Initialize stats for each subject present in the test
    test.questions.forEach(q => {
      if (!subjectStats.has(q.subject)) {
        subjectStats.set(q.subject, { score: 0, correct: 0, wrong: 0, unattempted: 0 });
      }
    });

    // Process each question
    test.questions.forEach(q => {
      // Find the student's answer for this question
      const studentAnswerObj = answers.find(a => a.questionId.toString() === q._id.toString());
      const selected_answer = studentAnswerObj ? studentAnswerObj.selected_answer : null;
      
      const subjectStat = subjectStats.get(q.subject);

      let status = 'UNATTEMPTED';

      if (!selected_answer) {
        unattempted += 1;
        subjectStat.unattempted += 1;
      } else if (selected_answer === q.correct_answer) {
        status = 'CORRECT';
        correct_answers += 1;
        total_score += q.marks_correct;
        
        subjectStat.correct += 1;
        subjectStat.score += q.marks_correct;
      } else {
        status = 'WRONG';
        wrong_answers += 1;
        total_score += q.marks_wrong; // marks_wrong is negative
        negative_marks += Math.abs(q.marks_wrong);
        
        subjectStat.wrong += 1;
        subjectStat.score += q.marks_wrong;
      }

      resultAnswers.push({
        question: q._id,
        selected_answer,
        status
      });
    });

    // Create Result
    const result = await Result.create({
      student: req.user._id,
      test: testId,
      total_score,
      correct_answers,
      wrong_answers,
      unattempted,
      negative_marks,
      subject_wise_score: subjectStats,
      answers: resultAnswers
    });

    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get user's results
// @route   GET /api/results
// @access  Private (Student)
exports.getMyResults = async (req, res) => {
  try {
    const results = await Result.find({ student: req.user._id })
      .populate('test', 'title category type')
      .sort('-createdAt');
    res.json(results);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get specific result by ID
// @route   GET /api/results/:id
// @access  Private
exports.getResultById = async (req, res) => {
  try {
    const result = await Result.findById(req.params.id)
      .populate('test', 'title category')
      .populate('answers.question', 'question_text options correct_answer explanation subject chapter');

    if (result) {
      // Check if authorized
      if (result.student.toString() !== req.user._id.toString() && req.user.role !== 'ADMIN') {
        return res.status(403).json({ message: 'Not authorized to view this result' });
      }
      res.json(result);
    } else {
      res.status(404).json({ message: 'Result not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get leaderboard/all results for a test
// @route   GET /api/results/test/:testId
// @access  Private (Admin, Paper Setter)
exports.getTestResults = async (req, res) => {
  try {
    const results = await Result.find({ test: req.params.testId })
      .populate('student', 'name email')
      .sort('-total_score');
    res.json(results);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
