import * as mutationTypes from '@/vuex/mutation_types'

describe('vuex/mutation_types.js', () => {
  it('should be an object', () => {
    expect(typeof mutationTypes).toBe('object')
  })

  it('should have specific properties', () => {
    expect(mutationTypes).toHaveProperty('UPDATE_SCROLLBAR')
    expect(mutationTypes).toHaveProperty('CLOSE_MODAL_SIMPLE')
    expect(mutationTypes).toHaveProperty('OPEN_MODAL_SIMPLE')
    expect(mutationTypes).toHaveProperty('CLOSE_SIDE_MODAL')
    expect(mutationTypes).toHaveProperty('OPEN_SIDE_MODAL')
    expect(mutationTypes).toHaveProperty('CLOSE_MODAL_CONFIRM')
    expect(mutationTypes).toHaveProperty('OPEN_MODAL_CONFIRM')
    expect(mutationTypes).toHaveProperty('SET_REPOSITORY')
    expect(mutationTypes).toHaveProperty('SET_REPOSITORIES')
    expect(mutationTypes).toHaveProperty('SET_CATEGORIES')
    expect(mutationTypes).toHaveProperty('SET_LOCATION')
    expect(mutationTypes).toHaveProperty('REMOVE_LOCATION')
    expect(mutationTypes).toHaveProperty('SET_CURRENT_WEATHER')
  })
})
