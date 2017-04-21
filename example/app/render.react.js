const ReactDOM = require('react-dom/server')

const I18N = require('../../lib')

const App = require('../components/App')

module.exports = req => {
  let lang = req.query.lang

  if (!lang || !LANGS.includes(lang)) {
    lang = 'en'
  }

  I18N.setLang(lang)

  return `
<!doctype html>
<html>
    <head>
        <meta charset="utf-8" />
    </head>
    <body>
        <div id="app">${ReactDOM.renderToString(<App />)}</div>
        <script src="/assets/bundle_${lang}.js"></script>
    </body>
</html>
    `
}
