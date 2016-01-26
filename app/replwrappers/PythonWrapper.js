import { spawn } from 'child_process'

import ReplWrapper from './ReplWrapper'


export default class PythonWrapper extends ReplWrapper {

  static REPL_PROMPT = '>>>';

  constructor(inputObservable) {
    super(inputObservable)
  }

  reset() {
    // todo
  }

  filterOutput(aString) {
    return aString.length > 0
  }

  spawnRepl() {
    return spawn('python3', ['-i'])
  }

  loadFile(file) {
    this.runCommand(`exec(open("${file}").read())`)
  }
}
