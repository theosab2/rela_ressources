const mongoose = require('mongoose');

const articleSchema = mongoose.Schema({
  articleName: { type: String, required: true, unique: true },
  articleContent: { type: String, required: true},
  articleUser: { type: String, required: true },
  articleCategorie: { type: String, required: true },
  articleTag: { type: String, required: false },
  articleIsModerate: { type: Boolean, required: true },
  articleAttachement: { type: Boolean, required: true },
});

module.exports = mongoose.model('Article', articleSchema);