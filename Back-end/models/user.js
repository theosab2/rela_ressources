//Devrait ce nommer message, pas eu le temps de le modifier
const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  username: { type: String, required: true, unique: true },
  firstname: { type: String, required: true},
  name: { type: String, required: true },
  password: { type: String, required: true},
  email: { type: String, required: true },
  isConnected: { type: Boolean, required: false },
  isActive: { type: Boolean, required: true},
  role: { type: String, required: true }
});

module.exports = mongoose.model('User', userSchema);