/* webpackを読み込みます */
const webpack = require('webpack');

module.exports = {
  entry: './src/index.jsx',
  output: {
    path: './build',
    filename: 'bundle.js',
  },
  module: {
    loaders: [
      {
        test: /\.js.$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
    ],
  },
  /* プラグインの設定 */
  plugins: [
    /* DefinePluginの実行 */
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
      },
    }),
    /* UglifyJsPluginの実行 */
    new webpack.optimize.UglifyJsPlugin(),
  ],
};
