import Vue from 'vue'
import Vuex from 'vuex'
import actions from './actions.js'
import getters from './getters.js'
import mutations from './mutations.js'

Vue.use(Vuex)

const state = {
  location: {
    currentLocation: {},
    currentWeather: {}
  },
  modalSimple: {
    title: '',
    content: '',
    opened: false
  },
  sideModal: {
    title: '',
    content: '',
    opened: false
  },
  modalConfirm: {
    title: '',
    content: '',
    opened: false,
    callbackOk: () => {}
  },
  perfectScrollbars: [],
  repository: {},
  repositories: [],
  types: ['Fixed', 'Casual', 'Superfluous'],
  situations: ['Pending', 'Settled'],
  categories: ['Food', 'Tax', 'Transport']
}

export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters
})
