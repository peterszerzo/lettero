'use strict'

const path = require('path')
const webpack = require('webpack')
const validate = require('webpack-validator')
const postCssCssNext = require('postcss-cssnext')
const dotenv = require('dotenv')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const FaviconsWebpackPlugin = require('favicons-webpack-plugin')
const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin')

dotenv.load()

const isDev = process.env.NODE_ENV === 'development'

const commonPlugins = [
  new webpack.DefinePlugin({
    'process.env.FIREBASE_API_KEY': `"${process.env.FIREBASE_API_KEY}"`,
    'process.env.FIREBASE_AUTH_DOMAIN': `"${process.env.FIREBASE_AUTH_DOMAIN}"`,
    'process.env.FIREBASE_DATABASE_URL': `"${process.env.FIREBASE_DATABASE_URL}"`,
    'process.env.FIREBASE_STORAGE_BUCKET': `"${process.env.FIREBASE_STORAGE_BUCKET}"`,
    'process.env.FIREBASE_MESSAGING_SENDER_ID': `"${process.env.FIREBASE_MESSAGING_SENDER_ID}"`
  }),
  new HtmlWebpackPlugin({
    template: './src/index.html',
    inject: true,
    hash: true
  }),
  new ExtractTextWebpackPlugin('styles.css')
]

const prodPlugins = [
  new webpack.optimize.UglifyJsPlugin({}),
  new FaviconsWebpackPlugin({
    logo: './src/favicon.png',
    inject: true
  })
]

const config = {
  entry: [
    path.join(__dirname, 'src/index.js')
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    publicPath: '/',
    filename: 'index.js'
  },
  module: {
    loaders: [
      {
        test: /\.js/,
        loader: 'babel',
        exclude: /node_modules/
      },
      {
        test: /\.css/,
        loader: ExtractTextWebpackPlugin.extract('style', 'css-loader!postcss-loader')
      },
      {
        test: /\.elm$/,
        loader: isDev ? 'elm-webpack?debug=true' : 'elm-webpack'
      }
    ]
  },
  postcss () {
    return [
      postCssCssNext({
        browsers: ['ie >= 10', 'last 3 versions']
      })
    ]
  },
  plugins: commonPlugins.concat(isDev ? [] : prodPlugins),
  resolve: {
    extensions: ['', '.js', '.elm']
  },
  devtool: 'source-map'
}

module.exports = validate(config)
