var logger = require('morgan');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var helmet = require('helmet');

module.exports = [
    logger('dev'),
    bodyParser.json(),
    bodyParser.urlencoded({ extended: false }),
    methodOverride(),

    // security related
    helmet.dnsPrefetchControl(),
    helmet.frameguard(),
    helmet.hidePoweredBy(),
    helmet.ieNoOpen(),
    helmet.noSniff(),
    helmet.xssFilter()
]