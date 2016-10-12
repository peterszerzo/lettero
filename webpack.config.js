'use strict';

const path = require('path');
const webpack = require('webpack');
const validate = require('webpack-validator');
const postCssCssNext = require('postcss-cssnext');
const postCssImport = require('postcss-import');

const commonPlugins = [];

const prodPlugins = [
  new webpack.optimize.UglifyJsPlugin({})
];

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
        test: /\.ico$/,
        loader: 'file?name=[name].[ext]'
      },
      {
        test: /\.md/,
        loader: 'raw'
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
  plugins: commonPlugins.concat(process.env.NODE_ENV === 'production' ? prodPlugins : []),
  resolve: {
    extensions: ['', '.js', '.elm']
  },
  devtool: 'source-map'
};

module.exports = validate(config);
