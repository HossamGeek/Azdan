const User = require('../model/users');
const mongoose = require('mongoose');
module.exports = {
    createUser: user => {
        let newUser = new User(user);
        return newUser.save();
    },

    Userlogin: (name, password) => {
        return User.find({name: name, password : password},{password:0});
    },

    getUserByname: (name) => {
        return User.find({name: name},{password:0});
    },
    getUserById: id => {
        return User.find({_id : mongoose.Types.ObjectId(id)});
    },
    getAllUsers: () => {
       // return User.find({}).sort({ addedAt: '-1'}).limit(top);
        return User.find({});
    },
    updateUser: (id, user) => {
        return User.findByIdAndUpdate(id, user);
    },
    deleteUser: id => {
        return User.deleteOne({ _id: mongoose.Types.ObjectId(id)});
    },
    getUserByStatus: status =>{
        return User.find({ status: status});
    },
    getSystemTester : data =>{
        return User.populate(data,{path:"testerid",select:["name"]});
    },
    getSystemDeveloper : data =>{
        return User.populate(data,{path:"developerid",select:["name"]});
    }

};