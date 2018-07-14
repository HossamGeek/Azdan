const Tasks = require('../model/tasks');
const mongoose = require('mongoose');
module.exports = {
    createTasks: Task => {
        let newTasks = new Tasks(Task);
        return newTasks.save();
    },
    updateTasks: (id, Task) =>{
        return Tasks.findByIdAndUpdate(id, Task);
    },
    deleteTasks: id => {
        return Tasks.deleteOne({ _id: mongoose.Types.ObjectId(id)});
    },
    getTasksByDeveloperId: id =>{
        return Tasks.find({ developerid: id});
    },
    deleteTaskBySystem:(id)=>{
    return Tasks.deleteOne({ systemid: id});
    },
    getTaskBySystem: (id)=>{
        return Tasks.find({ systemid: id});
    },getTask:(id)=>{
        return Tasks.find({ _id: mongoose.Types.ObjectId(id)});

    }
};