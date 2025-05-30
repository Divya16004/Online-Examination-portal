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
  
  // startTime: { type: Date, required: true }, // Start time of the test
  // endTime: { type: Date, required: true },   // End time of the test
  timeLimit: { type: Number, required: true }, // Duration in minutes
  sections: { type: [sectionSchema], required: true },
  createdAt: { type: Date, default: Date.now },
  createdBy: { type: String, default: "admin" }

});   

module.exports = mongoose.models.Test || mongoose.model('Test', testSchema);

