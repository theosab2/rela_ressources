const mongoose = require('mongoose');

const commentSchema = mongoose.Schema({
  commentCreator: { type: String, required: true},
  commentIdentifiedUser_ids: 
  [
    {type:String,required:false}
  ],
  commentArticle: { type: String, required: true},
  commentContent: { type: String, required: true},
  _createdAt:{type:Date, required:true, default:Date.now()},
  _updatedAt:{type:Date, requried:true, default:Date.now()}
});

module.exports = mongoose.model('Comment', commentSchema);