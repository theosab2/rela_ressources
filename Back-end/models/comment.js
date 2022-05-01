const mongoose = require('mongoose');

const CommentSchema = mongoose.Schema({
  creator: { type: String, required: true},
  isReply:{ type: Boolean, required: true, default: false},
  replyTo:{ type: String},
  identifiedUser_ids: 
  [
    {type:String}
  ],
  article: { type: String, required: true},
  content: { type: String, required: true},
  votes: [
    {
      UT_id:{type:String, required:true},
      count:{type:Number, required:true, default: 0}
    }
  ],
  _createdAt:{type:Date, required:true, default:Date.now()},
  _updatedAt:{type:Date, requried:true, default:Date.now()}
});

module.exports = mongoose.model('Comment', CommentSchema);