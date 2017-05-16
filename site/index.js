var path = require('path');
let start = require('../');
process.env.NODE_ENV = 'production';

start({
    name: 'Testing'
}, (context) => { // startup 
    
});