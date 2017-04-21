const path = require('path')

const webpack = require('webpack')

const LANGS = ['en', 'ru']

module.exports = {
  entry: {
    render: path.join(__dirname, 'app', 'render.react.js')
  },

  output: {
    path: path.join(__dirname, 'build'),
    filename: '[name].js',
    libraryTarget: 'commonjs2'
  },

  target: 'node',

  node: {
    console: false,
    global: false,
    process: false,
    Buffer: false,
    __filename: false,
    __dirname: false
  },

  plugins: [
    new webpack.ProvidePlugin({ React: 'react' }),
    new webpack.DefinePlugin({
      LANGS: JSON.stringify(LANGS),
      'process.env.NODE_ENV': '"production"'
    })
  ],

  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      }
    ]
  }
}
