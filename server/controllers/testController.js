const Test = require('../models/Test');

// @desc    Create a new test
// @route   POST /api/tests
// @access  Private (Paper Setter, Admin)
exports.createTest = async (req, res) => {
  try {
    const { title, category, type, questions, duration, isPublished } = req.body;

    const test = await Test.create({
      title,
      category,
      type,
      questions,
      duration,
      isPublished,
      creator: req.user._id
    });

    res.status(201).json(test);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get all tests
// @route   GET /api/tests
// @access  Private
exports.getTests = async (req, res) => {
  try {
    const { category, type, isPublished } = req.query;
    let query = {};

    // Filter by query strings
    if (category) query.category = category;
    if (type) query.type = type;
    if (isPublished !== undefined) query.isPublished = isPublished;

    // If student, only see published tests of their category
    if (req.user.role === 'STUDENT') {
      query.isPublished = true;
      if (req.user.category) {
        query.category = req.user.category;
      }
    }

    const tests = await Test.find(query).populate('creator', 'name').select('-questions');
    res.json(tests);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get complete test by ID
// @route   GET /api/tests/:id
// @access  Private
exports.getTestById = async (req, res) => {
  try {
    const test = await Test.findById(req.params.id).populate('questions');
    
    if (test) {
      if (req.user.role === 'STUDENT' && (!test.isPublished || test.category !== req.user.category)) {
        return res.status(403).json({ message: 'Not authorized or test unavailable' });
      }
      res.json(test);
    } else {
      res.status(404).json({ message: 'Test not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update test
// @route   PUT /api/tests/:id
// @access  Private (Paper Setter, Admin)
exports.updateTest = async (req, res) => {
  try {
    const test = await Test.findById(req.params.id);

    if (test) {
      if (test.creator.toString() !== req.user._id.toString() && req.user.role !== 'ADMIN') {
        return res.status(403).json({ message: 'Not authorized to update this test' });
      }

      const updatedTest = await Test.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
      });

      res.json(updatedTest);
    } else {
      res.status(404).json({ message: 'Test not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete test
// @route   DELETE /api/tests/:id
// @access  Private (Paper Setter, Admin)
exports.deleteTest = async (req, res) => {
  try {
    const test = await Test.findById(req.params.id);

    if (test) {
      if (test.creator.toString() !== req.user._id.toString() && req.user.role !== 'ADMIN') {
        return res.status(403).json({ message: 'Not authorized to delete this test' });
      }

      await test.deleteOne();
      res.json({ message: 'Test removed' });
    } else {
      res.status(404).json({ message: 'Test not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
