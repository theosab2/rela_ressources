const mongoose = require('mongoose');

const ArticleSchema = mongoose.Schema({
  title: { type: String, required: true, unique: true },
  description: { type: String},
  tag_UTids:
  [
    {type: String}
  ],
  category_UTid:{ type: String },
  contents:
  [
    {
      UT_id:{ type: String },
      body:{ type: String },
      positionX:{ type:Number },
      positionY:{ type:Number },
      textColor:{ type:String },
      additionnalCSS:{ type:String }
    }
  ],
  comment_ids:
  [
    { type: String }
  ],
  creator:{type:String,required:false},
  votes:[
    {
      UT_id:{type:String, required:true, default:"DefaultTypeTT_id"}, //code : VOTE => (type,way)
      number:{type:Number, required:true, default:0},
    }
  ],
  image:{type:String,required:false},
  isApproved:{type:Boolean,required:true,default:false},
  isActive:{type:Boolean,required:true,default:false},
  identifiedRelation_ids:
  [
    {type:String,required:false},
  ],
  privacyIsPublic:{type:Boolean, required:true, default: true},
  _createdAt:{type:Date, required:true, default:Date.now()},
  _updatedAt:{type:Date, requried:false, default:null}
});

module.exports = mongoose.model('Article', ArticleSchema);