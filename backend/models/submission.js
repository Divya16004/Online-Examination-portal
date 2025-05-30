const mongoose = require('mongoose');

const submissionSchema = new mongoose.Schema({
  testId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Test',
    required: true
  },
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student', // or 'User', depending on your schema
    required: true
  },
  answers: [
    {
      questionId: String,
      selectedOption: String
    }
  ],
  score: Number,
  total: Number
});

module.exports = mongoose.model('Submission', submissionSchema);
