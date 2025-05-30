// const jwt = require("jsonwebtoken");
// const User = require("../models/User");
// const Admin = require("../models/Admin");

// const protect = async (req, res, next) => {
//   let token = req.headers.authorization;
//   if (token && token.startsWith("Bearer")) {
//     try {
//       token = token.split(" ")[1];
//       const decoded = jwt.verify(token, process.env.JWT_SECRET);
//       req.user = await Admin.findById(decoded.id).select("-password"); // Only Admin can access

//       if (!req.user) {
//         return res.status(401).json({ message: "Not authorized" });
//       }

//       next();
//     } catch (error) {
//       res.status(401).json({ message: "Not authorized, token failed" });
//     }
//   } else {
//     res.status(401).json({ message: "Not authorized, no token" });
//   }
// };

// const admin = (req, res, next) => {
//   if (req.user) {
//     next();
//   } else {
//     res.status(403).json({ message: "Admin access only" });
//   }
// };

// module.exports = { protect, admin };
const jwt = require("jsonwebtoken");
const Admin = require("../models/Admin");

const protect = async (req, res, next) => {
  let token = req.headers.authorization;

  // Check if token is provided and starts with 'Bearer'
  if (token && token.startsWith("Bearer")) {
    try {
      // Extract the token from 'Bearer <token>'
      token = token.split(" ")[1];

      // Verify the token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Find the admin by ID from the decoded token
      req.user = await Admin.findById(decoded.id).select("-password");

      // If user not found or not an admin, return Unauthorized
      if (!req.user) {
        return res.status(401).json({ message: "Not authorized, admin not found" });
      }

      // Proceed to the next middleware
      next();
    } catch (error) {
      res.status(401).json({ message: "Not authorized, token failed" });
    }
  } else {
    res.status(401).json({ message: "Not authorized, no token" });
  }
};

const admin = (req, res, next) => {
  // Ensure the user is an admin
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(403).json({ message: "Admin access only" });
  }
};

module.exports = { protect, admin };

