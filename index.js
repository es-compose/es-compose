var Config = require('./lib/Config');
let context = require('./server/context');
var serveStatics = require('serve-static');
var merge = require('deepmerge');

/**
 * Bootstrapper/starter
 * Initializing entire application and start the server
 */
module.exports = function start(appConfig) {
    const env = context.get('env'); 

    // create the config with default configuration and then merge
    let config = new Config(require('./config'), env); // load with default configs
    config.load(appConfig);
    context.set('config', config);

    context.on('app.init', (app) => {
        // view setup, if provided
        let templates = config.get('templates', {});
        if(templates) {
            app.set('views', templates.paths || []);
            app.set('view engine', templates.ext);
        }
    });

    context.on('app.ready', (app) => {
        // serving static files
        let statics = config.get('statics', []);
        for(let dir of statics) {
            app.use(serveStatics(dir));
        }

        // routes by the site, given first priority
        let routes = config.get('routes', []);
        for(let route of routes) {
            let middleware = require(route);
            app.use(middleware);
        }

        // plugins
        let plugins = config.get('plugins', {});
        for(let name in plugins) {
            let plugin = require(plugins[name]);
            app.use(plugin(context));
        }
    });

    // start the server
    require('./server');
};