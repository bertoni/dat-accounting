import getters from '@/vuex/getters'

describe('vuex/getters.js', () => {
  it('should be an object', () => {
    expect(typeof getters).toBe('object')
  })

  it('should return if user is logged with userIsLogged method', () => {
    let state = {}
    expect(getters.userIsLogged(state)).toBeFalsy()
    state = { repository: {} }
    expect(getters.userIsLogged(state)).toBeFalsy()
    state = { repository: { key: 1 } }
    expect(getters.userIsLogged(state)).toBeTruthy()
  })

  it('should return current account with currentAccount method', () => {
    let state = { repository: {} }
    expect(getters.currentAccount(state)).toBe('')
    state = { repository: { title: 'a' } }
    expect(getters.currentAccount(state)).toBe('a')
  })
})
