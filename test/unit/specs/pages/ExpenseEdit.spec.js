import Vue from 'vue'
import { shallowMount } from '@vue/test-utils'
import { __createMocks as createStoreMocks } from './../__mocks__/vuex'
import ExpenseEdit from '@/components/pages/ExpenseEdit'

Vue.config.silent = true

let wrapper
let storeMocks = createStoreMocks({
  getters: {},
  mutations: {},
  actions: {
    notify: jest.fn((store, data) => {}),
    getExpenseById: jest.fn((store, id) => {
      if (id !== 123) {
        return Promise.reject(Error('error'))
      }
      return Promise.resolve(true)
    })
  },
  state: {}
})

describe('ExpenseEdit.vue', () => {
  beforeEach(() => {
    jest.resetModules()
    jest.clearAllMocks()
  })

  it('should have methods', () => {
    expect(typeof ExpenseEdit.methods).toBe('object')
  })

  it('should have a fillExpense method', () => {
    expect(typeof ExpenseEdit.methods.fillExpense).toBe('function')
  })

  it('should have a notFoundExpense method', () => {
    expect(typeof ExpenseEdit.methods.notFoundExpense).toBe('function')
  })

  it('should renders correctly component without param ID', () => {
    wrapper = shallowMount(ExpenseEdit, {
      mocks: {
        $route: { params: {id: ''} },
        $router: []
      },
      store: storeMocks.store,
      Vue
    })
    expect(wrapper.name()).toBe('ExpenseEdit')
    expect(wrapper.vm.loading).toBeTruthy()
    expect(typeof wrapper.vm.expense).toBe('object')
    expect(wrapper.vm.expense.id).toBe('')
    expect(wrapper.vm.expense.date).toMatch(/[0-9]{4}(-[0-9]{2}){2}/)
    expect(wrapper.vm.expense.category).toBe('')
    expect(wrapper.vm.expense.name).toBe('')
    expect(wrapper.vm.expense.price).toBe(0)
    expect(wrapper.vm.expense.parcel).toBe(0)
    expect(wrapper.vm.expense.type).toBe('')
    expect(wrapper.vm.expense.situation).toBe('')
    expect(wrapper.vm.expense.observation).toBe('')
    expect(storeMocks.actions.notify).toBeCalled()
  })

  it('should renders correctly component with param ID but invalid', () => {
    wrapper = shallowMount(ExpenseEdit, {
      mocks: {
        $route: { params: {id: 456} },
        $router: []
      },
      store: storeMocks.store,
      Vue
    })
    expect(wrapper.name()).toBe('ExpenseEdit')
    expect(wrapper.vm.loading).toBeTruthy()
    expect(typeof wrapper.vm.expense).toBe('object')
    expect(storeMocks.actions.notify).not.toBeCalled()
    expect(storeMocks.actions.getExpenseById).toBeCalled()
  })

  it('should renders correctly component with valid param ID', () => {
    wrapper = shallowMount(ExpenseEdit, {
      mocks: {
        $route: { params: {id: 123} },
        $router: []
      },
      store: storeMocks.store,
      Vue
    })
    expect(wrapper.name()).toBe('ExpenseEdit')
    expect(wrapper.vm.loading).toBeTruthy()
    expect(typeof wrapper.vm.expense).toBe('object')
    expect(storeMocks.actions.notify).not.toBeCalled()
    expect(storeMocks.actions.getExpenseById).toBeCalled()
  })

  it('should fill expense data in fillExpense method', () => {
    const expense = {
      date: '2018-01-01',
      category: 'Food',
      name: 'bla',
      price: 21.50,
      parcel: 0,
      type: 'Fixed',
      situation: 'Pending',
      observation: ''
    }
    wrapper.vm.fillExpense(expense)
    expect(wrapper.vm.expense.date).toBe(expense.date)
    expect(wrapper.vm.expense.category).toBe(expense.category)
    expect(wrapper.vm.expense.name).toBe(expense.name)
    expect(wrapper.vm.expense.price).toBe(expense.price.toFixed(2))
    expect(wrapper.vm.expense.parcel).toBe(expense.parcel)
    expect(wrapper.vm.expense.type).toBe(expense.type)
    expect(wrapper.vm.expense.situation).toBe(expense.situation)
    expect(wrapper.vm.expense.observation).toBe(expense.observation)
  })

  it('should dispatch notify in notFoundExpense method', () => {
    wrapper.vm.notFoundExpense()
    expect(storeMocks.actions.notify).toBeCalled()
  })
})
