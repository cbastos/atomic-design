const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const webpackConfigDev = require('./webpack.dll.dev.js');

const plugins = [new webpack.optimize.UglifyJsPlugin()];

module.exports = () => webpackMerge(webpackConfigDev, { plugins });
