/* eslint func-names: 0 */
import { expect } from 'chai'

import highlight from '../../app/utils/highlight'

describe('utils', () => {
  describe('Highligter', () => {
    it('should return something', () => {
      const line = 'var a = 10'
      const highlighted = highlight(line, 'javascript')
      expect(highlighted).to.be.ok
    })
  })
})
