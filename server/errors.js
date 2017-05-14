// catch 404 and forward to error handler
let error404 = function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
};

// error handler
let finalHandler = function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
};

module.exports = [
    error404,
    finalHandler
]