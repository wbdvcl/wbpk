import webpack from 'webpack'

export default class wbpk {

    constructor() {
        this.config = {};

        return this;
    }

    /**
     * Loads an existing webpack config
     * @param string|object config
     * @return wbpk
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
     * @return wbpk
     */
    entry(entry) {
        this.config.entry = entry;

        return this;
    }

    /**
     * @param string output
     * @return wbpk
     */
    output(output) {
        this.config.output = this.preserve(this.config.output);

        let split = output.split('/');

        // Need the path without the ending filename
        this.config.output.path = `${split.slice().splice(0, split.length - 1).join('/')}`;
        // Ending filename will just be the last of the split
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
     * Keeps an open webpack watch process
     */
    watch(opts = {}) {
        let compiler = webpack(this.config);

        compiler.watch(opts, (err, stats) => {

        });
    }

    /**
     * Runs the webpack command once
     */
    run() {
        let compiler = webpack(this.config);

        compiler.run((err, stats) => {
            console.log(err, stats); 
        });
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