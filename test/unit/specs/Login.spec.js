import Vue from 'vue'
import VueRouter from 'vue-router'
import { shallowMount } from '@vue/test-utils'
import { __createMocks as createStoreMocks } from './__mocks__/vuex'
import Login from '@/components/Login'

Vue.config.silent = true
Vue.use(VueRouter)
const routes = [{
  path: '/',
  name: 'dashboard',
  component: Login
}]
const router = new VueRouter({routes})

let wrapper
let storeMocks = createStoreMocks({
  getters: {},
  mutations: {},
  actions: {
    notify: jest.fn((store, data) => {}),
    setRepository: jest.fn((store, link) => {
      if (link !== 'dat://123456789wertyui') {
        return Promise.reject(Error('error'))
      }
      return Promise.resolve(true)
    }),
    createAccount: jest.fn(() => Promise.resolve(true))
  },
  state: {}
})

describe('Login.vue', () => {
  it('should have methods', () => {
    expect(typeof Login.methods).toBe('object')
  })

  it('should have a create method', () => {
    expect(typeof Login.methods.create).toBe('function')
  })

  it('should have a submit method', () => {
    expect(typeof Login.methods.submit).toBe('function')
  })

  it('should have a success method', () => {
    expect(typeof Login.methods.success).toBe('function')
  })

  it('should renders correctly component', () => {
    wrapper = shallowMount(Login, {
      store: storeMocks.store,
      Vue
    })
    expect(wrapper.name()).toBe('Login')
    expect(wrapper.vm.loading).toBeFalsy()
    expect(wrapper.vm.formValidated).toBeFalsy()
    expect(wrapper.vm.infoLink).toBe('')
    expect(wrapper.vm.link).toBe('')
    expect(typeof wrapper.vm.backgrounds).toBe('object')
    expect(wrapper.vm.backgrounds.length).toBeGreaterThan(0)
    expect(wrapper.vm.classInputLink).toBe('form-control')
    expect(wrapper.vm.activeBackground).toBeGreaterThanOrEqual(0)
    expect(wrapper.vm.activeBackground).toBeLessThan(wrapper.vm.backgrounds.length)
  })

  it('should fill infoLink with empty link in submit method', () => {
    wrapper.vm.submit()
    expect(wrapper.vm.infoLink).toBe('Dat link of your account is required')
    expect(wrapper.vm.formValidated).toBeTruthy()
    expect(storeMocks.actions.notify).not.toBeCalled()
  })

  it('should fill infoLink with invalid link in submit method', () => {
    wrapper.vm.link = 'http://app.com'
    wrapper.vm.submit()
    expect(wrapper.vm.infoLink).toBe('Invalid dat address')
    expect(wrapper.vm.formValidated).toBeTruthy()
    expect(storeMocks.actions.notify).not.toBeCalled()
  })

  it('should dispatch setRepository in submit method', () => {
    wrapper.vm.link = 'dat://123456789wertyui'
    wrapper.vm.submit()
    expect(wrapper.vm.infoLink).toBe('')
    expect(wrapper.vm.formValidated).toBeTruthy()
    expect(wrapper.vm.loading).toBeTruthy()
    expect(storeMocks.actions.setRepository).toBeCalled()
  })

  it('should dispatch createAccount in create method', () => {
    wrapper.vm.link = 'dat://123456789wertyui'
    wrapper.vm.create()
    expect(wrapper.vm.loading).toBeTruthy()
    expect(storeMocks.actions.createAccount).toBeCalled()
  })

  it('should dispatch notify in success method', () => {
    wrapper = shallowMount(Login, {
      store: storeMocks.store,
      router,
      Vue
    })
    wrapper.vm.link = 'dat://123456789wertyui'
    wrapper.vm.infoLink = 'ajoaiscoijnoc'
    wrapper.vm.formValidated = true
    wrapper.vm.success('test')
    expect(wrapper.vm.link).toBe('')
    expect(wrapper.vm.infoLink).toBe('')
    expect(wrapper.vm.formValidated).toBeFalsy()
    expect(storeMocks.actions.notify).toBeCalled()
  })
})
