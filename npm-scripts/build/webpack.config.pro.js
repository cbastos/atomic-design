const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const webpack = require('webpack');
const cssNano = require('cssnano');
const webpackMerge = require('webpack-merge');
const webpackConfigDev = require('./webpack.config.dev.js');

const plugins = [
    new webpack.optimize.UglifyJsPlugin({
        beautify: false,
        mangle: { screw_ie8: true, keep_fnames: true },
        compress: { screw_ie8: true },
        comments: false
    }),
    new OptimizeCssAssetsPlugin({
        cssProcessor: cssNano,
        cssProcessorOptions: { discardComments: { removeAll: true } },
        canPrint: true
    }),
    new webpack.DefinePlugin({
        'process.env': {
            NODE_ENV: JSON.stringify('production')
        }
    })
];

module.exports = () => webpackMerge(webpackConfigDev, { plugins });
