import RxNode from 'rx-node'
import Rx from 'rx'

import StringObservable from '../utils/StringObservable'

export default class ReplWrapper {

  constructor(inputObservable) {
    if (typeof(inputObservable) !== 'object') {
      throw new Error('[ReplWrapper] No valid inputObservable provided')
    }
    this.inputCommands = new Rx.Subject()
    this.inputObservable = Rx.Observable.merge(inputObservable, this.inputCommands)
    this.replProcess = null
    this.isStarted = false
  }

  spawnRepl() {
    throw new Error('Subclass responsibility')
  }

  start() {
    this.replProcess = this.spawnRepl()
    this.replProcess.stdout.setEncoding('utf8')
    this.outputObservable = RxNode.fromReadableStream(this.replProcess.stdout)
    this.startReadingFromInputTo(this.replProcess.stdin)
    this.isStarted = true
  }

  stop() {
    this.inputCommands.onCompleted()
    if (this.replProcess !== null) {
      this.replProcess.kill('SIGKILL')
    }
    this.isStarted = false
  }

  reset() {
    throw new Error('Subclass responsibility')
  }

  readFile() {
    throw new Error('Subclass responsibility')
  }

  runCommand(command) {
    this.inputCommands.onNext(command + '\n')
  }

  startReadingFromInputTo(stream) {
    const cmds = this.inputObservable.map(line => line + '\n')
    RxNode.writeToStream(cmds, stream, 'utf8')
  }

  filterOutput() {
    throw new Error('Subclass responsibility')
  }

  cleanOutput(aString) {
    return aString
  }

  getOutputLines() {
    if (!this.isStarted) {
      throw new Error('Process is not started')
    }
    return StringObservable.split(this.outputObservable, '\n')
      .filter(this.filterOutput.bind(this))
      .map(this.cleanOutput)
  }
}
