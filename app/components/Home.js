import React, { Component } from 'react'
import { connect } from 'react-redux'

import styles from './Home.module.css'

import ControlPanel from './ControlPanel'
import Repl from './Repl'
import Editor from './Editor'

import { resetLines } from '../actions/repl'

import { LANGS } from '../replwrappers/ReplWrapperFactory'
import { KEY_BINDING_NAMES } from './Editor'

@connect(state => {
  return {
    lang: state.settings.lang,
    keyBinding: state.settings.keyBinding
  }
})
export default class Home extends Component {

  static propTypes = {
    dispatch: React.PropTypes.func.isRequired,
    lang: React.PropTypes.oneOf(LANGS).isRequired,
    keyBinding: React.PropTypes.oneOf(KEY_BINDING_NAMES).isRequired
  };

  constructor(props) {
    super(props)
  }

  // componentWillReceiveProps(nextProps) {
  //   if (this.props.lang !== nextProps.lang) {
  //     this.resetRepl()
  //   }
  // }

  getRepl() {
    return this.refs.repl.getWrappedInstance()
  }

  onStart() {
    this.refs.editor.save((file) => {
      this.getRepl().loadFile(file)
    })
  }

  resetRepl() {
    this.getRepl().resetRepl()
    this.props.dispatch(resetLines())
  }

  render() {
    return (
      <div className={styles.container}>
        <div className={styles.header}>
          <ControlPanel
            onStart={this.onStart.bind(this)}
            onReset={this.resetRepl.bind(this)}
            lang={this.props.lang}
            keyBinding={this.props.keyBinding}
            dispatch={this.props.dispatch} />
        </div>
        <div className={styles.body}>
          <Editor ref="editor" lang={this.props.lang} keyBinding={this.props.keyBinding} />
          <Repl ref="repl" lang={this.props.lang} key={this.props.lang} />
        </div>
      </div>
    )
  }
}
