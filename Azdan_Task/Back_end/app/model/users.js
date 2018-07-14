const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const users = new Schema({
    _id: { type: Schema.ObjectId, auto: true },
    name: String,
    password: String,
    status:Number,
    date:Date
});

//Register Model..
const UserModel =mongoose.model("users",users);
module.exports = UserModel;