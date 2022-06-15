const mongoose = require('mongoose');

const RelationSchema = mongoose.Schema({
    name:{type:String, required:true, default:"VALUE_IS_REQUIRED"},
    UT_id:{type:String}, // code : RELATION => (type)
    user_ids:[
        {type:String}
    ],
    _createdAt:{type:Date, required:true, default:Date.now()}, 
    _updatedAt:{type:Date, required:true, default:Date.now()}
});

module.exports = mongoose.model('Relation', RelationSchema);