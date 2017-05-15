var Container = require('../lib/Container');

let context = new Container({
    env: process.env.NODE_ENV || 'development',
    port: process.env.PORT || '3000'
});
module.exports = context;