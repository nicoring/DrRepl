/* eslint func-names: 0 */
/* eslint no-unused-expressions: 0*/
import { expect } from 'chai'
import Rx from 'rx'

import JsWrapper from '../../app/replwrappers/JsWrapper'

describe('replwrappers', function () {
  describe('JsWrapper', function () {
    this.timeout(5000)

    it('Should have the correct prompt', () => {
      expect(JsWrapper.REPL_PROMPT).to.equal('>')
    })

    it('Should start a repl process', (done) => {
      const wrapperInput = new Rx.Subject()
      const wrapper = new JsWrapper(wrapperInput)
      wrapper.start()
      setTimeout(function () {
        expect(wrapper.replProcess.pid).to.be.ok
        wrapper.stop()
        done()
      }, 2000)
    })

    it('Should execute commands from inputObservable', (done) => {
      const input = 'var x = 10; x'
      const output = '10'

      const wrapperInput = new Rx.Subject()
      const wrapper = new JsWrapper(wrapperInput)
      wrapper.start()
      const wrapperOutput = wrapper.getOutputLines()
      wrapperOutput.subscribe((line) => {
        expect(line).to.equal(output)
        wrapper.stop()
        done()
      })
      wrapperInput.onNext(input)
    })
  })
})
