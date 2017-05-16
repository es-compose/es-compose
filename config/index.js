var path = require('path');

module.exports = {
    name: 'es-compose site',
    
    /**
     * define your statics/public folders
     */
    statics: [
        path.join(__dirname, '../templates/statics')
    ],

    /**
     * templates/rendering related configuration
     */
    templates: {
        ext: 'hbs', // default view extension if omitted
        engines: {  // supported view extensions
            'hbs' : 'handlebars'
        },
        paths: [    // view paths/directories
            path.join(__dirname, '../templates/views')
        ]
    },

    /**
     * Routes, must return
     */
    routes: [
        // path.join(__dirname, 'routes')
    ],

    /**
     * Plugins
     * Order of entries may be important based on plugin's intention
     */
    modules: {
        pages: path.join(__dirname, '../modules/pages')
    },

    /**
     * environment specific overrides
     */
    $development : {
    },

    $staging: {

    }
};