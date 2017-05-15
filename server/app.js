var express = require('express');
var context = require('./context');
var app = express();
var pipeline = require('./pipeline');
var errors = require('./errors');


app.set('port', context.get('port')); // not sure if express needs this
context.set('app', app);
context.emit('app.init', app);

app.use(pipeline);

context.emit('app.ready', app);
app.use(errors);

module.exports = app;
