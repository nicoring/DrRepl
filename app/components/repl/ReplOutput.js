import React, { Component } from 'react'

export default class ReplOutput extends Component {

  static propTypes = {
    content: React.PropTypes.string
  };

  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className="repl-output">{this.props.content}</div>
    )
  }
}
