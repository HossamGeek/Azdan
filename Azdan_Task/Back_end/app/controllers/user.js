const express = require('express');
const router = express.Router();
const bodyparser = require('body-parser');
const midparse = bodyparser.urlencoded();

const mongoose = require('mongoose');

const userManger = require('../data/user.data');
const systemManger = require('../data/system.data');
const issuesManager = require('../data/issues.data');
const tasksManager = require('../data/tasks.data');



//home

router.get("/home",midparse,function (req,res) {
    let hello ='<h1 style="margin-left: 40%">Hello In My App</h1>';
    res.send(hello);
});

//login user

router.post('/login',midparse,function (req,res,next) {
    let username = req.body.name;
    let password = req.body.password;
    userManger.Userlogin(username,password)
        .then(function (data,err) {
            if (err) console.log(err);
            if(data.length <= 0)
                res.json({success: false, data: 'empty'});
            else
                res.json({success: true, data: data});
        })
        .catch(function (ex) {
            res.json({success: false, data: ex});
        });
});


//get status user

router.get('/getuserstatus/:id',midparse,function (req,res,next) {
    let user_id = req.params.id;
    userManger.getUserById(user_id)
        .then(function (data,err) {
            if (err) {
                console.log(err);
                return
            }
            if(data.length <= 0)
                res.json({success: false, data: 'empty'});
            else
                res.json({success: true, data: data});
        })
        .catch(function (ex) {
            res.json({success: false, data: ex});
        });
});


//add Task || Issues

router.post('/addtask/:iduser',midparse,function (req,res,next) {
    let iduser = req.params.iduser;
    let systemid = req.body.systemid;


    let user_data = userManger.getUserById(iduser)
        .then(function (data,err) {
            if (err) return false;
            if(data.length <= 0 || data === null) return false;
            else return data[0].status;
        })
        .catch(function (ex) {
            return false;
        });

    let system_data_issues = issuesManager.getIssuesBySystem(systemid)
        .then(function (data,err) {
            if (err) return false;
            if(data.length <= 0 || data === null) return false;
            else return true;
        })
        .catch(function (ex) {
            return false;
        });

    let system_data_task = tasksManager.getTaskBySystem(systemid)
        .then(function (data,err) {
            if (err) return false;
            if(data.length <= 0 || data === null) return false;
            else return true;
        })
        .catch(function (ex) {
            return false;
        });


    Promise.all([
        user_data,
        system_data_issues,
        system_data_task
    ]).then((value) => {
        if((value[0] === false && value[1] === false) || (value[0] === false && value[2] === false)){

            res.json({success: false, data: 'empty'});

        }else if((value[0] === 2 && value[1] === true) || (value[0] === 3 && value[2] === true)){
            res.json({success: false, data: 'Task has been Added before'});
        }else if(value[0] === 2 && value[1] === false){

            issuesManager.createIssues(req.body)
                .then(function (data,err) {
                    if (err) {
                        console.log(err);
                        return
                    }
                    if(data.length <= 0)
                        res.json({success: false, data: 'empty'});
                    else
                        res.json({success: true, data: data});
                })
                .catch(function (ex) {
                    res.json({success: false, data: ex});
                });

        }else if(value[0] === 3 && value[2] === false){
            tasksManager.createTasks(req.body)
                .then(function (data,err) {
                    if (err) {
                        console.log(err);
                        return
                    }
                    if(data.length <= 0)
                        res.json({success: false, data: 'empty'});
                    else
                        res.json({success: true, data: data});
                })
                .catch(function (ex) {
                    res.json({success: false, data: ex});
                });
        }

    });


});

//delete Task || Issues
router.delete('/task/:idtask/:iduser',midparse,function (req,res,next) {
    let id_Task = req.params.idtask;
    let iduser = req.params.iduser;

    let user_data = userManger.getUserById(iduser)
        .then(function (data,err) {
            if (err) return false;
            if(data.length <= 0 || data === null) return false;
            else return data[0].status;
        })
        .catch(function (ex) {
            return false;
        });

    Promise.all([
        user_data
    ]).then((value) => {
        if(value[0] === false){

            res.json({success: false, data: 'empty'});

        }else if(value[0] === 2){

            issuesManager.deleteIssues(id_Task)
                .then(function (data,err) {
                    if (err) {
                        console.log(err);
                        return
                    }
                    res.json({success: true, data: 'Issues Deleted'});
                })
                .catch(function (ex) {
                    res.json({success: false, data: ex});
                });

        }else if(value[0] === 3){
            tasksManager.deleteTasks(id_Task)
                .then(function (data,err) {
                    if (err) {
                        console.log(err);
                        return
                    }
                    res.json({success: true, data: 'Task Deleted'});
                })
                .catch(function (ex) {
                    res.json({success: false, data: ex});
                });
        }

    });



});

//edit Task || Issues

router.put('/task/:idtask/:iduser',midparse,function (req,res,next) {
    let id_Task = req.params.idtask;

    let iduser = req.params.iduser;

    let user_data = userManger.getUserById(iduser)
        .then(function (data,err) {
            if (err) return false;
            if(data.length <= 0 || data === null) return false;
            else return data[0].status;
        })
        .catch(function (ex) {
            return false;
        });

    Promise.all([
        user_data
    ]).then((value) => {
        if(value[0] === false){

            res.json({success: false, data: 'empty'});

        }else if(value[0] === 2){
            let describe ={
                describe:req.body.describe
            };
            issuesManager.updateIssues(id_Task,req.body)
                .then(function (data,err) {
                    if (err) {
                        console.log(err);
                        return
                    }
                    res.json({success: true, data: 'Issues updated'});
                })
                .catch(function (ex) {
                    res.json({success: false, data: ex});
                });

        }else if(value[0] === 3){
            let data ={
              status:req.body.status,
              describe:req.body.describe
            } ;
            tasksManager.updateTasks(id_Task,req.body)
                .then(function (data,err) {
                    if (err) {
                        console.log(err);
                        return
                    }
                    res.json({success: true, data: 'Task updated'});
                })
                .catch(function (ex) {
                    res.json({success: false, data: ex});
                });
        }

    });

});

//get all issues by tester

router.get('/tester/:id',midparse,function (req,res,next) {
    let id_Tester = req.params.id;

    let tester_data =  issuesManager.getIssuesByTesterId(id_Tester)
        .then(function (data,err) {
            if (err) {
                console.log(err);
                return
            }
            if(data.length <= 0)
                return false;
            else
                return data;
        });/*
        .catch(function (ex) {
            res.json({success: false, data: ex});
        });*/

    Promise.all([
        tester_data
    ]).then((value)=>{
        if(value[0] === false){
            res.json({success: false, data: 'empty'});
        }else {
            systemManger.getSystemname(value[0]).then(function (data,err) {
                if (err) {
                    console.log(err);
                    return
                }
                if(data.length <= 0)
                    res.json({success: false, data: 'empty'});
                else
                    res.json({success: true, data: data});
            })
        }
    }).catch(function (ex) {
        res.json({success: false, data: ex});
    });
});

//get all tasks by developer

router.get('/developer/:id',midparse,function (req,res,next) {
    let id_developer = req.params.id;

    let developer_data =  tasksManager.getTasksByDeveloperId(id_developer)
        .then(function (data,err) {
            if (err) {
                console.log(err);
                return
            }
            if(data.length <= 0)
                return false;
            else
                return data;
        });

    Promise.all([
        developer_data
    ]).then((value)=>{
        if(value[0] === false){
            res.json({success: false, data: 'empty'});
        }else {
            systemManger.getSystemname(value[0]).then(function (data,err) {
                if (err) {
                    console.log(err);
                    return
                }
                if(data.length <= 0)
                    res.json({success: false, data: 'empty'});
                else
                    res.json({success: true, data: data});
            })
        }
    }).catch(function (ex) {
        res.json({success: false, data: ex});
    });
});

//get issue
router.get('/getissue/:id',midparse,function (req,res,next) {
    let id_Issues = req.params.id;

    issuesManager.getIssues(id_Issues)
        .then(function (data,err) {
            if (err) {
                console.log(err);
                return
            }
            if(data.length <= 0)
                res.json({success: false, data: 'empty'});
            else
                res.json({success: true, data: data});
        })
        .catch(function (ex) {
            res.json({success: false, data: ex});
        });
});

//get task
router.get('/gettask/:id',midparse,function (req,res,next) {
    let id_task = req.params.id;

    tasksManager.getTask(id_task)
        .then(function (data,err) {
            if (err) {
                console.log(err);
                return
            }
            if(data.length <= 0)
                res.json({success: false, data: 'empty'});
            else
                res.json({success: true, data: data});
        })
        .catch(function (ex) {
            res.json({success: false, data: ex});
        });
});

module.exports = router;