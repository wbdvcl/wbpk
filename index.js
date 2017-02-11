import webpack from 'webpack'

export default class OOPack {

    constructor() {
        
        this.config = {};

        return this;
    }

    entry(entry) {
        this.config.entry = entry;

        return this;
    }

    output(output) {

        let split = output.split('/');

        // If user passes in './public/etc/' remove the leading period
        if (split[0] === '.') {
            split.splice(0, 1);
        }

        this.config.output = {
            path: `${__dirname}/${split.slice().splice(0, split.length - 1).join('/')}`,
            filename: split[split.length - 1]
        };

        return this;
    }

    loaders(loaders) {
        this.config.module = {
            loaders
        };

        return this;
    }

}