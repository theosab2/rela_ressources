const mongoose = require('mongoose');

const commentSchema = mongoose.Schema({
  commentArticle: { type: String, required: true, unique: true },
  commentContent: { type: String, required: true},
  commentUser: { type: String, required: true},
});

module.exports = mongoose.model('Comment', commentSchema);