const path = require('path');
const webpack = require('webpack');
const TerserPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const { getIfUtils, removeEmpty } = require('webpack-config-utils');
const workboxPlugin = require('workbox-webpack-plugin');
const Dotenv = require('dotenv-webpack');
const ManifestPlugin = require('webpack-manifest-plugin');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const LoadablePlugin = require('@loadable/webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const { ifProduction, ifNotProduction } = getIfUtils(process.env.NODE_ENV);
const IS_DEV = process.env.NODE_ENV !== 'production';
const DEBUG = process.env.DEBUG || false;

const config = {
  mode: IS_DEV ? 'development' : 'production',
  name: 'client',
  devtool: IS_DEV ? 'eval-source-map' : false,
  resolve: {
    modules: ['src', 'node_modules'],
    descriptionFiles: ['package.json'],
    alias: {
      components: path.resolve(__dirname, 'src/client/components'),
      pages: path.resolve(__dirname, 'src/client/pages'),
      assets: path.resolve(__dirname, 'src/assets'),
      icons: path.resolve(__dirname, 'src/assets/icons'),
      'react-dom': '@hot-loader/react-dom'
    }
  },
  cache: IS_DEV,
  node: {
    fs: 'empty',
    vm: 'empty',
    net: 'empty',
    tls: 'empty'
  },
  entry: IS_DEV ? [
    'webpack-hot-middleware/client?reload=true',
    path.resolve(__dirname, './src/client/index.js')
  ] : path.resolve(__dirname, './src/client/index.js'),
  output: {
    filename: IS_DEV ? '[name].js' : '[name].[chunkhash:8].js',
    chunkFilename: IS_DEV ? '[id].js' : '[id].[chunkhash:8].js',
    path: path.resolve(__dirname, 'build/public'),
    publicPath: '/'
  },
  optimization: {
    minimizer: [
      new TerserPlugin({
        cache: true,
        parallel: true,
        sourceMap: IS_DEV || DEBUG,
        terserOptions: {
          compress: !IS_DEV && !DEBUG,
          mangle: !IS_DEV && !DEBUG,
          output: {
            beautify: IS_DEV || DEBUG,
            comments: /@license/i
          }
        },
        extractComments: true
      }),
      new OptimizeCSSAssetsPlugin({})
    ],
    splitChunks: {
      // Auto split vendor modules in production only
      chunks: IS_DEV ? 'async' : 'all'
    }
  },
  plugins: removeEmpty([
    new ManifestPlugin({
      fileName: path.resolve(process.cwd(), 'build/public/webpack-assets.json'),
      filter: file => file.isInitial
    }),
    new LoadablePlugin({
      writeToDisk: true,
      filename: 'loadable-stats.json'
    }),
    // Setup enviorment variables for client
    new webpack.EnvironmentPlugin({ NODE_ENV: JSON.stringify(process.env.NODE_ENV) }),
    // Setup global variables for client
    new webpack.DefinePlugin({
      __CLIENT__: true,
      __SERVER__: false,
      __DEV__: IS_DEV
    }),
    new MiniCssExtractPlugin({
      filename: IS_DEV ? '[name].css' : '[name].[contenthash:8].css',
      chunkFilename: IS_DEV ? '[id].css' : '[id].[contenthash:8].css'
    }),
    new Dotenv(),
    new workboxPlugin.InjectManifest({
      swSrc: './src/sw.js',
      swDest: 'sw.js'
    }),
    new CopyWebpackPlugin([
      { from: path.resolve(__dirname, 'src/assets/img/favicon'), to: path.resolve(__dirname, 'build/public/img/favicon') }
    ]),
    ifNotProduction(new webpack.HotModuleReplacementPlugin()),
    ifNotProduction(new FriendlyErrorsWebpackPlugin()),
    ifProduction(new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: [path.resolve(__dirname, 'build')]
    })),
    ifProduction(new webpack.HashedModuleIdsPlugin()),
    ifProduction(new CompressionPlugin({
      test: /\.(js|css|html)$/,
      threshold: 10240
    })),
    ifProduction(
      // Visualize all of the webpack bundles
      new BundleAnalyzerPlugin({
        analyzerMode: process.env.NODE_ENV === 'analyze' ? 'server' : 'disabled'
      })
    )
  ]),

  module: {
    rules: [
      {
        test: /\.js(x)?$/,
        loader: 'babel-loader',
        exclude: [/node_modules\/(?!(swiper|dom7)\/).*/, /\.test\.js(x)?$/],
        options: {
          cacheDirectory: IS_DEV,
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
        test: /\.(sa|sc|c)ss$/,
        use: [
          { loader: 'css-hot-loader' },
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              hmr: IS_DEV,
              // If hmr does not work, this is a forceful method
              reloadAll: true
            }
          },
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
              sourceMap: true
            }
          },
          { loader: 'postcss-loader', options: { sourceMap: true } }
        ]
      },
      {
        test: /\.(png|jp(e*)g|gif|svg|webp)$/,
        loaders: [
          {
            loader: 'file-loader',
            options: {
              name: 'img/[name].[hash].[ext]'
            }
          },
          'img-loader'
        ]
      }
    ]
  },
};

module.exports = config;
