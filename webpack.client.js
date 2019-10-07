const path = require('path');
const merge = require('webpack-merge');
const baseConfig = require('./webpack.base');
const MiniCSSExtractPlugin = require('mini-css-extract-plugin');
const autoprefixer = require('autoprefixer');

const CssModuleLoader = {
  loader: 'css-loader',
  options: {
    modules: true,
    localIdentName: '[local]__[hash:base64:5]',
  }
};

const postCssLoader = {
  loader: 'postcss-loader',
  options: {
    ident: 'postcss',
    plugins: () => [autoprefixer]
  }
};

const config = {
  target: 'web',
  // Tell webpack the root file of our
  // server application
  module: {
    rules: [
      {
        test: /\.module\.s(a|c)ss$/,
        use: [
          'style-loader',
          CssModuleLoader,
          postCssLoader,
          'sass-loader'
        ]
      },
      {
        test: /\.s(a|c)ss$/,
        exclude: /\.module\.s(a|c)ss$/,
        use: [
          'style-loader',
          'css-loader',
          postCssLoader,
          'sass-loader'
        ]
      },
      {
        test: /\.css$/,
        use: [MiniCSSExtractPlugin.loader, 'css-loader']
      },
      {
        test: /\.(jpg|png|svg|gif|pdf)$/,
        loader: 'file-loader',
        options: {
          name: '[path][name].[ext]'
        }
      }
    ]
  },
  entry: './src/client/client.js',

  // Tell webpack where to put the output file
  // that is generate
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'public')
  }
}

module.exports = merge.smartStrategy(
  {
    entry: 'prepend', // or 'replace'
    'module.rules': 'prepend'
  }
)(baseConfig, config);