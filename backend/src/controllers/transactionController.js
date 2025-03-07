const Transaction = require('../models/Transaction');

// Create a new transaction
exports.createTransaction = async (req, res) => {
  try {
    const { userId, amount, type, category } = req.body;
    const transaction = new Transaction({ userId, amount, type, category });
    await transaction.save();
    res.status(201).json({ message: 'Transaction added successfully', transaction });
  } catch (err) {
    res.status(500).json({ message: 'Error adding transaction', error: err.message });
  }
};

// Get all transactions for a user
exports.getTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find({ userId: req.user._id });
    res.status(200).json(transactions);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching transactions', error: err.message });
  }
};
