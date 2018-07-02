import Vue from 'vue'
import { shallowMount } from '@vue/test-utils'
import { __createMocks as createStoreMocks } from './__mocks__/vuex'
import App from '@/App'

Vue.config.silent = true

let wrapper
let storeMocks = createStoreMocks({
  getters: {
    userIsLogged: jest.fn(() => false)
  },
  mutations: {},
  actions: {
    init: jest.fn(store => {})
  },
  state: {
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
    }
  }
})

describe('App.vue', () => {
  it('should not have methods', () => {
    expect(typeof App.methods).not.toBe('object')
  })

  it('should renders correctly component', () => {
    wrapper = shallowMount(App, {
      store: storeMocks.store,
      Vue
    })
    expect(wrapper.name()).toBe('App')
    expect(wrapper.vm.clientHeight).toBe(0)
    expect(wrapper.vm.splashScreen).toBeTruthy()
    expect(wrapper.vm.isLogged).toBeFalsy()
    expect(wrapper.vm.styleContentWrapper).toBe('height:0px;')
    expect(wrapper.vm.modalSimpleStatus).toBeFalsy()
    expect(wrapper.vm.modalSimpleTitle).toBe('')
    expect(wrapper.vm.modalSimpleContent).toBe('')
    expect(wrapper.vm.modalConfirmStatus).toBeFalsy()
    expect(wrapper.vm.modalConfirmTitle).toBe('')
    expect(wrapper.vm.modalConfirmContent).toBe('')
    expect(typeof wrapper.vm.modalConfirmCallbackOk).toBe('function')
    expect(wrapper.vm.sideModalStatus).toBeFalsy()
    expect(wrapper.vm.sideModalTitle).toBe('')
    expect(wrapper.vm.sideModalContent).toBe('')
  })
})
