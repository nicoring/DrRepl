import React, { Component } from 'react'
import styles from './Repl.module.css'
import Rx from 'rx'
import update from 'react-addons-update'

import ReplProcessWrapper from '../utils/ReplProcessWrapper'

import ReplActiveInput from './repl/ReplActiveInput'
import ReplOutput from './repl/ReplOutput'
import ReplInput from './repl/ReplInput'

export default class Repl extends Component {

  static TYPE_OUTPUT = 1;
  static TYPE_INPUT = 2;
  static BUFFER_SIZE = 100;

  constructor(props) {
    super(props)

    this.replInput = new Rx.ReplaySubject(Repl.BUFFER_SIZE)
    this.replWrapper = new ReplProcessWrapper('scala', this.replInput)
    this.replWrapper.start()

    this.collectReplInputLines(this.replInput)
    this.collectReplOutputLines(this.replWrapper.getOutputLines())

    this.state = {
      lines: []
    }
  }

  componentWillUnmount() {
    this.replWrapper.stop()
  }

  handleClick() {
    this.refs.activeInput.focusInput()
  }

  collectReplInputLines(observable) {
    this.collectReplLines(observable, Repl.TYPE_INPUT)
  }

  collectReplOutputLines(observable) {
    this.collectReplLines(observable, Repl.TYPE_OUTPUT)
  }

  collectReplLines(observable, type) {
    observable.subscribe(line => {
      const lineObj = {
        content: line,
        type: type
      }
      const newState = update(this.state, { lines: { $push: [lineObj] } })
      this.setState(newState)
    })
  }

  resetRepl() {
    this.replInput.onNext(':reset')
    this.setState({ lines: [] })
  }

  loadLines(text) {
    this.resetRepl()
    this.replInput.onNext(':paste')
    this.replInput.onNext(text)
    this.replInput.onNext(String.fromCharCode(4))
  }

  render() {
    const lines = this.state.lines.map((lineObj, index) => {
      const { content, type } = lineObj
      switch (type) {
        case Repl.TYPE_INPUT:
          return <ReplInput content={content} key={index} />
        case Repl.TYPE_OUTPUT:
          return <ReplOutput content={content} key={index} />
        default:
          throw new Error('Unsupported line type of: ' + lineObj)
      }
    })

    const commandHistory = this.state.lines
      .filter(lineObj => lineObj.type === Repl.TYPE_INPUT)
      .map(lineObj => lineObj.content)
      .reverse()

    return (
      <div className={styles.repl} onClick={this.handleClick.bind(this)}>
        {lines}
        <ReplActiveInput ref="activeInput" commandHistory={commandHistory} replInput={this.replInput}/>
      </div>
    )
  }
}
