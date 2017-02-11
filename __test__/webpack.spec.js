import OOPack from '../index'

const parentDirectory = (__dirname).split('/__test__')[0];

describe('OOPack', () => {
    it('properly set the output path from a relative path with a leading period', () => {
        let instance = new OOPack();

        instance.output('./public/js/bundle.js');

        expect(instance.config.output).toEqual({ path: `${parentDirectory}/public/js`, filename: 'bundle.js' });
    });

    it('properly set the output path from a relative path without a leading period', () => {
        let instance = new OOPack();

        instance.output('public/js/bundle.js');

        expect(instance.config.output).toEqual({ path: `${parentDirectory}/public/js`, filename: 'bundle.js' });
    });
});