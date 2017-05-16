var Config = require('./lib/Config');
var Utils = require('./lib/Utils');
let context = require('./server/context');
var serveStatics = require('serve-static');
var merge = require('deepmerge');

/**
 * Bootstrapper/starter
 * Initializing entire application and start the server
 */
module.exports = function start(appConfig = {}, callback = null) {
    const env = context.get('env'); 

    // create the config with default configuration and then merge
    let config = new Config(require('./config'), env); // load with default configs
    if(appConfig) {
        config.load(appConfig);
    }
    context.set('config', config);

    context.on('app.init', (app) => {
        // view setup, if provided
        let templates = config.get('templates', {});
        let views = Utils.values(templates);
        if(views.length) {
            app.set('views', views);
            app.set('view engine', templates.ext);
        }
    });

    context.on('app.ready', (app) => {
        // serving static files
        let statics = config.get('statics', []);
        let dirs = Utils.values(statics);
        for(let dir of dirs) {
            app.use(serveStatics(dir));
        }

        // routes by the site, given first priority
        let routes = config.get('routes', []);
        for(let route of routes) {
            let middleware = require(route);
            app.use(middleware);
        }

        // modules
        let modules = config.get('modules', {});
        for(let name in modules) {
            let plugin = require(modules[name]);
            app.use(plugin(context));
        }
    });

    // add plugins
    let plugins = config.get('plugins', {});
    for(let name in plugins) {
        let plugin = require(plugins[name]);
        plugin(context);
    }

    // initializing is done, now call the callback, if provided
    if(callback) {
        callback(context);
    }

    // start the server
    require('./server');
};