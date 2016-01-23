import React, { Component } from 'react'
import styles from './Home.module.css'

import ControlPanel from './ControlPanel'
import Repl from './Repl'
import Editor from './Editor'

import { DEFAULT_LANG } from '../replwrappers/ReplWrapperFactory'

export default class Home extends Component {

  constructor(props) {
    super(props)
    this.state = { lang: DEFAULT_LANG }
  }

  onStart() {
    const text = this.refs.editor.getContent()
    this.refs.repl.loadLines(text)
  }

  onStop() {
    this.refs.repl.resetRepl()
  }

  onLangChanged(value) {
    this.setState({ lang: value })
  }

  render() {
    return (
      <div className={styles.container}>
        <div className={styles.header}>
          <ControlPanel
            onStart={this.onStart.bind(this)}
            onStop={this.onStop.bind(this)}
            onLangChanged={this.onLangChanged.bind(this)}
            lang={this.state.lang} />
        </div>
        <div className={styles.body}>
          <Editor ref="editor" lang={this.state.lang}/>
          <Repl ref="repl" lang={this.state.lang} key={this.state.lang} />
        </div>
      </div>
    )
  }
}
