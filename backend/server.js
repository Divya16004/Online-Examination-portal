const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const adminRoutes = require("./routes/admin");
const examinerRoutes = require("./routes/examinerRoutes");
const authenticate = require("./middleware/authMiddleware");
const testRoutes = require("./routes/testRoutes")
dotenv.config();
connectDB();

const app = express();
app.use(express.json());
app.use(cors());

// Public routes
app.use("/api/auth", authRoutes);

// Protected routes
app.use("/api/admin", adminRoutes);
// app.use("/api/examiner", authenticate, examinerRoutes);

app.use("/api/tests", testRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
