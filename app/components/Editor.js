import React, { Component } from 'react'
import AceEditor from 'react-ace'
import fs from 'fs'

import { LANGS, JS_LANG, SCALA_LANG, PYTHON_LANG } from '../replwrappers/ReplWrapperFactory'

import styles from './Editor.module.css'

import 'brace/mode/javascript'
import 'brace/mode/python'
import 'brace/mode/scala'

import 'brace/theme/github'


export default class Editor extends Component {

  static propTypes = {
    lang: React.PropTypes.oneOf(LANGS).isRequired
  };

  static FILE_PATH_PREFIX = '/tmp/dr-repl/';
  static FILE_NAME = 'dr-repl-tmp-file';

  static INITIAL_CONTENT = {
    [JS_LANG]: `console.log('Hello World')`,
    [SCALA_LANG]: `println("Hello World!")`,
    [PYTHON_LANG]: `print('Hello World!')`
  };

  static ACE_LANG_MAPPING = {
    [JS_LANG]: 'javascript',
    [PYTHON_LANG]: 'python',
    [SCALA_LANG]: 'scala'
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

  handleTextChange(content) {
    this.setState({ content })
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.lang !== nextProps.lang) {
      const content = this.getInitialContentFor(nextProps.lang)
      this.setState({ content })
    }
  }

  getInitialContentFor(lang) {
    return Editor.INITIAL_CONTENT[lang]
  }

  getContent() {
    return this.state.content
  }

  render() {
    const mode = Editor.ACE_LANG_MAPPING[this.props.lang]
    return (
      <div className={styles.editor}>
        <AceEditor name="dr-repl-editor"
          mode={mode}
          theme="github"
          value={this.state.content}
          onChange={this.handleTextChange.bind(this)}
          height="100%"
          width="100%" />
      </div>
    )
  }
}
