import React, { Component } from 'react';

export default class ReplInput extends Component {

  static propTypes = {
    content: React.PropTypes.string,
  };

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="repl-input">&gt; {this.props.content}</div>
    );
  }
}
