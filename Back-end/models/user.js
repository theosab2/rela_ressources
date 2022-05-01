const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  username: { type: String, required: true, unique: true },
  firstname: { type: String, required: true},
  name: { type: String, required: true },
  password: { type: String, required: true},
  phone: { type: String, required: true,unique:true },
  email: { type: String, required: true,unique:true },
  isConnected: { type: Boolean, required: false },
  isApproved: { type: Boolean, required: true},
  relation_ids:[
    {type:String, required:false}
  ],
  avatarUrl : {type:Boolean, required: false, default:"AvatarDefaultUrl"},
  role: { type: String, required: true },
  favoris: [
    {type:String,required:false},
  ],
  location: { type: Object, required: false},
  _createdAt:{ type:Date, required: true, default: Date.now()},
  _updatedAt:{ type:Date, required: false, default: null}
});

module.exports = mongoose.model('User', userSchema);