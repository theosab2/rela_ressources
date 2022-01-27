const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  username: { type: String, required: true, unique: true },
  firstname: { type: String, required: true},
  name: { type: String, required: true },
  password: { type: String, required: true},
  phone: { type: String, required: true,unique:true },
  email: { type: String, required: true,unique:true },
  isConnected: { type: Boolean, required: false },
  isActive: { type: Boolean, required: true},
  role: { type: String, required: true },
  location: { type: Object, required: false}
});

module.exports = mongoose.model('User', userSchema);