const mongoose = require('mongoose');

const accountSchema = mongoose.Schema({
  username: { type: String, required: true },
  connected: { type: Boolean, required: false},
  lastConnection: { type: Date, required: false},
});

module.exports = mongoose.model('Account', accountSchema);