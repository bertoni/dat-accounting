import store from '@/vuex/store'

jest.mock('./../../../../src/vuex/api/index.js', () => ({
}))

describe('vuex/store.js', () => {
  it('should be an object', () => {
    expect(typeof store).toBe('object')
  })

  it('should have state property an object', () => {
    expect(typeof store.state).toBe('object')
  })

  it('should have mutations property an object', () => {
    expect(typeof store._mutations).toBe('object')
  })

  it('should have actions property an object', () => {
    expect(typeof store._actions).toBe('object')
  })

  it('should have getters property an object', () => {
    expect(typeof store.getters).toBe('object')
  })

  it('should have state properties an object', () => {
    expect(typeof store.state.modalSimple).toBe('object')
    expect(typeof store.state.sideModal).toBe('object')
    expect(typeof store.state.modalConfirm).toBe('object')
    expect(typeof store.state.perfectScrollbars).toBe('object')
    expect(typeof store.state.repository).toBe('object')
    expect(typeof store.state.repositories).toBe('object')
    expect(typeof store.state.types).toBe('object')
    expect(typeof store.state.situations).toBe('object')
    expect(typeof store.state.categories).toBe('object')
  })
})
