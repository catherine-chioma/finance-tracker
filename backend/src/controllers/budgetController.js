const Budget = require("../models/Budget");

exports.createBudget = async (req, res) => {
  const { name, amount, userId } = req.body;

  try {
    const newBudget = await Budget.create({ name, amount, userId });
    res.status(201).json(newBudget);
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};

exports.getBudgets = async (req, res) => {
  const { userId } = req.params;

  try {
    const budgets = await Budget.findAll({ where: { userId } });
    res.status(200).json(budgets);
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};
