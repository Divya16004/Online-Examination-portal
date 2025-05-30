const Test = require("./models/Test");

// Create a new test
exports.createTest = async (req, res) => {
  try {
    const { title, totalMarks, sections } = req.body;

    const newTest = new Test({ title, totalMarks, sections });
    await newTest.save();

    res.status(201).json({ message: "Test created successfully", test: newTest });
  } catch (error) {
    res.status(500).json({ message: "Error creating test", error });
  }
};

// Get all tests
exports.getAllTests = async (req, res) => {
  try {
    const tests = await Test.find();
    res.status(200).json(tests);
  } catch (error) {
    res.status(500).json({ message: "Error fetching tests", error });
  }
};
