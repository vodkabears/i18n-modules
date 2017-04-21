const path = require('path')

const webpack = require('webpack')

const LANGS = ['en', 'ru']

module.exports = LANGS.map(lang => ({
  entry: {
    [lang]: path.join(__dirname, 'components')
  },

  output: {
    path: path.join(__dirname, 'build', 'assets'),
    filename: 'bundle_[name].js'
  },

  plugins: [
    new webpack.ProvidePlugin({ React: 'react' }),
    new webpack.IgnorePlugin(new RegExp(`^./(?!${lang}$)`), /i18n$/),
    new webpack.DefinePlugin({
      LANGS: JSON.stringify(LANGS),
      BUNDLE_LANG: JSON.stringify(lang),
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
}))
