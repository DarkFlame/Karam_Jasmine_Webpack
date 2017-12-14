'use strict';
let path = require('path');
let webpack = require('webpack');


let config = {
    entry: {
        'main': path.resolve('./app')
    },
    output: {
        filename: '[name].js',
        path: path.resolve('./dist'),
        libraryTarget: 'umd'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: ['ng-annotate-loader', 'babel-loader'],
                exclude: /node_modules/
            },
            {
                test: /\.scss$/,
                use: ['style-loader', 'css-loader', 'sass-loader']
            },
            {
                test: /\.html$/,
                use: [{
                    loader: 'html-loader',
                    options: {
                        interpolate: true
                    }
                }]
            }
        ]
    },
    plugins: [],
    resolve: {
        modules: [
            path.join(__dirname, './node_modules')
        ]
    }
};


module.exports = config;