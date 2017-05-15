let debug = require('debug')('app');
let context = require('./context');

// 404 handler
let error404 = function(req, res, next) { 
    var err = new Error('Not Found: ' + req.originalUrl);
    err.status = 404;
    next(err);
};

// error handler
let errorHandler = function(err, req, res, next) {
    context.emit('app.error', err);

    res.locals.message = err.message;
    
    // render the error page
    let status, script;
    script = 'error';
    if(context.get('env') === 'development') {
        res.locals.error = err;
    } else {
        res.locals.error = {};
        err.stack = null;
    }
    
    status = err.status || 500;
    try {
        res.status(status);
        res.render(script, {
            status: status,
            message: err.message,
            error: err
        });
    } catch(e) {
        context.emit('app.error', err);
        debug(e);
        res.send(e.message);
    }
};

module.exports = [error404, errorHandler];