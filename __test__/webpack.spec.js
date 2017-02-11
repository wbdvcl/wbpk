import OOPack from '../index'

const parentDirectory = (__dirname).split('/__test__')[0];

let instance = null;

// Reset the instance before each test run
beforeEach(() => {
    instance = new OOPack();
});

describe('OOPack', () => {

    describe('entry()', () => {
        it('should set the entry path as a string', () => {
            instance.entry('./app.js');

            expect(instance.config.entry).toBe('./app.js');
        });

        it('should set the entry path as an array', () => {

            let entry = [ './polyfill.js', './app.js' ];

            instance.entry(entry);

            expect(instance.config.entry).toBe(entry);
        });
    });

    describe('output()', () => {
        it('properly set the output path from a relative path with a leading period', () => {

            instance.output('./public/js/bundle.js');

            expect(instance.config.output).toEqual({ path: `${parentDirectory}/public/js`, filename: 'bundle.js' });
        });

        it('properly set the output path from a relative path without a leading period', () => {

            instance.output('public/js/bundle.js');

            expect(instance.config.output).toEqual({ path: `${parentDirectory}/public/js`, filename: 'bundle.js' });
        });
    });

    describe('preserve()', () => {
        it('should return the prop', () => {

            let obj = {
                key: 'value'
            }

            let value = instance.preserve(obj.key);

            expect(value).toBe(obj.key);
        });

        it('should return the prop even if falsey', () => {

            let someVariable = false;

            let value = instance.preserve(someVariable);

            expect(value).toBe(someVariable);
        });

        it('should return the an empty obj because we didnt provide a default', () => {

            let obj = {};

            let value = instance.preserve(obj.key);

            expect(value).toEqual({});
        });

        it('should return the default provided', () => {

            let obj = {};

            let value = instance.preserve(obj.key, true);

            expect(value).toEqual(true);
        });
    });

    describe('load()', () => {
        it('should set a plain object config', () => {
            let config = {
                entry: './app.js',
                output: './public/bundle.js'
            };

            instance.load(config);

            expect(instance.config).toEqual(config);
        });

        it('should preserve old values', () => {
            let config = {
                entry: './app.js'
            };

            instance.output('./public/js/bundle.js').load(config);

            expect(instance.config.output.filename).toEqual('bundle.js');
        });

        it('should load a webpack config file', () => {

            let config = require('./mocks/webpack.config.mock.js');

            instance.load('./__test__/mocks/webpack.config.mock.js');

            expect(instance.config).toEqual(config);
        });
    });
});