import Vue from 'vue'
import { shallowMount } from '@vue/test-utils'
import { __createMocks as createStoreMocks } from './__mocks__/vuex'
import Aside from '@/components/Aside'

Vue.config.silent = true

let wrapper
let storeMocks = createStoreMocks({
  getters: {},
  mutations: {},
  actions: {
    updateScrollbar: jest.fn(store => {})
  },
  state: {}
})

describe('Aside.vue', () => {
  it('should have methods', () => {
    expect(typeof Aside.methods).toBe('object')
  })

  it('should have an updateScrollbar method', () => {
    expect(typeof Aside.methods.updateScrollbar).toBe('function')
  })

  it('should renders correctly component', () => {
    wrapper = shallowMount(Aside, {
      store: storeMocks.store,
      Vue
    })
    expect(wrapper.name()).toBe('Aside')
  })

  it('should $emit updateScrollbar in updateScrollbar method', () => {
    wrapper.vm.updateScrollbar()
    expect(typeof wrapper.emitted()).toBe('object')
  })
})
