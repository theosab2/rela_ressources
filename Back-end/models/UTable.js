const mongoose = require('mongoose');

const UTableSchema = mongoose.Schema({
    code:{type:String, required:true, default:"DEFAULT"},
    type:{type:String}, // CONTENT, RELATION, MESSAGE, VOTES
    name:{type:String}, //TAG, CATEGORY, SETTING
    way:{type:Boolean}, //VOTES
    defaultValue:{type:String}, //SETTING
    valueType:{type:String}, //SETTING
    _createdAt:{type:Date, required:true, default:Date.now()},
    _updatedAt:{type:Date, requried:true, default:Date.now()}
});

module.exports = mongoose.model('UTable', UTableSchema);