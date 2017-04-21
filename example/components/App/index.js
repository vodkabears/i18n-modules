const { Component } = require('react')

const Counter = require('../Counter')

const t = require('./i18n')

class App extends Component {
  render () {
    return (
      <div>
        <h1>{t('hello_world')}</h1>
        <Counter />
      </div>
    )
  }
};

module.exports = App
