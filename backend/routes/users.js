const express = require("express");
const { registerUser, loginUser, getProfile, updateProfile, getAllUsers } = require("../controllers/adminController");
const { protect, admin } = require("../middleware/authMiddleware");

const router = express.Router();


router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/profile", protect, admin, getProfile);
router.put("/profile", protect, admin, updateProfile);
router.get("/users", protect, admin, getAllUsers); // New Route to Fetch All Users

const multer = require("multer");
const path = require("path");
const fs = require("fs");

// Create uploads folder if not exists
const uploadDir = path.join(__dirname, "..", "uploads");
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
}

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadDir);
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname)); // unique filename
    },
});
const upload = multer({ storage });

// Image upload route
router.post("/upload-profile-pic", protect, admin, upload.single("profilePic"), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ message: "No file uploaded" });
    }

    const imageUrl = `/uploads/${req.file.filename}`;
    res.status(200).json({ imageUrl });
});

router.get("/stats", protect, admin, async (req, res) => {
    const totalResults = await Result.countDocuments();
    const passCount = await Result.countDocuments({ score: { $gte: 40 } }); // assume 40% pass
    const failCount = totalResults - passCount;
  
    const results = await Result.find().populate("user", "name").sort({ score: -1 });
  
    res.json({
      total: totalResults,
      pass: passCount,
      fail: failCount,
      topStudents: results.slice(0, 5).map((r, i) => ({
        rank: i + 1,
        name: r.user.name,
        score: `${r.score}%`
      }))
    });
  });
  

module.exports = router;
