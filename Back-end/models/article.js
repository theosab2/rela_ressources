const mongoose = require('mongoose');

const articleSchema = mongoose.Schema({
  articleTitle: { type: String, required: false, unique: true },
  articleDescription: { type: String, required: false},
  articleTag_TTids:
  [
    {type: String,required:false}
  ],

  articleCategory_TTids:
  [
    { type: String, required: false }
  ],

  articleContents:
  [
    {
      type_TTids:{type: String,required:false},
      body:{ type: String, required: false },
    }
  ],

  articleComment_ids:
  [
    { type: String, required: false }
  ],

  articleCreator:{type:String,required:false},
  articleNbLikes:{type:Number,required:true,default:0},
  articleNbDislikes:{type:Number,required:true,default:0},
  articleImage:{type:String,required:false},
  articleIsApproved:{type:Boolean,required:true,default:false}
});

module.exports = mongoose.model('Article', articleSchema);