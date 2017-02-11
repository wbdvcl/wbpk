import webpack from 'webpack'

export default class OOPack {

    constructor() {
        this.config = {};

        return this;
    }

    /**
     * Loads an existing webpack config
     * @param string|object config
     * @return OOPack
     */
    load(config) {
        let configObj = null;

        if (typeof config === 'string') {
            configObj = require(config);
        } else if (typeof config === 'object') {
            configObj = config;
        } else {
            throw 'Invalid parameter passed to config. Parameter should either be webpack config object or path to webpack config.';
        }

        this.config = { ...this.config, ...configObj };

        return this;
    }

    /**
     * @param string|array entry
     * @return OOPack
     */
    entry(entry) {
        this.config.entry = entry;

        return this;
    }

    /**
     * @param string output
     * @return OOPack
     */
    output(output) {
        this.config.output = this.preserve(this.config.output);

        let split = output.split('/');

        // If user passes in './public/etc/' remove the leading period
        if (split[0] === '.') {
            split.splice(0, 1);
        }

        this.config.output.path = `${__dirname}/${split.slice().splice(0, split.length - 1).join('/')}`;
        this.config.output.filename = split[split.length - 1];

        return this;
    }

    /**
     * @param string[] loaders
     */
    loaders(loaders) {
        this.config.module = this.preserve(this.config.module);

        this.config.module.loaders = loaders;

        return this;
    }

    /**
     * Preserves an existing value or returns a new default
     * 
     * @param mixed def - What you want to default the value to, defaults to an empty object
     * @return mixed
     */
    preserve(prop, def = {}) {
        return typeof prop !== 'undefined' ? prop : def;
    }

}