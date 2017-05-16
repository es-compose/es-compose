let handler =  require('./handler');
var router = require('express').Router();


module.exports = (context) => {
    router.use('/pages', handler);
    router.get('/', handler);
    return router;
}