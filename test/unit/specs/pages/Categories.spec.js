import Vue from 'vue'
import { shallowMount } from '@vue/test-utils'
import { __createMocks as createStoreMocks } from './../__mocks__/vuex'
import Categories from '@/components/pages/Categories'

Vue.config.silent = true

let wrapper
let storeMocks = createStoreMocks({
  getters: {},
  mutations: {
    addCategory (state, value) {
      state.categories.push(value)
    }
  },
  actions: {
    notify: jest.fn(store => {}),
    setCategories: jest.fn((store, categories) => {
      if (categories.indexOf('Pets') === -1) {
        return Promise.reject(Error('error'))
      }
      return Promise.resolve(true)
    })
  },
  state: {
    categories: ['Food', 'Tax', 'Transport']
  }
})

describe('Categories.vue', () => {
  beforeEach(() => {
    jest.resetModules()
    jest.clearAllMocks()
  })

  it('should have methods', () => {
    expect(typeof Categories.methods).toBe('object')
  })

  it('should have a formatRow method', () => {
    expect(typeof Categories.methods.formatRow).toBe('function')
  })

  it('should have a remove method', () => {
    expect(typeof Categories.methods.remove).toBe('function')
  })

  it('should have a compareToSort method', () => {
    expect(typeof Categories.methods.compareToSort).toBe('function')
  })

  it('should have a create method', () => {
    expect(typeof Categories.methods.create).toBe('function')
  })

  it('should have a save method', () => {
    expect(typeof Categories.methods.save).toBe('function')
  })

  it('should renders correctly component', () => {
    wrapper = shallowMount(Categories, {
      store: storeMocks.store,
      Vue
    })
    expect(wrapper.name()).toBe('Categories')
    expect(wrapper.vm.results_per_page).toBe(10)
    expect(wrapper.vm.textCategory).toBe('')
    expect(typeof wrapper.vm.categories).toBe('object')
    expect(wrapper.vm.categories.length).toBe(3)
    expect(wrapper.vm.oldCategories).toMatchObject(['Food', 'Tax', 'Transport'])
  })

  it('should format data in formatRow method', () => {
    expect(wrapper.vm.formatRow('column')).toMatchObject({name: 'column'})
  })

  it('should dispatch notify trying remove invalid category in remove method', () => {
    expect(wrapper.vm.remove('column')).toBeFalsy()
    expect(storeMocks.actions.notify).toBeCalled()
  })

  it('should remove category in remove method', () => {
    storeMocks.mutations.addCategory(storeMocks.state, 'Clothes')
    wrapper.vm.remove({name: 'Tax'})
    expect(storeMocks.actions.notify).not.toBeCalled()
    expect(wrapper.vm.categories).toMatchObject([{name: 'Food'}, {name: 'Transport'}, {name: 'Clothes'}])
  })

  it('should return -1 with a.name less than b.name in compareToSort method', () => {
    expect(wrapper.vm.compareToSort({name: 'a'}, {name: 'b'})).toBe(-1)
  })

  it('should return 1 with a.name biggest than b.name in compareToSort method', () => {
    expect(wrapper.vm.compareToSort({name: 'c'}, {name: 'b'})).toBe(1)
  })

  it('should return 0 with a.name equal b.name in compareToSort method', () => {
    expect(wrapper.vm.compareToSort({name: 'b'}, {name: 'b'})).toBe(0)
  })

  it('should dispatch notify with empty category text in create method', () => {
    expect(wrapper.vm.create()).toBeFalsy()
    expect(storeMocks.actions.notify).toBeCalled()
  })

  it('should dispatch notify with exist category in create method', () => {
    wrapper.vm.textCategory = 'Transport'
    expect(wrapper.vm.create()).toBeFalsy()
    expect(storeMocks.actions.notify).toBeCalled()
  })

  it('should add new category in create method', () => {
    wrapper.vm.textCategory = 'Health'
    wrapper.vm.create()
    expect(storeMocks.actions.notify).not.toBeCalled()
    expect(wrapper.vm.categories).toMatchObject([{name: 'Clothes'}, {name: 'Food'}, {name: 'Health'}, {name: 'Transport'}])
    expect(wrapper.vm.textCategory).toBe('')
  })

  it('should dispatch setCategories with error in save method', () => {
    wrapper.vm.save()
    expect(storeMocks.actions.setCategories).toBeCalled()
    setTimeout(() => {
      expect(storeMocks.actions.notify).toBeCalled()
    }, 100)
  })

  it('should dispatch setCategories with success in save method', () => {
    wrapper.vm.textCategory = 'Pets'
    wrapper.vm.create()
    wrapper.vm.save()
    expect(storeMocks.actions.setCategories).toBeCalled()
    setTimeout(() => {
      expect(storeMocks.actions.notify).toBeCalled()
    }, 100)
  })
})
