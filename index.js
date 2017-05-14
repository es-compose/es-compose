let context = require('./server/context');
var statics = require('serve-static');

/**
 * Bootstrapping
 */
module.exports = function bootstrapper(config = {}) {
    // view setup
    context.on('app.init', (app) => {
        let templates = config.templates || {};
        app.set('views', templates.paths || []);
        app.set('view engine', templates.ext);
    });

    // public dir
    context.on('app.ready', (app) => {
        let publics = config.statics || [];
        for(let dir of publics) {
            app.use(statics(dir));
        }

        // routes
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