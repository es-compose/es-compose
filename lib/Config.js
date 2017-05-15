let fs = require('fs');
let path = require('path');
var _ = require('lodash');
const Container = require('./Container');

const ENVCHAR = '$';

/**
 * Configuration object
 */
class Config extends Container
{
    constructor(data = {}, env = null) {
        super(data);
        this.env = env;
    }

    /**
     * Deep merging
     * @param {object} data 
     */
    merge(data) {
        this.import(_.merge({}, this.export(), data));
    }

    /**
     * Load file content into the config
     * @param {string}
     * @returns bool
     */
    load(config) {
        let data;
        if(typeof config === 'string') {
            data = require(config);
        }  else {
            data = config;
        }
        this.merge(data);

        // now merge the environment specific config
        if(this.env) {
            let env = `${ENVCHAR}${this.env}`;
            let envConfig = data[env];
            if(envConfig) {
                this.merge(envConfig);
            }
        }
    }
}

module.exports = Config;