const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const manifest = require('../../dist/dll/vendors-manifest.json');

module.exports = {
  entry: './startup/index.jsx',
  output: {
    filename: 'startup.bundle.js',
    path: path.resolve(__dirname, '../../dist/app')
  },
  devtool: 'inline-source-map',
  resolve: {
    extensions: ['.js', '.jsx'],
    alias: {
      connector: path.resolve(__dirname, '../../modules/app/components/connector.jsx'),
      components: path.resolve(__dirname, '../../modules/app/components/barrel.generated.js'),
      domain: path.resolve(__dirname, '../../modules/app/state'),
      services: path.resolve(__dirname, '../../modules/app/state/api'),
      core: path.resolve(__dirname, '../../modules/core'),
      '@styles': path.resolve(__dirname,'../../styles/sass')
    }
  },
  module: {
    loaders: [
      {
        test: /\.(js|jsx)$/,
        loader: 'babel-loader',
        exclude: '/node_modules',
        query: {
          presets: ['es2015', 'react'],
          plugins: ['transform-object-rest-spread']
        }
      },
      {
        test: /\.scss$/,
        loaders: ['style-loader', 'css-loader', 'sass-loader'],
        exclude: '/node_modules'
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2)$/,
        loader: 'file-loader?name=fonts/font-[name].[ext]&outputPath=dist/app/'
      }
    ]
  },
  watchOptions: {
    poll: true
  },
  plugins: [
    new webpack.DllReferencePlugin({ context: '.', manifest }),
    new webpack.NoEmitOnErrorsPlugin(),
    new ExtractTextPlugin('site.css')
  ]
};
