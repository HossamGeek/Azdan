const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const tasks = new Schema({
    _id: { type: Schema.ObjectId, auto: true },
    name: String,
    systemid:   {
        type:String,
        ref:"systems"
    },
    developerid:{
        type:String,
        ref:"users"
    },
    describe:String,
    status:Number,
    date:Date
});

//Register Model..
const taskModel = mongoose.model("tasks",tasks);
module.exports = taskModel;