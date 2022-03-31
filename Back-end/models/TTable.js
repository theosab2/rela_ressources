const mongoose = require('mongoose');

const TTableSchema = mongoose.Schema({
    TTname:{type:String, required:false},
    TTcode:{type:String, required:true,default:"DEFAULT"},
    _createdAt:{type:Date, required:true, default:Date.now()},
    _updatedAt:{type:Date, requried:true, default:Date.now()}
});

module.exports = mongoose.model('TTable', TTableSchema);