/* eslint func-names: 0 */
/* eslint no-unused-expressions: 0*/
import { expect } from 'chai'
import Rx from 'rx'

import ScalaWrapper from '../../app/replwrappers/ScalaWrapper'

describe('replwrappers', function () {
  this.timeout(5000)

  describe('ScalaWrapper', function () {
    it('Should have the correct prompt', () => {
      expect(ScalaWrapper.REPL_PROMPT).to.equal('scala>')
    })

    it('Should start a repl process', (done) => {
      const wrapperInput = new Rx.Subject()
      const wrapper = new ScalaWrapper(wrapperInput)
      wrapper.start()
      setTimeout(function () {
        expect(wrapper.replProcess.pid).to.be.ok
        wrapper.stop()
        done()
      }, 2000)
    })

    it('Should execute commands from inputObservable', (done) => {
      const input = 'val x = 10'
      const output = 'x: Int = 10'

      const wrapperInput = new Rx.Subject()
      const wrapper = new ScalaWrapper(wrapperInput)
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
