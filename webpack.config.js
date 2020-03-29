const path = require('path');

module.exports = {
    entry: ['@babel/polyfill', './public/router/Router.js'],
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'public'),
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                query: {
                    presets: ["@babel/preset-env"]
                }
            }
        ]
    },
};