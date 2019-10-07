const path = require('path');
const merge = require('webpack-merge');
const baseConfig = require('./webpack.base');
const webpackNodeExternals = require('webpack-node-externals');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const autoprefixer = require('autoprefixer');

const CssModuleLoader = {
  loader: 'css-loader',
  options: {
    modules: true,
    localIdentName: '[local]__[hash:base64:5]',
    exportOnlyLocals: true
  }
};

const CssLoader = {
  loader: 'css-loader',
  options: {
    localIdentName: '[local]__[hash:base64:5]',
    exportOnlyLocals: true
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
  // Inform webpack that we're building a bundle
  // For nodeJS, rather then for the browser
  target: 'node',
  module: {
    rules: [
      {
        test: /\.module\.s(a|c)ss$/,
        use: [
          CssModuleLoader,
          postCssLoader,
          'sass-loader'
        ]
      },
      {
        test: /\.css$/,
        use: [{
          loader: MiniCssExtractPlugin.loader,
          options: {
            hmr: process.env.NODE_ENV === 'development',
          },
        }, 'css-loader']
      },
      {
        test: /\.s(a|c)ss$/,
        exclude: /\.module\.s(a|c)ss$/,
        use: [
          CssLoader,
          postCssLoader,
          'sass-loader'
        ]
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
  // Tell webpack the root file of our
  // server application
  entry: './src/index.js',
  // Tell webpack where to put the output file
  // that is generate
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'build')
  },

  externals: [webpackNodeExternals()]
}

module.exports = merge.smartStrategy(
  {
    entry: 'prepend', // or 'replace'
    'module.rules': 'prepend'
  }
)(baseConfig, config);