const path = require('path');
const merge = require('webpack-merge');
const baseConfig = require('./webpack.base.js');
const webpackNodeExternals = require('webpack-node-externals');

const config = {
  // Inform webpack to build a bundle for Node, rather than for the browser
  target: 'node',

  // root file of the server application
  entry: './src/index.js',

  // path for files that will be generated
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'build')
  },

  // anything that is already included in the node_modules will not be included in the server side bundle
  // optimizes server startup time since node can require node modules at runtime
  externals: [webpackNodeExternals()]
};

module.exports = merge(baseConfig, config);
