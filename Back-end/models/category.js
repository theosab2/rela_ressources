const mongoose = require('mongoose');

const categorySchema = mongoose.Schema({
  categoryName: { type: String, required: true, unique: true },
  categoryIsActive: { type: Boolean, required: true},
});

module.exports = mongoose.model('Category', categorySchema);