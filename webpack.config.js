'use strict';

module.exports = {
  entry: `${__dirname}/src/index`,
  output: {
    path: 'builds',
    filename: 'bundle.js',
    publicPath: 'builds/',
  },
  module: {
    loaders: [
      {
          test:    /\.js$/,
          loader:  'babel',
          include: __dirname + '/src',
      },
      {
          test:   /\.scss$/,
          loader: 'style!css!sass',
          // Or
          // loaders: ['style', 'css', 'sass'],
      },
      {
          test:   /\.html$/,
          loader: 'html',
      }
    ],
  },
  // stats: {
  //   reasons: true,
  //   errorDetails: true
  // }
};
