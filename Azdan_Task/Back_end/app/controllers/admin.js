const express = require('express');
const router = express.Router();
const bodyparser = require('body-parser');
const midparse = bodyparser.urlencoded();

const mongoose = require('mongoose');

const userManger = require('../data/user.data');
const systemManger = require('../data/system.data');
const issuesManager = require('../data/issues.data');
const tasksManager = require('../data/tasks.data');

//add Admin in the first time

/*router.post('/addadmin',midparse,function (req,res,next) {
   userManger.createUser(req.body)
       .then(function (data,err) {
       if (err) console.log(err);
       res.json({success: true, data: data});
        })
       .catch(function (ex) {
       res.json({success: false, data: ex});
        });
});*/




//add {tester , developer}


router.post('/adduser',midparse,function (req,res,next) {
    let admin_id = req.body.admin_id;
    let user_data={
        name : req.body.name,
        password : req.body.password,
        status : req.body.status};

    let admin_data = userManger.getUserById(admin_id)
        .then(function (data,err) {
        if (err) return false;
        if(data.length <= 0 || data === null) return false;
         else return true;
        })
        .catch(function (ex) {
            return false;
        });
    let user_added = userManger.getUserByname(user_data.name)
        .then(function (data,err) {
            if (err) return false;
            if(data.length <= 0 || data === null) return false;
            else return true;
        })
        .catch(function (ex) {
            return false;
        });

    Promise.all([
        admin_data,
        user_added
    ]).then((value) => {
         if(value[0] === true && value[1] === false){
            userManger.createUser(user_data)
                .then(function (data,err) {
                    if (err) console.log(err);
                    res.json({success: true, data: data});
                })
                .catch(function (ex) {
                    res.json({success: false, data: ex});
                });
        }else {
            res.json({success: false, data: 'empty'});
        }
    });

});


//get alluser

router.get('/alluser',midparse,function (req,res,next) {
    userManger.getAllUsers().then(function (data,err) {
        if (err) {
            console.log(err);
            return;
        }
        res.json({success: true, data: data});
        })
        .catch(function (ex) {
            res.json({success: false, data: ex});
        });
});

//get users By status

router.get('/alluser/:statuts',midparse,function (req,res,next) {
    let status = req.params.statuts;
    userManger.getUserByStatus(status)
        .then(function (data,err) {
            if (err) {
                console.log(err);
                return;
            }
            res.json({success: true, data: data});
        })
        .catch(function (ex) {
            res.json({success: false, data: ex});
        });
});

//delete user

router.delete('/user/:id',midparse,function (req,res,next) {
    let id = req.params.id;
    userManger.deleteUser(id).then(function (data,err) {
        if (err) {
            console.log(err);
            return;
        }
        res.json({success: true, data: 'user Deleted'});
    })
        .catch(function (ex) {
            res.json({success: false, data: ex});
        });
});




/*****************************/
/************ SYSTEM ********/
/*****************************/



//add System
router.post('/addsystem',midparse,function (req,res,next) {
    systemManger.createSystem(req.body)
        .then(function (data,err) {
            if (err) console.log(err);
            res.json({success: true, data: data});
        })
        .catch(function (ex) {
            res.json({success: false, data: ex});
        });
});

//delete System

router.delete('/system/:id',midparse,function (req,res,next) {
    let id = req.params.id;
    let len_system =
        systemManger.getAllSystems().then(function (data,err) {
        if (err) {
            console.log(err);
            return;
        }
        if(data.length === 1) return false;
        else return true;
    }).then((data) =>{
        if(data === false){
            return false
        }else {

            systemManger.deleteSystem(id).then(function (data,err) {
            if (err) {
                console.log(err);
                return;
            }
            return true

            });
        }
    });


    Promise.all([
        len_system
    ]).then((value )=>{

        if(value[0]===false){
            res.json({success: false, data: 'system cant Deleted'});
        }else {
            issuesManager.deleteIssuesBySystem(id).then(function (data,err) {
                    if (err) {
                        console.log(err);
                        return;
                    }
                    return true;
                    //res.json({success: true, data: 'system Deleted'});
                }).then((value1)=>{
                tasksManager.deleteTaskBySystem(id).then(function (data,err) {
                    if (err) {
                        console.log(err);
                        return;
                    }
                    res.json({success: true, data: 'system Deleted'});
                });
            });


        }
    }).catch(function (ex) {
            res.json({success: false, data: ex});
        });
});

//edit System

router.put('/system/:id',midparse,function (req,res,next) {
    let system_id = req.params.id;
    systemManger.updateSystem(system_id , req.body).then(function (data,err) {
        if (err) {
            console.log(err);
            return;
        }
        res.json({success: true, data: "System Updated"});
    })
        .catch(function (ex) {
            res.json({success: false, data: ex});
        });
});


//add tester

router.put('/system/addtester/:id',midparse,function (req,res,next) {
    let system_id = req.params.id;
    let tester_id = req.body.testerid;
    let result_data =  systemManger.findTester(system_id,tester_id).then(function (data,err) {
        if (err) {
            console.log(err);
            return;
        }
        if (data.length <= 0 || data === null) return false;
        else return true;
    });

    let add_tester = (system_id,tester_id)=> {

        systemManger.addTester(system_id, tester_id).then(function (data, err) {
            if (err) {
                console.log(err);
                return;
            }
            res.json({success: true, data: "tester Added"});
        });
    };

    Promise.all([
        result_data
    ]).then((value) => {
        if(value[0] === true){
            res.json({data : "developer added"});
        }else{
            add_tester(system_id,tester_id);
        }
    }).catch(function (ex) {
        res.json({success: false, data: ex});
    });




});

//add developer

router.put('/system/adddeveloper/:id',midparse,function (req,res,next) {
    let system_id = req.params.id;
    let developer_id = req.body.developerid;

    let result_data =  systemManger.findDeveloper(system_id,developer_id).then(function (data,err) {
        if (err) {
            console.log(err);
            return;
        }
        if(data.length <= 0 || data === null) return false;
        else return true;
    });


    let add_developer = (system_id,developer_id)=>{
        systemManger.addDeveloper(system_id,developer_id).then(function (data,err) {
            if (err) {
                console.log(err);
                return;
            }
            res.json({success: true, data: "developer Added"});
        });
    };

    Promise.all([
        result_data
    ]).then((value) => {
            if(value[0] === true){
                res.json({data : "developer added"});
            }else{
                add_developer(system_id,developer_id);
            }
        }).catch(function (ex) {
        res.json({success: false, data: ex});
    });

});


//delete tester

router.put('/system/deletetester/:id',midparse,function (req,res,next) {
    let system_id = req.params.id;
    let tester_id = req.body.testerid;
    systemManger.deleteTester(system_id,tester_id).then(function (data,err) {
        if (err) {
            console.log(err);
            return;
        }
        res.json({success: true, data: "tester deleted"});
    })
        .catch(function (ex) {
            res.json({success: false, data: ex});
        });
});

//delete developer

router.put('/system/deletedeveloper/:id',midparse,function (req,res,next) {
    let system_id = req.params.id;
    let developer_id = req.body.developerid;
    systemManger.deleteDeveloper(system_id,developer_id).then(function (data,err) {
        if (err) {
            console.log(err);
            return;
        }
        res.json({success: true, data: "developer deleted"});
    })
        .catch(function (ex) {
            res.json({success: false, data: ex});
        });
});

/******* Get Method ******/


//get all System

router.get('/allsystem',midparse,function (req,res,next) {
    systemManger.getAllSystems().then(function (data,err) {
        if (err) {
            console.log(err);
            return;
        }
        res.json({success: true, data: data});
    })
        .catch(function (ex) {
            res.json({success: false, data: ex});
        });
});

//get all system with name [ tester , developer ]

router.get('/allsystems',midparse,function (req,res,next) {
    let all_data =  systemManger.getAllSystems().then(function (data,err) {
        if (err) {
            console.log(err);
            return;
        }
        return data;
    }).then((data) =>{
        let data2 =
            userManger.getSystemTester(data).then(function (data,err) {
                if (err) {
                    console.log(err);
                    return;
                }
                return data;
            });



        return data2;
    });
    Promise.all([
        all_data
    ]).then((value) =>{
        userManger.getSystemDeveloper(value).then(function (data,err) {
            if (err) {
                console.log(err);
                return data;
            }
            res.json({ success: true,data: data});
        });
    }).catch(function (ex) {
        res.json({success: false, data: ex});
    });

});

// get system by id

router.get('/system/:id',midparse,function (req,res,next) {
    let id =  req.params.id;
    let all_data =  systemManger.getSystemById(id).then(function (data,err) {
        if (err) {
            console.log(err);
            return;
        }
        return data;
    }).then((data) =>{


        let data2 =
            userManger.getSystemTester(data).then(function (data,err) {
                if (err) {
                    console.log(err);
                    return;
                }
                return data;
            });



        return data2;
    });
    Promise.all([
        all_data
    ]).then((value) => {
        userManger.getSystemDeveloper(value).then(function (data,err) {
            if (err) {
                console.log(err);
                return data;
            }
            res.json({ success: true,data: data});
        });
    }).catch(function (ex) {
        res.json({success: false, data: ex});
    });

});

//get All systems by id tester
router.get('/getsystem/tester/:idtester',midparse,function (req,res) {
    let idtester = req.params.idtester;
    systemManger.getAllsystemByTesterId(idtester).then(function (data,err) {
        if (err) {
            console.log(err);
            return;
        }
        res.json({success: true, data: data});
    })
        .catch(function (ex) {
            res.json({success: false, data: ex});
        });
});


router.get('/getsystem/developer/:iddeveloper',midparse,function (req,res) {
    let iddeveloper = req.params.iddeveloper;
    systemManger.getAllsystemByDeveloperId(iddeveloper).then(function (data,err) {
        if (err) {
            console.log(err);
            return;
        }
        res.json({success: true, data: data});
    })
        .catch(function (ex) {
            res.json({success: false, data: ex});
        });
});

module.exports = router;

