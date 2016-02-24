import React, { Component } from 'react'
import _ from 'lodash'

import { LANGS, LANG_NAME_MAPPING } from '../replwrappers/ReplWrapperFactory'
import { KEY_BINDINGS } from './Editor'
import { setLang, setKeybinding } from '../actions/settings'

import styles from './ControlPanel.module.css'

export default class ControlPanel extends Component {

  static propTypes = {
    onStart: React.PropTypes.func.isRequired,
    onReset: React.PropTypes.func.isRequired,
    dispatch: React.PropTypes.func.isRequired,
    lang: React.PropTypes.oneOf(LANGS).isRequired,
    keyBinding: React.PropTypes.oneOf(Object.keys(KEY_BINDINGS)).isRequired
  };

  handleLangChanged(e) {
    e.preventDefault()
    const lang = e.target.value
    this.props.dispatch(setLang(lang))
  }

  handleKeyBindingChanged(e) {
    e.preventDefault()
    const keyBinding = e.target.value
    this.props.dispatch(setKeybinding(keyBinding))
  }

  render() {
    const langs = _.map(LANG_NAME_MAPPING, (name, key) => {
      return (
        <option value={key} key={key}>{ name }</option>
      )
    })

    const keyBindings = _.map(KEY_BINDINGS, (value, key) => {
      return (
        <option value={key} key={key}>{ key }</option>
      )
    })

    return (
      <div className={styles.controlPanel}>
        <div className={styles.left}>
          <select value={this.props.keyBinding} onChange={this.handleKeyBindingChanged.bind(this)}>
            { keyBindings }
          </select>
        </div>
        <div className={styles.right}>
          <button onClick={this.props.onStart}>Run</button>
          <button onClick={this.props.onReset}>Reset</button>
          <select value={this.props.lang} onChange={this.handleLangChanged.bind(this)}>
            { langs }
          </select>
        </div>
      </div>
    )
  }
}
