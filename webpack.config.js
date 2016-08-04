'use strict';

module.exports = {
  entry: './src',
  output: {
    path: 'builds',
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.js/,
        loader: 'babel',
        // Using include will make sure that babel doesn't get run on third party plugins like jQuery
        include: __dirname + '/src',
      }
    ],
  }
};
