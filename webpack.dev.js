const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const webpack = require('webpack');

module.exports = merge(common, {
    devtool: "inline-source-map",
    devServer: {
        contentBase: './',
        compress: true,
        host: '127.0.0.1',
        port: '40001',
        hot: true,
        inline: true,
        historyApiFallback: true,
        watchOptions: {
            poll: true,
            ignored: /node_modules/,
            aggregateTimeout: 300
        }
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NamedModulesPlugin()
    ],
    mode: 'development'
});
