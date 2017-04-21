const { Component } = require('react')

const t = require('./i18n')

class Counter extends Component {
  constructor (...args) {
    super(...args)

    this.handleClick = this.handleClick.bind(this)

    this.state = {
      clicks: 0
    }
  }

  handleClick () {
    this.setState({
      clicks: this.state.clicks + 1
    })
  }

  render () {
    return (
      <div onClick={this.handleClick}>{t('click_count', this.state.clicks)}</div>
    )
  }
};

module.exports = Counter
