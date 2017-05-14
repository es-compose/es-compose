let context = require('./server/context');
var statics = require('serve-static');

module.exports = function bootstrapper(config = {}) {
    // view setup
    context.on('app.init', (app) => {
        let templates = config.templates || {};
        app.set('views', templates.paths || []);
    })

    // public dir
    context.on('app.ready', (app) => {
        let publics = config.statics || [];
        for(let public of publics) {
            app.use(statics(public));
        }

        let routes = config.routes || {};
        for(let path in routes) {
            let route = require(routes[path]);
            app.use(route);
        }
    })

    // start the server
    require('./server');
};