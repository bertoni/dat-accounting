import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const state = {}
export const getters = {}
export const actions = {}
export const mutations = {}

// eslint-disable-next-line no-underscore-dangle
export function __createMocks (custom = { state: {}, getters: {}, actions: {}, mutations: {} }) {
  const mockGetters = Object.assign({}, getters, custom.getters)
  const mockMutations = Object.assign({}, mutations, custom.mutations)
  const mockActions = Object.assign({}, actions, custom.actions)
  const mockState = Object.assign({}, state, custom.state)

  return {
    getters: mockGetters,
    mutations: mockMutations,
    actions: mockActions,
    state: mockState,
    store: new Vuex.Store({
      getters: mockGetters,
      mutations: mockMutations,
      actions: mockActions,
      state: mockState
    })
  }
}

export const store = __createMocks().store
