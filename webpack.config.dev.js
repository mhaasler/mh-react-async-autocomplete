const webpack = require('webpack');
const common = require('./webpack.config.common');

const devConfig = Object.assign({}, common, {
  entry:   [
    'eventsource-polyfill',
    'webpack-hot-middleware/client',
    './src/main.js'
  ],
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ]
});

module.exports = devConfig;
