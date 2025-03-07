const express = require("express");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const { body, validationResult } = require("express-validator");
const nodemailer = require("nodemailer");
const User = require("./models/User");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const SECRET_KEY = process.env.JWT_SECRET || "your_jwt_secret_key";

// Middleware
app.use(cors());
app.use(express.json());

// Setup Nodemailer for sending emails
const transporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: process.env.MAIL_PORT,
  secure: process.env.MAIL_PORT == 465,  // Use SSL for port 465
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});

// 📌 User Registration Route with Validation
app.post(
  "/api/register",
  [
    body("username").isLength({ min: 3 }).withMessage("Username must be at least 3 characters long"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters long")
      .matches(/[0-9]/)
      .withMessage("Password must contain at least one number")
      .matches(/[A-Z]/)
      .withMessage("Password must contain at least one uppercase letter"),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { username, password } = req.body;
    const userExists = await User.findOne({ where: { username } });
    if (userExists) {
      return res.status(400).json({ message: "Username is already taken" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({ username, password: hashedPassword });

    res.status(201).json({ message: "User registered successfully" });
  }
);

// 📌 User Login Route with Validation
app.post(
  "/api/login",
  [
    body("username").notEmpty().withMessage("Username is required"),
    body("password").notEmpty().withMessage("Password is required"),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { username, password } = req.body;
    const user = await User.findOne({ where: { username } });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ username: user.username }, SECRET_KEY, { expiresIn: "1h" });
    res.json({ message: "Login successful", token });
  }
);

// 📌 Password Reset Request Route
app.post("/api/password-reset-request", async (req, res) => {
  const { username } = req.body;

  // Check if the user exists
  const user = await User.findOne({ where: { username } });
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  // Generate a password reset token (valid for 1 hour)
  const resetToken = jwt.sign({ username: user.username }, SECRET_KEY, { expiresIn: "1h" });

  // Generate password reset URL (this would be clicked by the user)
  const resetLink = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;

  // Send the reset link via email
  const mailOptions = {
    from: process.env.MAIL_USER,
    to: user.email, // Assuming the user has an email field
    subject: "Password Reset Request",
    html: `<p>Click <a href="${resetLink}">here</a> to reset your password.</p>`,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: "Password reset link sent to your email." });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({ message: "Failed to send password reset email" });
  }
});

// 📌 Password Reset Route
app.post("/api/reset-password/:token", async (req, res) => {
  const { token } = req.params;
  const { newPassword } = req.body;

  try {
    // Verify the reset token
    const decoded = jwt.verify(token, SECRET_KEY);

    // Find the user by username
    const user = await User.findOne({ where: { username: decoded.username } });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Hash the new password and update it
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    await user.save();

    res.status(200).json({ message: "Password successfully reset" });
  } catch (error) {
    res.status(400).json({ message: "Invalid or expired reset token" });
  }
});

// Using Imported Routes for Additional Features
app.use("/api", budgetRoutes);
app.use("/api", recurringTransactionRoutes);
app.use("/api", categoryRoutes);
app.use("/api", reportRoutes);
app.use("/api", userProfileRoutes);
app.use("/api", transactionRoutes);

// Start Server
app.listen(PORT, "0.0.0.0", () => {
  console.log(`✅ Server running on port ${PORT}`);
}).on("error", (err) => {
  console.error("❌ Server failed to start:", err.message);
});







