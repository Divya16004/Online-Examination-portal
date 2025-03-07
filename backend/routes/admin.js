const express = require("express");
const { registerUser, loginUser, getProfile, updateProfile, getAllUsers } = require("../controllers/adminController");
const { protect, admin } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/profile", protect, admin, getProfile);
router.put("/profile", protect, admin, updateProfile);
router.get("/users", protect, admin, getAllUsers); // New Route to Fetch All Users

module.exports = router;
