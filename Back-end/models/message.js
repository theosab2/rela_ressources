const mongoose = require('mongoose');

const MessageSchema = mongoose.Schema({
    sender_id:{type:String, required:true, default:"VALUE_IS_REQUIRED"},
    relation_id:{type:String, required:true, default:"VALUE_IS_REQUIRED"},
    UT_id:{type:String}, // code : MESSAGE => (type)
    body:{type:String},
    additionnalCSS:{type:String},
    _createdAt:{type:Date, required:true, default:Date.now()},
    _updatedAt:{type:Date, required:true, default:Date.now()}
});

module.exports = mongoose.model('Message', MessageSchema);