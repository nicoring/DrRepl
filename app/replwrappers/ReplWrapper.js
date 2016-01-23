import RxNode from 'rx-node'

import StringObservable from '../utils/StringObservable'

export default class ReplWrapper {

  constructor(inputObservable) {
    if (typeof(inputObservable) !== 'object') {
      throw new Error('[ReplWrapper] No valid inputObservable provided')
    }
    this.inputObservable = inputObservable
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
    if (this.replProcess !== null) {
      this.replProcess.kill('SIGKILL')
    }
    this.isStarted = false
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
