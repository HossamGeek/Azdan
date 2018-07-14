const System = require('../model/systems');
const mongoose = require('mongoose');
module.exports = {
    createSystem: system => {
        let newSystem = new System(system);
        return newSystem.save();
    },
    updateSystem: (id, system) =>{
        return System.findByIdAndUpdate(id, system);
    },
    deleteSystem: id => {
        return System.deleteOne({ _id: mongoose.Types.ObjectId(id)});
    },
    getAllSystems: () => {
        return System.find({});
    },
    findDeveloper: (systemid, id) => {
        return System.find({_id:mongoose.Types.ObjectId(systemid) , developerid : id});
    },
    findTester: (systemid, id) => {
        return System.find({_id:mongoose.Types.ObjectId(systemid), testerid : id});
    },
    addTester: ( id, testerid) => {
        return System.update({_id:mongoose.Types.ObjectId(id)},{$push: {testerid:testerid}});
    },
    addDeveloper: ( id, developerid) => {
        return System.update({_id:mongoose.Types.ObjectId(id)},{$push: {developerid:developerid}})
    },
    deleteTester:( id, testerid) => {
        return System.update({_id:mongoose.Types.ObjectId(id)},{$pull: {testerid:testerid}});
    },
    deleteDeveloper: ( id, developerid) => {
        return System.update({_id:mongoose.Types.ObjectId(id)},{$pull: {developerid:developerid}})
    },
    getSystemById: id =>{
        return System.find({ _id: mongoose.Types.ObjectId(id)});
    },getAllsystemByTesterId : id => {
        return System.find({ testerid: id});
    },getAllsystemByDeveloperId : id => {
    return System.find({ developerid: id});
    },
    getSystemname : data =>{
        return System.populate(data,{path:"systemid",select:["name"]});
    }
};