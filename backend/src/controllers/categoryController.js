const Category = require("../models/Category");

exports.createCategory = async (req, res) => {
  const { name, userId } = req.body;

  try {
    const newCategory = await Category.create({ name, userId });
    res.status(201).json(newCategory);
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};

exports.getCategories = async (req, res) => {
  const { userId } = req.params;

  try {
    const categories = await Category.findAll({ where: { userId } });
    res.status(200).json(categories);
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};
