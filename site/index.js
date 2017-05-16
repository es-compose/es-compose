var path = require('path');
let start = require('../');
var favicon = require('serve-favicon');

start({
    name: 'Testing'
}, (context) => { // startup 
    context.on('app.init', (app) => {
        // favicon(path.join(__dirname, 'public', 'favicon.ico'),
    })
});