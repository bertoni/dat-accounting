import Vue from 'vue'
import { shallowMount } from '@vue/test-utils'
import { __createMocks as createStoreMocks } from './__mocks__/vuex'
import NavToolbar from '@/components/NavToolbar'

Vue.config.silent = true

let wrapper
let storeMocks = createStoreMocks({
  getters: {
    currentAccount: jest.fn(() => 'bla')
  },
  mutations: {},
  actions: {
    logout: jest.fn(store => {})
  },
  state: {}
})

describe('NavToolbar.vue', () => {
  it('should have methods', () => {
    expect(typeof NavToolbar.methods).toBe('object')
  })

  it('should have a logout method', () => {
    expect(typeof NavToolbar.methods.logout).toBe('function')
  })

  it('should have a goToMyAccount method', () => {
    expect(typeof NavToolbar.methods.goToMyAccount).toBe('function')
  })

  it('should renders correctly component', () => {
    wrapper = shallowMount(NavToolbar, {
      mocks: {
        $router: []
      },
      store: storeMocks.store,
      Vue
    })
    expect(wrapper.name()).toBe('NavToolbar')
    expect(wrapper.vm.userMenuOpened).toBeFalsy()
    expect(wrapper.vm.account).toBe('bla')
  })

  it('should $emit logout in logout method', () => {
    wrapper.vm.userMenuOpened = true
    wrapper.vm.logout()
    expect(typeof wrapper.emitted()).toBe('object')
    expect(wrapper.vm.userMenuOpened).toBeFalsy()
  })

  it('should set $router in goToMyAccount method', () => {
    wrapper.vm.userMenuOpened = true
    wrapper.vm.goToMyAccount()
    expect(wrapper.vm.$router[0].name).toBe('my-accounts')
    expect(wrapper.vm.userMenuOpened).toBeFalsy()
  })

  it('should change userMenuOpened in #dropdownUserMenu button', () => {
    wrapper.find('#dropdownUserMenu').trigger('click')
    expect(wrapper.vm.userMenuOpened).toBeTruthy()
  })
})
