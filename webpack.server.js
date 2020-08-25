import webpack  from 'webpack';
import path from 'path';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import webpackNodeExternals from 'webpack-node-externals';

const IS_DEV = process.env.NODE_ENV !== 'production';

export default {
  mode: IS_DEV ? 'development' : 'production',
  name: 'server',
  target: 'node',
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
    alias: {
      client: path.resolve(__dirname, 'src/client'),
      components: path.resolve(__dirname, 'src/client/components'),
      pages: path.resolve(__dirname, 'src/client/pages'),
      hooks: path.resolve(__dirname, 'src/client/hooks'),
      utils: path.resolve(__dirname, 'src/client/utils'),
      assets: path.resolve(__dirname, 'src/assets'),
      icons: path.resolve(__dirname, 'src/assets/icons'),
      types: path.resolve(__dirname, 'src/types')
    }
  },
  entry: IS_DEV ? './src/server/react/renderHtml.tsx' : './src/server/index.ts',
  output: {
    libraryTarget: 'commonjs2',
    filename: 'server.js',
    path: path.resolve(__dirname, 'build')
  },
  module: {
    rules: [
      {
        test: /\.(t|j)sx?$/,
        loader: 'babel-loader'
      },
      {
        test: /\.svg$/,
        use: ['@svgr/webpack']
      }
    ]
  },
  plugins: [
    new CopyWebpackPlugin(
      {
        patterns: [
          { from: path.resolve(__dirname, 'robots.txt'), to: path.resolve(__dirname, 'build/public') }
        ]
      }
    ),
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
