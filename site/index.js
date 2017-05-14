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
            // path.join(__dirname, 'views2')
        ]
    },

    routes: [
        // path.join(__dirname, 'routes')
    ],

    modules: {
        pages: path.join(__dirname, '../modules/pages')
    }
});