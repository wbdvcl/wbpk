module.exports = {
    entry: './resources/js/app.js',
    module: {
        loaders: [
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            }
        ]
    }
};