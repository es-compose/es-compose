var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

module.exports = [
    // favicon(path.join(__dirname, 'public', 'favicon.ico'),
    logger('dev'),
    bodyParser.json(),
    bodyParser.urlencoded({ extended: false }),
    cookieParser()
]