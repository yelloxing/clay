const path = require('path');

module.exports = {
    entry: ['./src/main.js'],
    output: {
        path: __dirname,
        filename: 'build/main.js'
    },
    module: {
        rules: [{
            test: /\.js$/,
            exclude: /node_modules/,
            loader: "babel-loader"
        }, {
            test: /\.(css|scss)$/,
            use: ['style-loader','css-loader', 'postcss-loader', 'sass-loader']
        }, {
            test: /\.(png|jpg|jpeg|gif|bmp)$/,
            use: [{
                loader: "url-loader",
                options: {
                    name: "build/[path][name].[ext]",
                    context: "src/asset",
                    limit: 7000
                }
            }]
        }]
    }
};
