const mongoose = require('mongoose');

// Category Schema
const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
});

const Category = mongoose.model('Category', categorySchema);

module.exports = Category;
