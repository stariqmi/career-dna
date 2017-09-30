 var path = require('path');
 var webpack = require('webpack');

 module.exports = {
     entry: './public/js/main.js',
     output: {
         path: path.resolve(__dirname, 'public/dist'),
         filename: 'main.bundle.js'
     },
     module: {
         loaders: [
             {
                 test: /\.js$/,
                 loader: 'babel-loader',
                 query: {
                     presets: ['es2015']
                 }
             }
         ]
     },
     stats: {
         colors: true
     },
     devtool: 'source-map'
 };