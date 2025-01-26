const bcrypt = require("bcrypt");
const User = require("../models/userModel.js");

// Create a new user
exports.createUser = async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ error: "All fields are required." });
  }

  try {
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = { username, email, password: hashedPassword };

    User.createUser(newUser, (err, results) => {
      if (err) {
        console.error("Error creating user:", err);
        return res
          .status(500)
          .json({ error: "Failed to create user. Please try again." });
      }

      res.status(201).json({
        message: "User created successfully!",
        userId: results.insertId,
      });
    });
  } catch (err) {
    console.error("Error hashing password:", err);
    res.status(500).json({ error: "An error occurred. Please try again." });
  }
};

// Get all users
exports.getAllUser = (req, res) => {
  User.getAllUsers((err, results) => {
    if (err) {
      console.error("Error fetching users:", err);
      return res
        .status(500)
        .json({ error: "Failed to fetch users. Please try again." });
    }

    res.status(200).json(results);
  });
};

// Get user by email
exports.getUserByEmail = async (req, res) => {
        const { email, password } = req.body;
      
        if (!email || !password) {
          return res.status(400).json({ error: "Email and password are required." });
        }
      
        User.getUserByEmail(email, async (err, user) => {
          if (err) {
            console.error("Error finding user:", err);
            return res.status(500).json({ error: "An error occurred. Please try again." });
          }
      
          if (!user) {
            return res.status(404).json({ error: "User not found." });
          }
      
          // Compare the password
          const isPasswordValid = await bcrypt.compare(password, user.password);
      
          if (!isPasswordValid) {
            return res.status(401).json({ error: "Invalid email or password." });
          }
      
          // Successfully authenticated
          res.status(201).json({
            message: "Login successful!",
            user: {
              id: user.id,
              username: user.username,
              email: user.email,
            },
          });
        });
};