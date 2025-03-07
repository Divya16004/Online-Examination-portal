const express = require("express");
const { registerExaminer, loginExaminer } = require("../controllers/examinerController");

const router = express.Router();

router.post("/register", registerExaminer);
router.post("/login", loginExaminer);

module.exports = router;
