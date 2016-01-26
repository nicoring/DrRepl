import React, { Component } from 'react'
import hljs from 'highlight.js'

import { LANGS, LANG_NAME_MAPPING, JS_LANG, SCALA_LANG, PYTHON_LANG } from '../replwrappers/ReplWrapperFactory'
import ContentEditable from './editor/ContentEditable'

import styles from './Editor.module.css'
import 'highlight.js/styles/solarized-light.css'

export default class Editor extends Component {

  static propTypes = {
    lang: React.PropTypes.oneOf(LANGS).isRequired
  };

  static initialContent = {
    [JS_LANG]: "console.log('Hello World')",
    [SCALA_LANG]: 'println("Hello World!")',
    [PYTHON_LANG]: "print('Hello World!')"
  };

  constructor(props) {
    super(props)
    const content = this.getInitialContentFor(this.props.lang)
    this.state = { content }
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

  getContent() {
    return this.state.content
  }

  getInitialContentFor(lang) {
    return Editor.initialContent[lang]
  }

  highlightText(content) {
    const langName = LANG_NAME_MAPPING[this.props.lang]
    const ignoreIllegals = true
    return hljs.highlight(langName, content, ignoreIllegals).value
  }

  render() {
    const { content } = this.state
    const html = content !== undefined ? this.highlightText(content) : ''
    return (
      <ContentEditable ref="editor"
        className={styles.editor}
        onChange={this.handleTextChange.bind(this)}
        html={html} />
    )
  }
}
