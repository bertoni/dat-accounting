import Vue from 'vue'
import { shallowMount } from '@vue/test-utils'
import { __createMocks as createStoreMocks } from './__mocks__/vuex'
import ModalSimple from '@/components/ModalSimple'

Vue.config.silent = true

let wrapper
const title = 'Modal Simple'
const content = 'Foo Baa'
const opened = false
let storeMocks = createStoreMocks({
  getters: {},
  mutations: {},
  actions: {
    closeModalSimple: jest.fn(store => {})
  },
  state: {}
})

describe('ModalSimple.vue', () => {
  it('should have methods', () => {
    expect(typeof ModalSimple.methods).toBe('object')
  })

  it('should have a close method', () => {
    expect(typeof ModalSimple.methods.close).toBe('function')
  })

  it('should renders correctly component', () => {
    wrapper = shallowMount(ModalSimple, {
      propsData: {
        title: title,
        content: content,
        opened: opened
      },
      store: storeMocks.store,
      Vue
    })
    expect(wrapper.name()).toBe('ModalSimple')
    expect(wrapper.props().title).toBe(title)
    expect(wrapper.props().content).toBe(content)
    expect(wrapper.props().opened).toBe(opened)
    expect(wrapper.vm.style).toBe('display:none')
  })

  it('should $emit closeModalSimple in close method', () => {
    wrapper.vm.close()
    expect(typeof wrapper.emitted()).toBe('object')
  })

  it('should return style block with opened true', () => {
    wrapper = shallowMount(ModalSimple, {
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
