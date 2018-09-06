import {padStart} from '@/services/utilsOldES'

describe('utilsOldES.js', () => {
  it('should return same string', () => {
    expect(padStart('123', 3)).toBe('123')
  })

  it('should return a string with default chars', () => {
    expect(padStart('abc', 5)).toBe('00abc')
  })

  it('should return a string with specific chars', () => {
    expect(padStart('abc', 5, '1')).toBe('11abc')
  })
})
