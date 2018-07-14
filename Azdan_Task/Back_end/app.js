const createError = require('http-errors');
const express = require('express');

const path = require('path');


const logger = require('morgan');

const adminRouter = require('./app/controllers/admin');
const userRouter = require('./app/controllers/user');

const mongoose = require('mongoose');

mongoose.connect('mongodb://azdan:azdan1234@ds235711.mlab.com:35711/azdan');


var app = express();






app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));




app.get('/', function(req, res) {
 res.redirect('/user/home');
});


app.use('/admin', adminRouter);
app.use('/user', userRouter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});


app.listen(process.env.PORT || 3000, function(){
  console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});

