const path = require('path');
const webpack = require('webpack');
const postcssCustomProperties = require('postcss-custom-properties');

module.exports = {
  mode: 'development',
  context: __dirname,
  entry: ['./client', './main.js'],
  output: {
    path: path.resolve(__dirname, '/public'),
    filename: 'js/main.js',
    publicPath: '/',
  },
  devtool: '#source-map',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader', // translates CSS into CommonJS
            options: {
              url: false,
              sourceMaps: true,
              importLoaders: 1,
              minimize: true,
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              ident: 'postcss',
              plugins: () => [postcssCustomProperties()],
            },
          },
          {
            loader: 'sass-loader', // compiles Sass to CSS
          },
        ],
      },
    ],
  },
  plugins: [new webpack.HotModuleReplacementPlugin(), new webpack.NoEmitOnErrorsPlugin()],
};
