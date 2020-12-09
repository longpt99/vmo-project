const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const NodemonPlugin = require('nodemon-webpack-plugin');

module.exports = merge(common, {
  mode: 'development',
  plugins: [new NodemonPlugin({ nodeArgs: ['--inspect'] })],
  devtool: 'inline-source-map',
});
