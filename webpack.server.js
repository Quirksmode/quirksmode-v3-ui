const webpack = require('webpack');
const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');
const webpackNodeExternals = require('webpack-node-externals');

const IS_DEV = process.env.NODE_ENV !== 'production';

const config = {
  mode: IS_DEV ? 'development' : 'production',
  name: 'server',
  target: 'node',
  resolve: {
    alias: {
      components: path.resolve(__dirname, 'src/client/components'),
      pages: path.resolve(__dirname, 'src/client/pages'),
      assets: path.resolve(__dirname, 'src/assets'),
      icons: path.resolve(__dirname, 'src/assets/icons')
    }
  },
  entry: IS_DEV ? './src/server/render-html.js' : './src/server/index.js',
  output: {
    filename: 'server.js',
    path: path.resolve(__dirname, 'build')
  },
  module: {
    rules: [
      {
        test: /\.js?$/,
        loader: 'babel-loader'
      }
    ]
  },
  plugins: [
    new CopyPlugin([
      { from: path.resolve(__dirname, 'robots.txt'), to: path.resolve(__dirname, 'build/public') }
    ]),
    new webpack.DefinePlugin({
      __CLIENT__: false,
      __SERVER__: true,
      'typeof window': JSON.stringify('object')
    }),
    new webpack.optimize.LimitChunkCountPlugin({
      maxChunks: 1,
    })
  ],
  externals: [webpackNodeExternals()]
};

module.exports = config;
