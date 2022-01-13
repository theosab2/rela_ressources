const mongoose = require('mongoose');

const roleSchema = mongoose.Schema({
  roleName: { type: String, required: true, unique:true},
  type: { type: Number, required: true },
});

module.exports = mongoose.model('Role', roleSchema);