const path = require('path');
const nodeExternals = require('webpack-node-externals');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
  entry: { app: './server.js' },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.js?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
    ],
  },
  target: 'node',
  externals: [nodeExternals()],
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        parallel: true,
        cache: true,
      }),
    ],
  },
  plugins: [new CleanWebpackPlugin()],
  resolve: {
    extensions: ['.js'],
  },
};
