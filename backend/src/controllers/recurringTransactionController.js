const RecurringTransaction = require("../models/RecurringTransaction");

exports.createRecurringTransaction = async (req, res) => {
  const { name, amount, frequency, userId } = req.body;

  try {
    const newRecurringTransaction = await RecurringTransaction.create({
      name,
      amount,
      frequency,
      userId,
    });
    res.status(201).json(newRecurringTransaction);
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};

exports.getRecurringTransactions = async (req, res) => {
  const { userId } = req.params;

  try {
    const transactions = await RecurringTransaction.findAll({ where: { userId } });
    res.status(200).json(transactions);
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};
