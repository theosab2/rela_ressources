//Devrait ce nommer message, pas eu le temps de le modifier
const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  username: { type: String, required: true },
  message: { type: String, required: true},
  date: { type: Date, required: true},
});

module.exports = mongoose.model('User', userSchema);