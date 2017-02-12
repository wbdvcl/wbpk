# WBPK

Use webpack in a more programatic way.

# Usage

Create a `wbpk.js` file in your root directory.

```js
// wbpk.js
import wbpk from 'wbpk';

const wbpk = new wbpk();

wbpk
.entry(`${__dirname}/src/app.js`)
.output(`${__dirname}/dist/bundle.js`)
.loaders([
    {
        test: /\.js$/,
        loader: 'babel-loader'
    }
])
.run(); // can also use .watch()
```

Then run `wbpk` to build / watch.

# API

## `.config(config: object|string)`

Load a pre-exisitng webpack config. Can be an object or a path to a `webpack.config.js`.

## `.entry(path: string|array)`

Your entry point. Can be a string or an array of file paths. All files must be absolute (append `__dirname`).

## `.output(path: string)`

Your files destination. Pass the whole filepath to where you want your build to go, including the filename and extension.

## `.loaders(loaders: object[]`)

What loaders to use. Right now these should be the same as you would pass to your webpack config. Know of a way to make this more user-friendly? [Submit an issue or pull request]().

## `.run()`

Executes webpack to build based off of your config.

## `.watch(opts: object)`

Tells webpack to watch for changes based on your config. All valid webpack `watch` config options can be passed here.