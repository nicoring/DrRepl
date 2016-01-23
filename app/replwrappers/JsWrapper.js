import { spawn } from 'child_process'

import ReplWrapper from './ReplWrapper'

export default class JsWrapper extends ReplWrapper {

  static REPL_PROMPT = '>';

  constructor(inputObservable) {
    super(inputObservable)
  }

  filterOutput(aString) {
    return aString.length > 0
  }

  cleanOutput(aString) {
    return aString.replace('> ', '')
  }

  spawnRepl() {
    return spawn('node', ['-i'])
  }
}
