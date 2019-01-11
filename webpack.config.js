var webpack = require('webpack');
module.exports = {
    entry: ['./test/export/source.js'],
    output: {
        path: __dirname,
        filename: './test/export/target.js'
    },
    module: {
        loaders: [{
            test: /\.js$/,
            loader: 'babel-loader',
            exclude: /node_modules/
        }]
    }
};
