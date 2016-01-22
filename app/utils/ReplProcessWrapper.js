import {spawn} from 'child_process'
import Rx from 'rx'
import RxNode from 'rx-node'

import StringObservable from './StringObservable'

export default class ReplProcessWrapper {

  static languageConfigs = {
    scala: { name: 'scala', args: [], replStart: 'scala>' }
  };

  constructor(language, inputObservable) {
    this.inputObservable = inputObservable
    this.language = language
    this.config = ReplProcessWrapper.languageConfigs[this.language]
    this.replProcess = null
  }

  start() {
    this.replProcess = spawn(this.config.name, this.config.args)
    this.replProcess.stdout.setEncoding('utf8')
    this.outputObservable = RxNode.fromReadableStream(this.replProcess.stdout)
    this.startReadingFromInputTo(this.replProcess.stdin)
  }

  stop() {
    if (this.replProcess !== null) {
      this.replProcess.kill('SIGKILL')
    }
  }

  startReadingFromInputTo(stream) {
    const cmds = this.inputObservable.map(line => line + '\n')
    RxNode.writeToStream(cmds, stream, 'utf8')
  }

  getOutputLines() {
    return StringObservable.split(this.outputObservable, '\n')
      .filter(line => !line.startsWith(this.config.replStart) && line.length > 0)
  }
}
