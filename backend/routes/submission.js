const express = require('express');
const router = express.Router();
const Submission = require('../models/submission');
const Test = require('../models/Test');

// Save a test submission
router.post('/', async (req, res) => {
  const { testId, answers, score, total, studentId } = req.body;  // include studentId

  try {
    const submission = new Submission({ testId, answers, score, total, studentId }); // save it
    await submission.save();
    res.status(201).json({ message: 'Submission saved successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to save submission' });
  }
});

router.get('/', async (req, res) => {
  try {
    const submissions = await Submission.find();
    res.json(submissions);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch submissions' });
  }
});

router.get('/student/:studentId', async (req, res) => { console.log('GET /student/:studentId', req.params.studentId);
  try {
    const submissions = await Submission.find({ studentId: req.params.studentId }).lean();
    const testIds = submissions.map(s => s.testId);
    const tests = await Test.find({ _id: { $in: testIds } }).lean();

    const enrichedSubmissions = submissions.map(sub => {
      const test = tests.find(t => t._id.toString() === sub.testId.toString());
      return {
        ...sub,
        testTitle: test?.title || 'Test',
        questions: test?.sections.flatMap(section => section.questions) || [],
      };
    });

    res.json(enrichedSubmissions);
  } catch (err) {
    res.status(500).json({ message: 'Server error fetching submissions' });
  }
});

module.exports = router;
