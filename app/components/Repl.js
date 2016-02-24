import React, { Component } from 'react'
import styles from './Repl.module.css'
import Rx from 'rx'
import { connect } from 'react-redux'

import ReplWrapperFactory from '../replwrappers/ReplWrapperFactory'
import { LANGS } from '../replwrappers/ReplWrapperFactory'

import ReplActiveInput from './repl/ReplActiveInput'
import ReplOutput from './repl/ReplOutput'
import ReplInput from './repl/ReplInput'

import { addLine, resetLines } from '../actions/repl'

@connect(state => { return { lines: state.repl } }, null, null, { withRef: true })
export default class Repl extends Component {

  static TYPE_OUTPUT = 1;
  static TYPE_INPUT = 2;
  static BUFFER_SIZE = 100;

  static propTypes = {
    lang: React.PropTypes.oneOf(LANGS).isRequired,
    lines: React.PropTypes.array.isRequired,
    dispatch: React.PropTypes.func.isRequired
  };

  constructor(props) {
    super(props)

    this.replInput = new Rx.ReplaySubject(Repl.BUFFER_SIZE)
    this.replWrapper = ReplWrapperFactory.buildWrapperFor(this.props.lang, this.replInput)
    this.replWrapper.start()

    this.collectReplInputLines(this.replInput)
    this.replOutput = this.replWrapper.getOutputLines()
    this.collectReplOutputLines(this.replOutput)
  }

  componentWillUnmount() {
    this.props.dispatch(resetLines())
    this.replInput.onCompleted()
    this.replOutputSubscription.dispose()
    this.replWrapper.stop()
  }

  handleClick() {
    this.refs.activeInput.focusInput()
  }

  handleSubmit(line) {
    this.replInput.onNext(line)
  }

  collectReplInputLines(observable) {
    this.collectReplLines(observable, Repl.TYPE_INPUT)
  }

  collectReplOutputLines(observable) {
    this.collectReplLines(observable, Repl.TYPE_OUTPUT)
  }

  collectReplLines(observable, type) {
    this.replOutputSubscription = observable.subscribe(line => {
      const lineObj = {
        content: line,
        type
      }
      this.props.dispatch(addLine(lineObj))
    })
  }

  resetRepl() {
    this.replWrapper.reset()
  }

  loadFile(file) {
    this.replWrapper.loadFile(file)
  }

  render() {
    const lines = this.props.lines.map((lineObj, index) => {
      const { content, type } = lineObj
      switch (type) {
        case Repl.TYPE_INPUT:
          return <ReplInput content={content} key={index} lang={this.props.lang} />
        case Repl.TYPE_OUTPUT:
          return <ReplOutput content={content} key={index} lang={this.props.lang} />
        default:
          throw new Error('Unsupported line type of: ' + lineObj)
      }
    })

    const commandHistory = this.props.lines
      .filter(lineObj => lineObj.type === Repl.TYPE_INPUT)
      .map(lineObj => lineObj.content)
      .filter(content => content !== '')
      .reduce((acc, value, index, commands) => {
        if (commands[index - 1] !== commands[index]) {
          acc.push(value)
        }
        return acc
      }, [])
      .reverse()

    return (
      <div className={styles.repl} onClick={this.handleClick.bind(this)}>
        {lines}
        <ReplActiveInput ref="activeInput"
          lang={this.props.lang}
          commandHistory={commandHistory}
          onSubmit={this.handleSubmit.bind(this)} />
      </div>
    )
  }
}
