const User = require("../models/User");
const jwt = require("jsonwebtoken");

// Generate JWT Token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" });
};

// Register User
const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // Check if user already exists
    const userExists = await User.findOne({ where: { email } });
    if (userExists) return res.status(400).json({ message: "User already exists" });

    // Create new user (password will be hashed automatically via the model's beforeCreate hook)
    const user = await User.create({ name, email, password });

    res.status(201).json({ 
      _id: user.id, // Use 'id' instead of '_id' for Sequelize
      name: user.name,
      email: user.email,
      token: generateToken(user.id), // Use 'id' instead of '_id'
    });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

// Login User
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find user by email
    const user = await User.findOne({ where: { email } });
    if (user && (await user.matchPassword(password))) { // Compare passwords
      res.json({ 
        _id: user.id, // Use 'id' instead of '_id'
        name: user.name,
        email: user.email,
        token: generateToken(user.id), // Use 'id' instead of '_id'
      });
    } else {
      res.status(401).json({ message: "Invalid email or password" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

module.exports = { registerUser, loginUser };

