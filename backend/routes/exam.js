const express = require("express");
const router = express.Router();
const Exam = require("../models/Exam");
const auth = require("../middleware/auth");

// Create Exam (Admin Only)
router.post("/", auth, async (req, res) => {
  if (req.user.role !== "admin") return res.status(403).json({ error: "Access denied" });

  const { title, description, questions, duration } = req.body;
  try {
    const exam = new Exam({ title, description, questions, duration, createdBy: req.user.id });
    await exam.save();
    res.status(201).json(exam);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get All Exams
router.get("/", auth, async (req, res) => {
  try {
    const exams = await Exam.find();
    res.json(exams);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;