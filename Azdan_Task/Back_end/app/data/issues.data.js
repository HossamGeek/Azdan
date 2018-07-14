const Issues = require('../model/issues');
const mongoose = require('mongoose');
module.exports = {
    createIssues: Issue => {
        let newIssues = new Issues(Issue);
        return newIssues.save();
    },
    updateIssues: (id, Issue) =>{
        return Issues.findByIdAndUpdate(id, Issue);
    },
    deleteIssues: id => {
        return Issues.deleteOne({ _id: mongoose.Types.ObjectId(id)});
    },
    getIssuesByTesterId: id =>{
        return Issues.find({ testerid: id});
    },
    getIssuesBySystem: (id)=>{
        return Issues.find({ systemid: id});
    },
    getIssues:(id)=>{
        return Issues.find({ _id: mongoose.Types.ObjectId(id)});

    },deleteIssuesBySystem:(id)=>{
        return Issues.deleteOne({ systemid: id});
    }
};