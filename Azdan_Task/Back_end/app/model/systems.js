const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const systems = new Schema({
    _id: { type: Schema.ObjectId, auto: true },
    name: String,
    testerid:[{
        type:String,
        ref:"users"
    }],
    developerid:[{
        type:String,
        ref:"users"
    }],
    describe:String,
    date:Date
});

//Register Model..
const SystemModel = mongoose.model("systems",systems);
module.exports = SystemModel;