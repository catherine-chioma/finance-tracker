const express = require("express");
const router = express.Router();
const { createRecurringTransaction, getRecurringTransactions } = require("../controllers/recurringTransactionController");

router.post("/recurring", createRecurringTransaction);
router.get("/recurring/:userId", getRecurringTransactions);

module.exports = router;
