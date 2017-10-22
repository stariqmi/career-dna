 var path = require('path');
 var webpack = require('webpack');

 module.exports = {
    entry: {
        main: './public/js/main.js',
        ingredients: './public/js/ingredients.js',
        results: './public/js/results.js',
        signup: './public/js/signup.js',
        login: './public/js/login.js',
        post_job: './public/js/post_job.js',
        edit_draft: './public/js/edit_draft.js',
        matches: './public/js/matches.js',
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