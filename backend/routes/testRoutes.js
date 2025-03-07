const express = require("express");
const Test = require("../models/Test"); // Ensure this model exists
const router = express.Router();

// Get all tests created by an admin
router.get("/", async (req, res) => {
    try {
      const tests = await Test.find({ createdBy: "admin" }); // Assuming `createdBy` field stores the role
      res.json(tests);
    } catch (error) {
      res.status(500).json({ message: "Error fetching tests" });
    }
  });
  
router.get("/:id", async (req, res) => {
  try {
    console.log("Fetching test with ID:", req.params.id); // Debugging
    const test = await Test.findById(req.params.id);

    if (!test) {
      return res.status(404).json({ message: "Test not found" });
    }
    console.log("✅ Test found:", test); // Log found test details
    res.json(test);
  } catch (error) {
    console.error("Error fetching test:", error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
