var path = require('path');
let start = require('../');

start({
    name: 'Testing',
    debug: true,
    port: 3000,

    statics: [
        path.join(__dirname, 'public')
    ],

    templates: {
        ext: 'hbs',
        engines: {
            'hbs' : 'handlebars'
        },
        paths: [
            path.join(__dirname, 'views')
        ]
    },

    routes: {
        '/' : path.join(__dirname, 'routes')
    },

    modules: {

    }
});