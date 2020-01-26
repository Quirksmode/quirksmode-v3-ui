const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');
const webpackNodeExternals = require('webpack-node-externals');

const IS_DEV = process.env.NODE_ENV !== 'production';

const config = {
  mode: IS_DEV ? 'development' : 'production',
  name: 'server',
  // Inform webpack that we're building a bundle
  // for nodeJS, rather than for the browser
  target: 'node',
  resolve: {
    alias: {
      components: path.resolve(__dirname, 'src/client/components'),
      pages: path.resolve(__dirname, 'src/client/pages'),
      assets: path.resolve(__dirname, 'src/assets'),
      icons: path.resolve(__dirname, 'src/assets/icons')
    }
  },

  // Tell webpack the root file of our
  // server application
  entry: './src/server/render-html.js',

  output: {
    libraryTarget: 'commonjs2',
    filename: 'server.js',
    path: path.resolve(__dirname, 'build')
  },

  module: {
    rules: [
      {
        test: /\.js?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        options: {
          presets: [
            '@babel/preset-env',
            '@babel/preset-react'
          ]
        }
      },
      {
        test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 50000,
            mimetype: 'application/font-woff',
            name: './fonts/[name].[ext]'
          }
        }
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'css-loader'
          },
          {
            loader: 'postcss-loader'
          }
        ]
      },
      {
        test: /\.(png|jp(e*)g|gif|svg|webp)$/,
        loaders: [
          {
            loader: 'file-loader',
            options: {
              emitFile: false
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new CopyPlugin([
      { from: path.resolve(__dirname, 'robots.txt'), to: path.resolve(__dirname, 'build/public') }
    ])
  ],
  externals: [webpackNodeExternals()]
};

module.exports = config;
