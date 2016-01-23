import { spawn } from 'child_process'
import _ from 'lodash'

import ReplWrapper from './ReplWrapper'


export default class PythonWrapper extends ReplWrapper {

  static REPL_PROMPT = '>>>';

  static FILTER_STRINGS = [
    'Python 3.5.0 (default, Dec 14 2015, 15:19:34)',
    '[GCC 4.2.1 Compatible Apple LLVM 7.0.0 (clang-700.1.76)] on darwin',
    'Type "help", "copyright", "credits" or "license" for more information.'
  ];

  constructor(inputObservable) {
    super(inputObservable)
  }

  isStartString(line) {
    return _.some(this.constructor.FILTER_STRINGS, (string) => string === line)
  }

  filterOutput(aString) {
    return aString.length > 0
    // return !aString.startsWith(this.constructor.REPL_PROMPT) &&
    //   aString.length > 0 &&
    //   !this.isStartString(aString)
  }

  spawnRepl() {
    return spawn('python3', ['-i'])
  }
}
