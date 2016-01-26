import React, { Component } from 'react'
import fs from 'fs'

import { LANGS, JS_LANG, SCALA_LANG, PYTHON_LANG } from '../replwrappers/ReplWrapperFactory'

import styles from './Editor.module.css'

export default class Editor extends Component {

  static propTypes = {
    lang: React.PropTypes.oneOf(LANGS).isRequired
  };

  static FILE_PATH_PREFIX = '/tmp/dr-repl/';
  static FILE_NAME = 'dr-repl-tmp-file';

  static initialContent = {
    [JS_LANG]: "console.log('Hello World')",
    [SCALA_LANG]: 'println("Hello World!")',
    [PYTHON_LANG]: "print('Hello World!')"
  };

  constructor(props) {
    super(props)
    this.createDir(Editor.FILE_PATH_PREFIX)
    this.state = { content: this.getInitialContentFor(this.props.lang) }
  }

  save(cb) {
    const file = Editor.FILE_PATH_PREFIX + Editor.FILE_NAME
    fs.writeFile(file, this.getContent(), (err) => {
      if (err) {
        console.error(err)
      }
      cb(file)
    })
  }

  createDir(dirPath) {
    try {
      fs.mkdirSync(dirPath)
    } catch (e) {
      if (e.code !== 'EEXIST') throw e
    }
  }

  handleTextChange(e) {
    e.preventDefault()
    const content = e.target.innerText
    this.setState({ content })
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.lang !== nextProps.lang) {
      const content = this.getInitialContentFor(nextProps.lang)
      this.setState({ content })
    }
  }

  getInitialContentFor(lang) {
    return Editor.initialContent[lang]
  }

  getContent() {
    return this.refs.editor.innerText
  }

  render() {
    return (
      <div ref="editor"
        className={styles.editor}
        contentEditable={true}
        onKeyUp={this.handleTextChange.bind(this)}>
          { this.state.content }
      </div>
    )
  }
}
