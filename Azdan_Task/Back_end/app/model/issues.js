const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const issues = new Schema({
    _id: { type: Schema.ObjectId, auto: true },
    name: String,
    systemid:{
        type:String,
        ref:"systems"
    },
    testerid:{
        type:String,
        ref:"users"
    },
    describe:String,
    date:Date
});

//Register Model..
const issueModel = mongoose.model("issues",issues);
module.exports = issueModel;