import webpack from 'webpack'

export default class OOPack {

    constructor(config) {
        
        if (config && typeof config === 'object') {
            this.config = config;
        } else {
            this.config = {};
        }

        return this;
    }

    entry(entry) {
        this.config.entry = entry;

        return this;
    }

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