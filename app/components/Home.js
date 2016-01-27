import React, { Component } from 'react'
import styles from './Home.module.css'

import ControlPanel from './ControlPanel'
import Repl from './Repl'
import Editor from './Editor'

import { DEFAULT_LANG } from '../replwrappers/ReplWrapperFactory'
import { DEFAULT_KEY_BINDING } from './Editor'

export default class Home extends Component {

  constructor(props) {
    super(props)
    this.state = {
      lang: DEFAULT_LANG,
      keyBinding: DEFAULT_KEY_BINDING
    }
  }

  onStart() {
    this.refs.editor.save((file) => {
      this.refs.repl.loadFile(file)
    })
  }

  onReset() {
    this.refs.repl.resetRepl()
  }

  onLangChanged(value) {
    this.setState({ lang: value })
  }

  onKeyBindingChanged(value) {
    this.setState({ keyBinding: value })
  }

  render() {
    return (
      <div className={styles.container}>
        <div className={styles.header}>
          <ControlPanel
            onStart={this.onStart.bind(this)}
            onReset={this.onReset.bind(this)}
            onLangChanged={this.onLangChanged.bind(this)}
            lang={this.state.lang}
            onKeyBindingChanged={this.onKeyBindingChanged.bind(this)}
            keyBinding={this.state.keyBinding} />
        </div>
        <div className={styles.body}>
          <Editor ref="editor" lang={this.state.lang} keyBinding={this.state.keyBinding} />
          <Repl ref="repl" lang={this.state.lang} key={this.state.lang} />
        </div>
      </div>
    )
  }
}
