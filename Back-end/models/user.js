const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
  password: { type: String, required: true},
  username: { type: String, required: true, unique: true },
  firstname: { type: String, required: true},
  lastname: { type: String, required: true },
  phone: { type: String, required: false }, //unique
  email: { type: String, required: false }, //unique
  isConnected: { type: Boolean },
  isApproved: { type: Boolean, required: true, default:true},
  relation_ids:[
    {type:String}
  ],
  photoUrl : {type:String, default:"AvatarDefaultUrl"},
  role: { type: String, required: true, default:"user" },
  favorites: [
    {type:String},
  ],
  notifications:[
    {
      _id:{type:String, required:true},
      title:{type:String, required:true},
      content:{type:String}
    }
  ],
  location: { 
    country:{type:String},
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

UserSchema.methods.setPassword = function(password) { 
     
  // Creating a unique salt for a particular user 
     this.salt = crypto.randomBytes(16).toString('hex'); 
   
     // Hashing user's salt and password with 1000 iterations, 
      
     this.hash = crypto.pbkdf2Sync(password, this.salt,  
     1000, 64, `sha512`).toString(`hex`); 
 }; 

module.exports = mongoose.model('User', UserSchema);