const Examiner = require("../models/Examiner");
const jwt = require("jsonwebtoken");

// Generate JWT Token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "7d" });
};

// @desc Register Examiner
// @route POST /api/examiner/register
// @access Public
const registerExaminer = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if examiner already exists
    const examinerExists = await Examiner.findOne({ email });
    if (examinerExists) {
      return res.status(400).json({ message: "Examiner already exists" });
    }

    // Create new examiner
    const examiner = await Examiner.create({ name, email, password });

    if (examiner) {
      res.status(201).json({
        _id: examiner.id,
        name: examiner.name,
        email: examiner.email,
        token: generateToken(examiner.id),
      });
    } else {
      res.status(400).json({ message: "Invalid examiner data" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// @desc Login Examiner
// @route POST /api/examiner/login
// @access Public
const loginExaminer = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if examiner exists
    const examiner = await Examiner.findOne({ email });

    if (examiner && (await examiner.matchPassword(password))) {
      res.json({
        _id: examiner.id,
        name: examiner.name,
        email: examiner.email,
        token: generateToken(examiner.id),
      });
    } else {
      res.status(401).json({ message: "Invalid email or password" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { registerExaminer, loginExaminer };
