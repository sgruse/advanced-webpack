'use strict';

var webpack = require('webpack');
var CleanPlugin = require('clean-webpack-plugin');
var ExtractPlugin = require('extract-text-webpack-plugin');
var production = process.env.NODE_ENV === 'production';

var plugins = [
    new ExtractPlugin('bundle.css'),
    new CleanPlugin('builds'),
    new webpack.DefinePlugin({
      __SERVER__:      !production,
      __DEVELOPMENT__: !production,
      __DEVTOOLS__:    !production,
      'process.env':   {
        BABEL_ENV: JSON.stringify(process.env.NODE_ENV)
      }
    }),
    new webpack.optimize.CommonsChunkPlugin({
        name:      'main', // Move dependencies to our main file
        children:  true, // Look for common dependencies in all children,
        minChunks: 2 // How many times a dependency must come up before being extracted
    }),
  ];

if (production) {
  plugins = plugins.concat([
    new webpack.optimize.DedupePlugin(),
    // new webpack.optimize.OccurenceOrderPlugin()
    // new webpack.optimize.MinChunkSizePlugin({
    //   minChunkSize: 51200, // ~50kb
    // }),
    // new webpack.optimize.UglifyJsPlugin({
    //   mangle:   true,
    //   compress: {
    //     warnings: false, // Suppress uglification warnings
    //   },
    // }),
    // new webpack.DefinePlugin({
    //   __SERVER__:      !production,
    //   __DEVELOPMENT__: !production,
    //   __DEVTOOLS__:    !production,
    //   'process.env':   {
    //     BABEL_ENV: JSON.stringify(process.env.NODE_ENV),
    //   },
    // }),
  ])
}

module.exports = {
  debug:   !production,
  devtool: production ? false : 'eval',
  entry: `${__dirname}/src/index`,
  output: {
    path: 'builds',
    filename: production ? '[name]-[hash].js' : 'bundle.js',
    chunkFilename: '[name]-[chunkhash].js',
    publicPath: 'builds/'
  },
  plugins: plugins,

  module: {
    loaders: [
      // zoolander
      {
          test: /\.scss$/,
          loader: ExtractPlugin.extract('style', 'css!sass', { allChunks: true })
      },
      {
          test:    /\.js$/,
          loader:  'babel',
          include: __dirname + '/src'
      },
      // {
      //     test:   /\.scss$/,
      //     loader: 'style!css!sass',
      //     // loader: ExtractPlugin.extract('style', 'css!sass'),
      //     // Or
      //     // loaders: ['style', 'css', 'sass'],
      // },
      {
          test: /\.(png|gif|jpe?g|svg)$/i,
          loader: 'url?limit=10000'
      },
      // {
      //     test:   /\.(png|gif|jpe?g|svg)$/i,
      //     loader: 'url',
      //     query: {
      //     limit: 10000,
      //   }
      // },
      {
          test:   /\.html$/,
          loader: 'html'
      }
    ]
  }
  // stats: {
  //   reasons: true,
  //   errorDetails: true
  // }
};
