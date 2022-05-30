const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
  password: { type: String, required: true},
  username: { type: String, required: true, unique: true },
  firstname: { type: String, required: true},
  lastname: { type: String, required: true },
  phone: { type: String, required: false,unique:true },
  email: { type: String, required: false,unique:true },
  isConnected: { type: Boolean },
  isApproved: { type: Boolean, required: true, default:false},
  relation_ids:[
    {type:String}
  ],
  photoUrl : {type:String, default:"AvatarDefaultUrl"},
  role: { type: String, required: true, default:"user" },
  favorites: [
    {type:String},
  ],
  location: { 
    coutry:{type:String},
    city:{type:String},
    zipcode:{type:String},
    address:{type:String},
    region:{type:String},
    latitude:{type:Number},
    longitude:{type:Number},
  },
  settings:[
    {
      UT_id:{type:String, required:false}, //code : SETTING => (name, valueType, defaultValue)
      value:{type:String}
    }
  ],
  _createdAt:{ type:Date, required: true, default: Date.now()},
  _updatedAt:{ type:Date, required: false, default: Date.now()}
});

module.exports = mongoose.model('User', UserSchema);