var express = require('express');
var path = require('path');
var context = require('./context');

var app = express();
var pipeline = require('./pipeline');
var errors = require('./errors');

// view engine setup
context.set('app', app);
context.emit('app.init', app);

app.use(pipeline);

context.emit('app.ready', app);
app.use(errors);

module.exports = app;
