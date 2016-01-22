import React, { Component } from 'react'
import styles from './ReplActiveInput.module.css'


export default class ReplActiveInput extends Component {

  static propTypes = {
    replInput: React.PropTypes.object.isRequired,
    commandHistory: React.PropTypes.arrayOf(React.PropTypes.string)
  };

  constructor(props) {
    super(props)

    this.state = {
      historyPosition: -1,
      lastWrittenLine: '',
      isInHistoryMode: false
    }
  }

  onKeyDown(e) {
    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault()
        this.goDownInHistory()
        break
      case 'ArrowUp':
        e.preventDefault()
        this.goUpInHistory()
        break
      case 'Enter':
        e.preventDefault()
        const text = e.target.innerText
        this.props.replInput.onNext(text)
        e.target.innerText = ''
        break
      default:

    }
  }

  setInput(line) {
    const input = this.refs.replInput
    input.innerText = line
    // input.selectionStart = input.selectionEnd = line.length - 1
    // console.log('line: ', line)
    // console.log("sel: ", line.length - 1)
  }

  goUpInHistory() {
    let position = this.state.historyPosition
    const { commandHistory } = this.props

    if (position === -1) {
      this.setState({ lastWrittenLine: this.refs.replInput.innerText })
    }

    if (position < commandHistory.length - 1) {
      position += 1
      this.setInput(commandHistory[position])
    }
    this.setState({ historyPosition: position })
  }

  goDownInHistory() {
    let position = this.state.historyPosition
    const { commandHistory } = this.props
    if (position > 0) {
      position -= 1
      this.setInput(commandHistory[position])
    } else if (position === 0) {
      position -= 1
      this.setInput(this.state.lastWrittenLine)
    }
    this.setState({ historyPosition: position })
  }

  focusInput() {
    this.refs.replInput.focus()
  }

  render() {
    return (
      <div className={styles.container}>
        <div>&gt; </div>
        <div ref="replInput"
          className={styles.replActiveInput}
          contentEditable={true}
          onKeyDown={this.onKeyDown.bind(this)} >
        </div>
      </div>
    )
  }
}
