const express = require("express");
const router = express.Router();
const Result = require("../models/Result");
const { protect } = require("../middleware/authMiddleware");

router.post("/", protect, async (req, res) => {
  const { testId, score } = req.body;
  try {
    const result = new Result({
      user: req.user._id,
      test: testId,
      score
    });
    await result.save();
    res.status(201).json({ message: "Result saved" });
  } catch (error) {
    res.status(500).json({ message: "Error saving result" });
  }
});

module.exports = router;
