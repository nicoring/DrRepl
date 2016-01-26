import React, { Component } from 'react'
import _ from 'lodash'

import { LANGS, LANG_NAME_MAPPING } from '../replwrappers/ReplWrapperFactory'

import styles from './ControlPanel.module.css'

export default class ControlPanel extends Component {

  static propTypes = {
    onStart: React.PropTypes.func.isRequired,
    onReset: React.PropTypes.func.isRequired,
    onLangChanged: React.PropTypes.func.isRequired,
    lang: React.PropTypes.oneOf(LANGS).isRequired
  };

  handleLangChanged(e) {
    e.preventDefault()
    const lang = e.target.value
    this.props.onLangChanged(lang)
  }

  render() {
    const langs = _.map(LANG_NAME_MAPPING, (name, key) => {
      return (
        <option value={key} key={key}>{ name }</option>
      )
    })

    return (
      <div className={styles.controlPanel}>
        <div className={styles.left}>
        ControlPanel
        </div>
        <div className={styles.right}>
          <button onClick={this.props.onStart}>Start</button>
          <button onClick={this.props.onReset}>Reset</button>
          <select value={this.props.lang} onChange={this.handleLangChanged.bind(this)}>
            { langs }
          </select>
        </div>
      </div>
    )
  }
}
