let context = require('./server/context');
var statics = require('serve-static');

/**
 * Bootstrapping
 */
module.exports = function start(config = {}) {
    context.on('app.init', (app) => {
        // view setup
        let templates = config.templates || {};
        app.set('views', templates.paths || []);
        app.set('view engine', templates.ext);
    });

    context.on('app.ready', (app) => {
        // serving static files
        let publics = config.statics || [];
        for(let dir of publics) {
            app.use(statics(dir));
        }

        // routes by the site, given first priority
        let routes = config.routes || [];
        for(let route of routes) {
            let middleware = require(route);
            app.use(middleware);
        }

        // modules
        let modules = config.modules || {};
        for(let name in modules) {
            let module = require(modules[name]);
            app.use(module(context));
        }
    });

    // start the server
    require('./server');
};