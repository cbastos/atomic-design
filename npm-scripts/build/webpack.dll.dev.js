const path = require('path');
const webpack = require('webpack');

module.exports = {
    entry: {
        vendors: [path.join(__dirname, 'vendors.js')]
    },
    output: {
        path: path.join(__dirname, '../../dist/app'),
        filename: '[name].dll.js',
        library: '[name]'
    },
    plugins: [
        new webpack.DllPlugin({
            path: path.join('dist/dll', '[name]-manifest.json'),
            name: '[name]'
        }),
        new webpack.optimize.OccurrenceOrderPlugin()
    ]
};
