import React, { Component } from 'react'

import styles from './ControlPanel.module.css'

export default class ControlPanel extends Component {

  static propTypes = {
    onStart: React.PropTypes.func.isRequired,
    onStop: React.PropTypes.func.isRequired
  };

  render() {
    return (
      <div className={styles.controlPanel}>
        <div className={styles.left}>
        ControlPanel
        </div>
        <div className={styles.right}>
          <button onClick={this.props.onStart}>Start</button>
          <button onClick={this.props.onStop}>Stop</button>
        </div>
      </div>
    )
  }
}
