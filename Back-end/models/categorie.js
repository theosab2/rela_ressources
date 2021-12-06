const mongoose = require('mongoose');

const categorieSchema = mongoose.Schema({
  categorieName: { type: String, required: true, unique: true },
  categorieIsActive: { type: String, required: true},
});

module.exports = mongoose.model('article', categorieSchema);