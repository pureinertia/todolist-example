const path = require('path');
const url = require('url');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  module: {
    rules: [
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/,
        exclude: [/node_modules/, /vendor/],
        use: ['file-loader'],
      },
      {
        test: /\.scss$/,
        exclude: [/node_modules/, /vendor/],
        use: [
          'style-loader',
          'css-loader',
          'sass-loader',
        ],
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        test: /\.js$/,
        exclude: [/node_modules/, /vendor/],
        enforce: 'pre',
        use: 'eslint-loader',
      },
    ],
  },
  devServer: {
    publicPath: '/',
    historyApiFallback: true,
    hot: true,
    stats: 'errors-only',
    port: 8080,
    overlay: {
      errors: true,
      warnings: false,
    },
    disableHostCheck: true,
    proxy: {
      api: {
        bypass: (req) => {
          const { pathname } = url.parse(req.url);
          return `mocks${pathname}.json`;
        },
      },
    },
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
    }),
  ],
};
