var path = require('path');
let start = require('../');

start({
    name: 'Testing',
    debug: true,
    port: 3000,

    statics: [
        path.join(__dirname, '../templates/statics')
    ],

    templates: {
        ext: 'hbs',
        engines: {
            'hbs' : 'handlebars'
        },
        paths: [
            path.join(__dirname, '../templates/views')
        ]
    },

    routes: [
        // path.join(__dirname, 'routes')
    ],

    plugins: {
        pages: path.join(__dirname, '../plugins/pages')
    }
});