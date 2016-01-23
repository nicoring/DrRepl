import { spawn } from 'child_process'
import _ from 'lodash'
import ReplWrapper from './ReplWrapper'

export default class ScalaWrapper extends ReplWrapper {

  static REPL_PROMPT = 'scala>';

  static FILTER_STRINGS = [
    'Welcome to Scala version 2.11.7 (Java HotSpot(TM) 64-Bit Server VM, Java 1.8.0_45).',
    'Type in expressions to have them evaluated.',
    'Type :help for more information.'
  ];

  constructor(inputObservable) {
    super(inputObservable)
  }

  isStartString(line) {
    return _.some(this.constructor.FILTER_STRINGS, (string) => string === line)
  }

  filterOutput(aString) {
    return !aString.startsWith(this.constructor.REPL_PROMPT) &&
      aString.length > 0 &&
      !this.isStartString(aString)
  }

  spawnRepl() {
    return spawn('scala')
  }
}
