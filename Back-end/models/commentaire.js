const mongoose = require('mongoose');

const commentaireSchema = mongoose.Schema({
  commentaireArticle: { type: String, required: true, unique: true },
  commentaireContent: { type: String, required: true},
  commentaireUser: { type: String, required: true},
});

module.exports = mongoose.model('Commentaire', commentaireSchema);