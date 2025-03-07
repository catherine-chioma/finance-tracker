// controllers/reportController.js
const { Op } = require("sequelize"); // Sequelize operators to handle date ranges
const Transaction = require("../models").Transaction; // Import Transaction model
const User = require("../models").User; // Import User model (if needed for user authentication)

// Generate financial report for the user based on startDate and endDate
const generateReport = async (req, res) => {
  const { startDate, endDate } = req.query;

  // Validate startDate and endDate
  if (!startDate || !endDate) {
    return res.status(400).json({ message: "Start date and end date are required" });
  }

  try {
    // Fetch transactions for the given user within the date range
    const userId = req.user.id; // Assuming you have user authentication middleware
    
    // Get income sum within the date range
    const income = await Transaction.sum('amount', {
      where: {
        userId: userId,
        type: 'income', // Assuming 'income' and 'expense' as transaction types
        date: {
          [Op.between]: [new Date(startDate), new Date(endDate)], // Filter by date range
        },
      },
    });

    // Get expenses sum within the date range
    const expenses = await Transaction.sum('amount', {
      where: {
        userId: userId,
        type: 'expense', // Filter for expense transactions
        date: {
          [Op.between]: [new Date(startDate), new Date(endDate)], // Filter by date range
        },
      },
    });

    // Calculate the balance (income - expenses)
    const balance = income - expenses;

    // Return the financial report
    res.json({
      income: income || 0,
      expenses: expenses || 0,
      balance: balance || 0,
      startDate,
      endDate,
    });
  } catch (error) {
    console.error("Error generating report:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

// Export the controller functions
module.exports = { generateReport };
