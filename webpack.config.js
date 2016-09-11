'use strict';

const path = require('path');
const validate = require('webpack-validator');
const postCssCssNext = require('postcss-cssnext');
const postCssImport = require('postcss-import');

const config = {
  entry: [
    path.join(__dirname, 'client/index.js')
  ],
  output: {
    path: path.join(__dirname, 'public'),
    publicPath: '/',
    filename: 'index.js'
  },
  module: {
    loaders: [
      {
        test: /\.js/,
        loader: 'babel'
      },
      {
        test: /\.css/,
        loader: 'style!css!postcss'
      },
      {
        test: /\.elm$/,
        loader: 'elm-webpack'
      },
      {
        test: /\.html$/,
        loader: 'file?name=[name].[ext]'
      }
    ]
  },
  postcss() {
    return [
      postCssImport(),
      postCssCssNext({
        browsers: ['ie >= 10', 'last 3 versions']
      })
    ];
  },
  resolve: {
    extensions: ['', '.js', '.elm']
  },
  devtool: 'source-map'
};

module.exports = validate(config);
