// routes/reportRoutes.js
const express = require("express");
const { generateReport } = require("../controllers/reportController"); // Import controller
const { protect } = require("../middleware/authMiddleware"); // Assume you have authentication middleware

const router = express.Router();

// Define route for generating report
router.get("/generate", protect, generateReport); // Protect route with authentication

module.exports = router;
