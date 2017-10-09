 var path = require('path');
 var webpack = require('webpack');

 module.exports = {
    entry: {
        main: './public/js/main.js',
        ingredients: './public/js/ingredients.js',
        results: './public/js/results.js',
        signup: './public/js/signup.js',
    },
    output: {
         path: path.resolve(__dirname, 'public/dist'),
         filename: '[name].bundle.js'
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