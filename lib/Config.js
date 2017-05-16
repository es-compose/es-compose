let fs = require('fs');
let path = require('path');
var merge = require('deepmerge');
const Container = require('./Container');

const ENVCHAR = '$';

/**
 * Configuration object
 */
class Config extends Container
{
    constructor(data = {}, env = null) {
        super(data);
        if(env) this.env = env;
    }

    /**
     * Deep merging
     * 
     * Note, arrays will not be deep merged, instead replaced.
     * @param {object} data 
     */
    merge(data) {
        this.import(merge(this.export(), data, { arrayMerge: (dest, src) => {
            return src;
        }}));
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