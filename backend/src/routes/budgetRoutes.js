const express = require("express");
const router = express.Router();
const { createBudget, getBudgets } = require("../controllers/budgetController");

router.post("/budget", createBudget);
router.get("/budgets/:userId", getBudgets);

module.exports = router;
