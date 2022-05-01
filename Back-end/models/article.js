const mongoose = require('mongoose');

const articleSchema = mongoose.Schema({
  articleTitle: { type: String, required: true, unique: true },
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
      positionX:{type:Number, required:false},
      positionY:{type:Number, required:false},
      textColor:{type:String, required:false},
      additionnalCSS:{type:String, required:false}
    }
  ],
  articleComment_ids:
  [
    { type: String, required: false }
  ],
  articleCreator:{type:String,required:false},
  articleNbLikes:{type:Number,required:true,default:0},
  articleNbDislikes:{type:Number,required:true,default:0},
  articleVotes:[
    {
      UT_id:{type:String,required:true, default:"DefaultTypeTT_id"},
      number:{type:Number,required:true,default:0},
    }
  ],
  articleImage:{type:String,required:false},
  articleIsApproved:{type:Boolean,required:true,default:false},
  articleIsActive:{type:Boolean,required:true,default:false},
  articleIdentifiedRelation_ids:
  [
    {type:String,required:false},
  ],
  articlePrivacyIsPublic:{type:Boolean, required:true, default: true},
  _createdAt:{type:Date, required:true, default:Date.now()},
  _updatedAt:{type:Date, requried:false, default:null}
});

module.exports = mongoose.model('Article', articleSchema);