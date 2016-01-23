/* eslint func-names: 0 */
import { expect } from 'chai'

import ReplWrapper from '../../app/replwrappers/ReplWrapper'

describe('replwrappers', () => {
  describe('ReplWrapper', () => {
    it('Should throw if no observable is provided', () => {
      expect(() => new ReplWrapper).to.throw(Error, '[ReplWrapper] No valid inputObservable provided')
    })

    it('Should not implement spawnRepl', () => {
      const wrapper = new ReplWrapper({})
      expect(wrapper.spawnRepl).to.throw(Error, 'Subclass responsibility')
    })

    it('Should not implement filterOutput', () => {
      const wrapper = new ReplWrapper({})
      expect(wrapper.filterOutput).to.throw(Error, 'Subclass responsibility')
    })
  })
})
