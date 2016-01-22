import React, { Component } from 'react'
import styles from './Home.module.css'

import ControlPanel from './ControlPanel'
import Repl from './Repl'
import Editor from './Editor'

export default class Home extends Component {

  onStart() {
    const text = this.refs.editor.getContent()
    this.refs.repl.loadLines(text)
  }

  onStop() {
    this.refs.repl.resetRepl()
  }

  render() {
    return (
      <div className={styles.container}>
        <div className={styles.header}>
          <ControlPanel onStart={this.onStart.bind(this)} onStop={this.onStop.bind(this)}/>
        </div>
        <div className={styles.body}>
          <Editor ref="editor"/>
          <Repl ref="repl"/>
        </div>
      </div>
    )
  }
}
