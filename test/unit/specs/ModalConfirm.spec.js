import Vue from 'vue'
import { shallowMount } from '@vue/test-utils'
import { __createMocks as createStoreMocks } from './__mocks__/vuex'
import ModalConfirm from '@/components/ModalConfirm'

Vue.config.silent = true

let wrapper
const title = 'Modal Confirm'
const content = 'Foo Baa'
const opened = false
let storeMocks = createStoreMocks({
  getters: {},
  mutations: {},
  actions: {
    closeModalConfirm: jest.fn(store => {})
  },
  state: {}
})

describe('ModalConfirm.vue', () => {
  it('should have methods', () => {
    expect(typeof ModalConfirm.methods).toBe('object')
  })

  it('should have a close method', () => {
    expect(typeof ModalConfirm.methods.close).toBe('function')
  })

  it('should renders correctly component', () => {
    wrapper = shallowMount(ModalConfirm, {
      propsData: {
        title: title,
        content: content,
        opened: opened
      },
      store: storeMocks.store,
      Vue
    })
    expect(wrapper.name()).toBe('ModalConfirm')
    expect(wrapper.props().title).toBe(title)
    expect(wrapper.props().content).toBe(content)
    expect(wrapper.props().opened).toBe(opened)
    expect(typeof wrapper.props().callbackOk).toBe('function')
    expect(wrapper.vm.style).toBe('display:none')
  })

  it('should dispatch closeModalConfirm in close method', () => {
    wrapper.vm.close()
    expect(storeMocks.actions.closeModalConfirm).toBeCalled()
  })

  it('should return style block with opened true', () => {
    wrapper = shallowMount(ModalConfirm, {
      propsData: {
        title: title,
        content: content,
        opened: true
      },
      store: storeMocks.store,
      Vue
    })
    expect(wrapper.vm.style).toBe('display:block')
  })
})
