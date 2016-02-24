import React, { Component, PropTypes } from 'react'

export default class App extends Component {
  static propTypes = {
    children: PropTypes.element.isRequired
  };

  render() {
    let devTools
    if (process.env.NODE_ENV !== 'production') {
      const DevTools = require('./DevTools')
      devTools = <DevTools />
    }

    return (
      <div>
        {this.props.children}
        {devTools}
      </div>
    )
  }
}
