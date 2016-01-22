import React, { Component } from 'react'

import styles from './Editor.module.css'

export default class Editor extends Component {

  getContent() {
    return this.refs.editor.innerText
  }

  render() {
    return (
      <div ref="editor"
        className={styles.editor}
        contentEditable={true} >
        Edit me!
      </div>
    )
  }
}
