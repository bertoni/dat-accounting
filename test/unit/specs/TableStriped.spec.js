import Vue from 'vue'
import { shallowMount } from '@vue/test-utils'
import { __createMocks as createStoreMocks } from './__mocks__/vuex'
import TableStriped from '@/components/TableStriped'

Vue.config.silent = true

let wrapper
const data = [{name: 'User 1', number: 1}, {name: 'User 2', number: 2}]
const columns = ['Nome', 'Number']
const resultsPerPage = 2
let storeMocks = createStoreMocks({
  getters: {},
  mutations: {},
  actions: {
    newData: jest.fn(store => {})
  },
  state: {}
})

describe('TableStriped.vue', () => {
  it('should have methods', () => {
    expect(typeof TableStriped.methods).toBe('object')
  })

  it('should have a hasValue method', () => {
    expect(typeof TableStriped.methods.hasValue).toBe('function')
  })

  it('should have an itemValue method', () => {
    expect(typeof TableStriped.methods.itemValue).toBe('function')
  })

  it('should have a loadDataOk method', () => {
    expect(typeof TableStriped.methods.loadDataOk).toBe('function')
  })

  it('should have a loadDataError method', () => {
    expect(typeof TableStriped.methods.loadDataError).toBe('function')
  })

  it('should have a loadData method', () => {
    expect(typeof TableStriped.methods.loadData).toBe('function')
  })

  it('should renders correctly component', () => {
    wrapper = shallowMount(TableStriped, {
      propsData: {
        data: data,
        columns: columns,
        resultsPerPage: resultsPerPage
      },
      store: storeMocks.store,
      Vue
    })
    expect(wrapper.name()).toBe('TableStriped')
    expect(wrapper.props().data).toBe(data)
    expect(wrapper.props().columns).toBe(columns)
    expect(wrapper.props().actions).toMatchObject([])
    expect(wrapper.props().resultsPerPage).toBe(resultsPerPage)
    expect(wrapper.vm.current_page).toBe(1)
    expect(wrapper.vm.loading).toBeFalsy()
    expect(wrapper.vm.finish).toBeFalsy()
  })

  it('should return true for element found in hasValue method', () => {
    expect(wrapper.vm.hasValue({name: 'User 1', number: 1}, 'Number')).toBeTruthy()
  })

  it('should return false for element not found in hasValue method', () => {
    expect(wrapper.vm.hasValue({name: 'User 1', number: 1}, 'Numbers')).toBeFalsy()
  })

  it('should return value in itemValue method', () => {
    expect(wrapper.vm.itemValue({name: 'User 1', number: 1}, 'Number')).toBe(1)
  })

  it('should return undefined in itemValue method', () => {
    expect(wrapper.vm.itemValue({name: 'User 1', number: 1}, 'Numbers')).toBe(undefined)
  })

  it('should increment current_page in loadDataOk method', () => {
    wrapper.vm.loadDataOk()
    expect(wrapper.vm.current_page).toBe(2)
    expect(wrapper.vm.loading).toBeFalsy()
  })

  it('should set flag finish to false in loadDataError method', () => {
    wrapper.vm.loadDataError()
    expect(wrapper.vm.finish).toBeTruthy()
    expect(wrapper.vm.loading).toBeFalsy()
  })

  it('should $emit newData in loadData method', () => {
    wrapper = shallowMount(TableStriped, {
      propsData: {
        data: data,
        columns: columns,
        resultsPerPage: resultsPerPage
      },
      store: storeMocks.store,
      Vue
    })
    wrapper.vm.loadData()
    expect(typeof wrapper.emitted()).toBe('object')
    expect(typeof wrapper.emitted().newData).toBe('object')
    expect(wrapper.vm.loading).toBeTruthy()
    expect(wrapper.vm.loadData()).toBeFalsy()
  })
})
