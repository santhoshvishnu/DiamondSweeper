const webpack = require("webpack");
const process = require('process');
const path = require('path');

const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const PUBLIC_PATH='/assets/';
const OUTPUT_DIRECTORY = __dirname + `/public/${PUBLIC_PATH}`;

const BABEL_PRESET = {
  loader: 'babel-loader',
  options: {
    presets: ['es2015']
  }
};

module.exports = {
    entry: {
      'modules/app': "./app/client/app.js",
      "css/style": "./app/stylesheets/style.css"
    },
    output: {
        path: OUTPUT_DIRECTORY,
        filename: `[name].js`,
        publicPath: PUBLIC_PATH,
    },
    module: {
      rules: [
        { test: /\.jsx?$/, exclude: /node_modules/, use: BABEL_PRESET },
        { test: /\.jsx?$/, include: /node_modules\/quintype-toddy-libs/, use: BABEL_PRESET },
        { test: /\.(sass|scss|css)$/, loader: ExtractTextPlugin.extract('css-loader!sass-loader') },
        {
          test: /\.(?:png|jpg|svg)$/,
          loader: "file-loader",
          query: {
            context: './app/assets',
            name: "[name].[ext]"
          }
        }
      ]
    },
    plugins: [new ExtractTextPlugin({ filename: "[name].css", allChunks: true }),new CopyWebpackPlugin([
      { from: 'app/stylesheets/', to: 'img/',ignore: [ '*.css' ] }])]
};
