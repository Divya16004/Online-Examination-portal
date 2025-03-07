const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({
  questionText: { type: String, required: true },
  options: { type: [String], required: true },
  correctAnswer: { type: String, required: true },
  marks: { type: Number, required: true },
});

const sectionSchema = new mongoose.Schema({
  title: { type: String, required: true },
  totalMarks: { type: Number, required: true },
  questions: { type: [questionSchema], required: true },
});

const testSchema = new mongoose.Schema({
  title: { type: String, required: true },
  totalMarks: { type: Number, required: true },
  sections: { type: [sectionSchema], required: true },
  startTime: { type: Date, required: true }, // Start time of the test
  endTime: { type: Date, required: true },   // End time of the test
  duration: { type: Number, required: true }, // Duration in minutes
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Test", testSchema);
