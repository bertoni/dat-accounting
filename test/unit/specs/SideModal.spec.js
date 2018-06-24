import Vue from 'vue'
import { shallowMount } from '@vue/test-utils'
import { __createMocks as createStoreMocks } from './__mocks__/vuex'
import SideModal from '@/components/SideModal'

Vue.config.silent = true

let wrapper
const title = 'Side Modal'
const content = 'Foo Baa'
const opened = false
let storeMocks = createStoreMocks({
  getters: {},
  mutations: {},
  actions: {
    closeSideModal: jest.fn(store => {})
  },
  state: {}
})

describe('SideModal.vue', () => {
  it('should have methods', () => {
    expect(typeof SideModal.methods).toBe('object')
  })

  it('should have a close method', () => {
    expect(typeof SideModal.methods.close).toBe('function')
  })

  it('should renders correctly component', () => {
    wrapper = shallowMount(SideModal, {
      propsData: {
        title: title,
        content: content,
        opened: opened
      },
      store: storeMocks.store,
      Vue
    })
    expect(wrapper.name()).toBe('SideModal')
    expect(wrapper.props().title).toBe(title)
    expect(wrapper.props().content).toBe(content)
    expect(wrapper.props().opened).toBe(opened)
    expect(wrapper.vm.style).toBe('display:none')
  })

  it('should $emit closeSideModal in close method', () => {
    wrapper.vm.close()
    expect(typeof wrapper.emitted()).toBe('object')
  })

  it('should return style block with opened true', () => {
    wrapper = shallowMount(SideModal, {
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
