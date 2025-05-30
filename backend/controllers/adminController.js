const Admin = require("../models/Admin");
const User = require("../models/User"); // Assuming you have a User model
const Examiner = require("../models/Examiner");
const Student = require("../models/User");

const jwt = require("jsonwebtoken");

// Generate JWT Token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "1h" });
};

// Register Admin
const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const userExists = await Admin.findOne({ email });
    if (userExists) return res.status(400).json({ message: "Admin already exists" });

    const admin = await Admin.create({ name, email, password });

    res.status(201).json({ message: "Admin registered successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Login Admin
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const admin = await Admin.findOne({ email });
    if (!admin || !(await admin.matchPassword(password))) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    res.json({
      token: generateToken(admin._id),
      admin: {
        id: admin._id,
        name: admin.name,
        email: admin.email,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get Admin Profile
const getProfile = async (req, res) => {
  try {
    const admin = await Admin.findById(req.user.id).select("-password");
    if (!admin) return res.status(404).json({ message: "Admin not found" });

    res.json(admin);
  } catch (error) {
    res.status(500).json({ message: "Error fetching profile" });
  }
};

// Update Admin Profile
const updateProfile = async (req, res) => {
  try {
    const { name, dob, phone, address, gender } = req.body;
    let admin = await Admin.findById(req.user.id);
    
    if (!admin) return res.status(404).json({ message: "Admin not found" });

    admin.name = name || admin.name;
    admin.dob = dob || admin.dob;
    admin.phone = phone || admin.phone;
    admin.address = address || admin.address;
    admin.gender = gender || admin.gender;

    await admin.save();
    res.json({ message: "Profile updated successfully", admin });
  } catch (error) {
    res.status(500).json({ message: "Error updating profile" });
  }
};

// **Get All Users (For Admin)**
// const getAllUsers = async (req, res) => {
//   try {
//     const users = await User.find().select("-password"); // Exclude passwords for security
//     res.json(users);
//   } catch (error) {
//     res.status(500).json({ message: "Error fetching users" });
//   }
// };

// Get All Users (Examiner + Student)
const getAllUsers = async (req, res) => {
  try {
    const examiners = await Examiner.find(); // Get all examiners
    const students = await Student.find();   // Get all students

    console.log("Examiners:", examiners);
    console.log("Students:", students);

    res.json({
      examiners,
      students,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching users" });
  }
};



module.exports = { registerUser, loginUser, getProfile, updateProfile, getAllUsers };
