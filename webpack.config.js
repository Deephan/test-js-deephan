const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: [
    'webpack-dev-server/client?http://localhost:5000', // WebpackDevServer host and port
    'webpack/hot/only-dev-server', // "only" prevents reload on syntax errors
    './src/client-entry.js' // app entry point
  ],
  output: {
      path: './build',
      publicPath: '/',
      filename: 'client.bundle.js',
  },
  module: {
    loaders: [
      {test: /\.jsx?$/, loaders: ['react-hot', 'babel'], include: path.join(__dirname, 'src')}
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      template: './src/index.ejs'
    })
  ],
  devServer: {
    contentBase: '/build/',
    historyApiFallback: {
      index: 'index.html',
    },
    hot: true,
    port: 5000,
    noInfo: true
  }
}
