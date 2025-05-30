// const express = require("express");
// const Test = require("../models/Test"); // Ensure this model exists
// const router = express.Router();

// router.post("/", async (req, res) => {
//   try {
//     const { title, totalMarks, sections, createdBy } = req.body;

//     if (!title || !totalMarks || !sections) {
//       return res.status(400).json({ message: "Missing required fields" });
//     }

//     const newTest = new Test({
//       title,
//       totalMarks,
//       sections,
//       createdBy: createdBy || "admin", // Default to admin if not provided
//     });

//     await newTest.save();
//     res.status(201).json(newTest);
//   } catch (error) {
//     console.error("Error creating test:", error);
//     res.status(500).json({ message: "Server error, failed to create test" });
//   }
// });

// // Get all tests created by an admin
// router.get("/", async (req, res) => {
//     try {
//       const tests = await Test.find({ createdBy: "admin" }); // Assuming `createdBy` field stores the role
//       res.json(tests);
//     } catch (error) {
//       res.status(500).json({ message: "Error fetching tests" });
//     }
//   });
  
// router.get("/:id", async (req, res) => {
//   try {
//     console.log("Fetching test with ID:", req.params.id); // Debugging
//     const test = await Test.findById(req.params.id);

//     if (!test) {
//       return res.status(404).json({ message: "Test not found" });
//     }
//     console.log("✅ Test found:", test); // Log found test details
//     res.json(test);
//   } catch (error) {
//     console.error("Error fetching test:", error);
//     res.status(500).json({ message: "Server error" });
//   }
// });

// module.exports = router;

const express = require("express");
const Test = require("../models/Test"); // Ensure this model exists
const router = express.Router();
const mongoose = require("mongoose");


// POST a new test
// ✅ KEEP this
router.post("/", async (req, res) => {
  try {
    const { title, totalMarks, timeLimit, sections } = req.body;

    if (!title || !totalMarks || !timeLimit || !sections) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const newTest = new Test({
      title,
      totalMarks,
      timeLimit,
      sections,
      createdBy: "admin",
    });

    await newTest.save();
    res.status(201).json(newTest);
  } catch (error) {
    console.error("Error creating test:", error);
    res.status(500).json({ message: "Server error, failed to create test" });
  }
});

// // Create a new test
// router.post("/api/tests", async (req, res) => {
//   try {
//     const { title, totalMarks, timeLimit, sections } = req.body;

//     // Validate required fields
//     if (!title || !totalMarks || !timeLimit || !sections) {
//       return res.status(400).json({ message: "Missing required fields" });
//     }

//     // Create a new test instance
//     const newTest = new Test({
//       title,
//       totalMarks,
//       timeLimit,
//       sections,
//       createdBy: "admin", // Default to admin
//     });

//     // Save the test to the da vmtabase
//     await newTest.save();

//     // Respond with the created test
//     res.status(201).json(newTest);
//   } catch (error) {
//     console.error("Error creating test:", error);
//     res.status(500).json({ message: "Server error, failed to create test" });
//   }
// });

// Get all tests
router.get("/", async (req, res) => {
  try {
    // Fetch all tests from the database
    const tests = await Test.find();
    res.json(tests);
  } catch (error) {
    console.error("Error fetching tests:", error);
    res.status(500).json({ message: "Error fetching tests" });
  }
});

// Get a single test by ID
router.get("/:id", async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid Test ID format" });
  }

  try {
    const test = await Test.findById(id);
    if (!test) {
      return res.status(404).json({ message: "Test not found" });
    }
    res.json(test);
  } catch (error) {
    console.error("Error fetching test:", error);
    res.status(500).json({ message: "Server error" });
  }
});


router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid Test ID format" });
  }

  try {
    await Test.findByIdAndDelete(id);
    res.json({ message: "Test deleted successfully" });
  } catch (error) {
    console.error("Error deleting test:", error);
    res.status(500).json({ message: "Server error, failed to delete test" });
  }
});


router.put("/:id", async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid Test ID format" });
  }

  try {
    const { title, totalMarks, timeLimit, sections } = req.body;

    const updatedTest = await Test.findByIdAndUpdate(
      id,
      { title, totalMarks, timeLimit, sections },
      { new: true }
    );

    if (!updatedTest) {
      return res.status(404).json({ message: "Test not found" });
    }

    res.json(updatedTest);
  } catch (error) {
    console.error("Error updating test:", error);
    res.status(500).json({ message: "Server error, failed to update test" });
  }
});

// Assuming you have a Test model with nested sections and questions
// router.post('/submit/:id', async (req, res) => {
//   try {
//     const testId = req.params.id;
//     const { answers } = req.body;

//     const test = await Test.findById(testId);
//     if (!test) {
//       return res.status(404).json({ message: "Test not found" });
//     }

//     let totalScore = 0;
//     let maxScore = 0;

//     // Loop through sections and questions
//     test.sections.forEach((section) => {
//       section.questions.forEach((question) => {
//         const questionId = question._id.toString();
//         const userAnswer = answers[questionId];

//         // Debug logs
//         console.log("✅ Question ID:", questionId);
//         console.log("📝 User Answer:", userAnswer);
//         console.log("🎯 Correct Answer:", question.correctAnswer);
//         console.log("🧮 Marks:", question.marks);

//         maxScore += question.marks;

//         if (userAnswer && userAnswer === question.correctAnswer) {
//           totalScore += question.marks;
//         }
//       });
//     });

//     res.json({
//       message: "Test submitted successfully",
//       totalScore,
//       maxScore
//     });
//   } catch (error) {
//     console.error("❌ Error submitting test:", error);
//     res.status(500).json({ message: "Server error while submitting test" });
//   }
// });

// router.post("/submit/:id", async (req, res) => {
//   try {
//     const { answers} = req.body;
//     const test = await Test.findById(req.params.id);

//     if (!test) {
//       return res.status(404).json({ message: "Test not found" });
//     }
   

//     let score = 0;
//     let totalMarks = 0;

//     // Loop through each section and question
//     test.sections.forEach((section) => {
//       section.questions.forEach((question) => {
//         const correct = question.correctAnswer;
//         const userAnswer = answers[question._id];

//         // Default mark to 1 if not present
//         const marks = question.marks || 1;
//         console.log(`Question ID: ${question._id}, Marks: ${marks}, User Answer: ${userAnswer}`);

//         // Add to totalMarks
//         totalMarks += marks;

//         // Check if user's answer is correct and add to score
//         if (userAnswer === correct) {
//           score += marks;
//         }
//       });
//     });

//     console.log(`Total Marks: ${totalMarks}, Score: ${score}`);

//     // Ensure that `totalMarks` is not undefined before sending the response
//     if (totalMarks === undefined) {
//       return res.status(500).json({ message: "Total marks calculation failed" });
//     }

//     // Send score and totalMarks in response
//     res.json({ score, totalMarks });

//   } catch (error) {
//     console.error("❌ Error submitting test:", error);
//     res.status(500).json({ message: "Server error" });
//   }
// });

router.post("/submit/:id", async (req, res) => {
  try {
    const { answers, timeTaken } = req.body;

    const test = await Test.findById(req.params.id);
    if (!test) {
      return res.status(404).json({ message: "Test not found" });
    }

    // ⏱️ Check if time taken exceeds test time limit
    if (timeTaken > test.timeLimit) {
      return res.status(400).json({ message: "Time limit exceeded" });
    }

    let totalScore = 0;
    let maxScore = 0;

    test.sections.forEach((section) => {
      section.questions.forEach((question) => {
        const questionId = question._id.toString();
        const userAnswer = answers[questionId];

        maxScore += question.marks;
        if (userAnswer && userAnswer === question.correctAnswer) {
          totalScore += question.marks;
        }
      });
    });

    res.json({
      message: "Test submitted successfully",
      totalScore,
      maxScore,
    });
  } catch (error) {
    console.error("❌ Error submitting test:", error);
    res.status(500).json({ message: "Server error while submitting test" });
  }
});


module.exports = router;
