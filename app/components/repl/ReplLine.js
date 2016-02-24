import React, { Component } from 'react'

import highlight from '../../utils/highlight'
import Editor from '../Editor'

export default class ReplLine extends Component {

  static propTypes = {
    content: React.PropTypes.string.isRequired,
    lang: React.PropTypes.string.isRequired
  };

  constructor(props) {
    super(props)
  }

  getClassName() {
    throw new Error('Subclass responsibility')
  }

  getContent() {
    throw new Error('Subclass responsibility')
  }

  render() {
    const content = highlight(this.getContent(), Editor.ACE_LANG_MAPPING[this.props.lang])
    return (
      <div>
        <style>{content.css}</style>
        <div className={this.getClassName()} dangerouslySetInnerHTML={{ __html: content.html }}></div>
      </div>
    )
  }
}
