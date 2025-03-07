const express = require('express');
const router = express.Router();
const transactionController = require('../controllers/transactionController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/', authMiddleware, transactionController.createTransaction); // Create transaction
router.get('/', authMiddleware, transactionController.getTransactions);   // Get transactions

module.exports = router;
