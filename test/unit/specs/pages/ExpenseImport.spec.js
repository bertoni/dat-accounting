import Vue from 'vue'
import { shallowMount } from '@vue/test-utils'
import { __createMocks as createStoreMocks } from './../__mocks__/vuex'
import ExpenseImport from '@/components/pages/ExpenseImport'

Vue.config.silent = true

let wrapper
let storeMocks = createStoreMocks({
  getters: {},
  mutations: {},
  actions: {
    notify: jest.fn((store, data) => {}),
    createExpense: jest.fn((store, expense) => {
      if (expense.category !== 'Food') {
        return Promise.reject(Error('error'))
      }
      return Promise.resolve(true)
    })
  },
  state: {
    types: ['Fixed', 'Casual', 'Superfluous'],
    situations: ['Pending', 'Settled'],
    categories: ['Food', 'Tax', 'Transport']
  }
})

describe('ExpenseImport.vue', () => {
  it('should have methods', () => {
    expect(typeof ExpenseImport.methods).toBe('object')
  })

  it('should have an exists method', () => {
    expect(typeof ExpenseImport.methods.exists).toBe('function')
  })

  it('should have a remove method', () => {
    expect(typeof ExpenseImport.methods.remove).toBe('function')
  })

  it('should have a toScroll method', () => {
    expect(typeof ExpenseImport.methods.toScroll).toBe('function')
  })

  it('should have a cancel method', () => {
    expect(typeof ExpenseImport.methods.cancel).toBe('function')
  })

  it('should have a downloadExample method', () => {
    expect(typeof ExpenseImport.methods.downloadExample).toBe('function')
  })

  it('should have a loadDataSpreadSheet method', () => {
    expect(typeof ExpenseImport.methods.loadDataSpreadSheet).toBe('function')
  })

  it('should have a validate method', () => {
    expect(typeof ExpenseImport.methods.validate).toBe('function')
  })

  it('should have an openFile method', () => {
    expect(typeof ExpenseImport.methods.openFile).toBe('function')
  })

  it('should have a readFile method', () => {
    expect(typeof ExpenseImport.methods.readFile).toBe('function')
  })

  it('should have an importSpreadSheet method', () => {
    expect(typeof ExpenseImport.methods.importSpreadSheet).toBe('function')
  })

  it('should have a confirmImport method', () => {
    expect(typeof ExpenseImport.methods.confirmImport).toBe('function')
  })

  it('should have a saveExpensesSuccess method', () => {
    expect(typeof ExpenseImport.methods.saveExpensesSuccess).toBe('function')
  })

  it('should renders correctly component', () => {
    wrapper = shallowMount(ExpenseImport, {
      store: storeMocks.store,
      Vue
    })
    expect(wrapper.name()).toBe('ExpenseImport')
    expect(wrapper.vm.importing).toBeFalsy()
    expect(wrapper.vm.saving).toBeFalsy()
    expect(typeof wrapper.vm.expenses).toBe('object')
    expect(wrapper.vm.expenses.length).toBe(0)
    expect(typeof wrapper.vm.money).toBe('object')
    expect(typeof wrapper.vm.money.decimal).toBe('string')
    expect(typeof wrapper.vm.money.thousands).toBe('string')
    expect(typeof wrapper.vm.money.prefix).toBe('string')
    expect(typeof wrapper.vm.money.suffix).toBe('string')
    expect(typeof wrapper.vm.money.precision).toBe('number')
    expect(typeof wrapper.vm.money.format).toBe('function')
    expect(wrapper.vm.money.masked).toBeFalsy()
    expect(wrapper.vm.categories).toMatchObject(storeMocks.state.categories)
    expect(wrapper.vm.types).toMatchObject(storeMocks.state.types)
    expect(wrapper.vm.situations).toMatchObject(storeMocks.state.situations)
    expect(wrapper.vm.totalExpense).toBe(0 + ' - ' + wrapper.vm.money.format(0))
    expect(wrapper.vm.validExpense).toBe(0 + ' - ' + wrapper.vm.money.format(0))
    expect(wrapper.vm.invalidExpense).toBe(0 + ' - ' + wrapper.vm.money.format(0))
  })

  it('should dispatch notify without saving in saveExpensesSuccess method', () => {
    wrapper.vm.expenses = [{
      'saved': false,
      'date': '2018-01-01',
      'category': 'Food',
      'name': 'Expense',
      'price': wrapper.vm.money.prefix + '19' + wrapper.vm.money.decimal + '90',
      'parcel': 0,
      'parcelTotal': 0,
      'type': 'Casual',
      'situation': 'Pending',
      'observation': '',
      'validation': {}
    }]
    wrapper.vm.saving = true
    wrapper.vm.importing = true
    expect(wrapper.vm.saveExpensesSuccess()).toBeFalsy()
    expect(storeMocks.actions.notify).toBeCalled()
    expect(wrapper.vm.saving).toBeFalsy()
    expect(wrapper.vm.importing).toBeFalsy()
    expect(typeof wrapper.vm.expenses).toBe('object')
    expect(wrapper.vm.expenses.length).toBe(1)
  })

  it('should dispatch notify with all saved in saveExpensesSuccess method', () => {
    wrapper.vm.expenses = [{
      'saved': true,
      'date': '2018-01-01',
      'category': 'Food',
      'name': 'Expense',
      'price': wrapper.vm.money.prefix + '19' + wrapper.vm.money.decimal + '90',
      'parcel': 0,
      'parcelTotal': 0,
      'type': 'Casual',
      'situation': 'Pending',
      'observation': '',
      'validation': {}
    }]
    wrapper.vm.saving = true
    wrapper.vm.importing = true
    expect(wrapper.vm.saveExpensesSuccess()).toBeTruthy()
    expect(storeMocks.actions.notify).toBeCalled()
    expect(wrapper.vm.saving).toBeFalsy()
    expect(wrapper.vm.importing).toBeFalsy()
    expect(typeof wrapper.vm.expenses).toBe('object')
    expect(wrapper.vm.expenses.length).toBe(0)
  })

  it('should dispatch notify with some expenses saved in saveExpensesSuccess method', () => {
    wrapper.vm.expenses = [
      {
        'saved': true,
        'date': '2018-01-01',
        'category': 'Food',
        'name': 'Expense',
        'price': wrapper.vm.money.prefix + '19' + wrapper.vm.money.decimal + '90',
        'parcel': 0,
        'parcelTotal': 0,
        'type': 'Casual',
        'situation': 'Pending',
        'observation': '',
        'validation': {}
      },
      {
        'saved': false,
        'date': '2018-01-02',
        'category': 'Food',
        'name': 'Expense',
        'price': wrapper.vm.money.prefix + '19' + wrapper.vm.money.decimal + '90',
        'parcel': 0,
        'parcelTotal': 0,
        'type': 'Casual',
        'situation': 'Pending',
        'observation': '',
        'validation': {}
      }
    ]
    wrapper.vm.saving = true
    wrapper.vm.importing = true
    expect(wrapper.vm.saveExpensesSuccess()).toBeFalsy()
    expect(storeMocks.actions.notify).toBeCalled()
    expect(wrapper.vm.saving).toBeFalsy()
    expect(wrapper.vm.importing).toBeFalsy()
    expect(typeof wrapper.vm.expenses).toBe('object')
    expect(wrapper.vm.expenses.length).toBe(2)
  })

  it('should clear all in cancel method', () => {
    wrapper.vm.expenses = [{
      'date': '2018-01-01',
      'category': 'Food',
      'name': 'Expense',
      'price': wrapper.vm.money.prefix + '19' + wrapper.vm.money.decimal + '90',
      'parcel': 0,
      'parcelTotal': 0,
      'type': 'Casual',
      'situation': 'Pending',
      'observation': '',
      'validation': {}
    }]
    wrapper.vm.saving = true
    wrapper.vm.importing = true
    wrapper.vm.cancel()
    expect(wrapper.vm.saving).toBeFalsy()
    expect(wrapper.vm.importing).toBeFalsy()
    expect(typeof wrapper.vm.expenses).toBe('object')
    expect(wrapper.vm.expenses.length).toBe(0)
  })

  it('should return true in exists method', () => {
    wrapper.vm.expenses = [{
      'key': 1,
      'date': '2018-01-01',
      'category': 'Food',
      'name': 'Expense',
      'price': wrapper.vm.money.prefix + '19' + wrapper.vm.money.decimal + '90',
      'parcel': 0,
      'parcelTotal': 0,
      'type': 'Casual',
      'situation': 'Pending',
      'observation': '',
      'validation': {}
    }]
    expect(wrapper.vm.exists({key: 1})).toBeTruthy()
  })

  it('should return false in exists method', () => {
    wrapper.vm.expenses = [{
      'key': 1,
      'date': '2018-01-01',
      'category': 'Food',
      'name': 'Expense',
      'price': wrapper.vm.money.prefix + '19' + wrapper.vm.money.decimal + '90',
      'parcel': 0,
      'parcelTotal': 0,
      'type': 'Casual',
      'situation': 'Pending',
      'observation': '',
      'validation': {}
    }]
    expect(wrapper.vm.exists({key: 2})).toBeFalsy()
  })

  it('should dispatch notify with expense not found in remove method', () => {
    wrapper.vm.expenses = []
    expect(wrapper.vm.remove({key: 1})).toBeFalsy()
    expect(storeMocks.actions.notify).toBeCalled()
  })

  it('should remove a specific expense in remove method', () => {
    wrapper.vm.expenses = [
      {
        'key': 1,
        'date': '2018-01-01',
        'category': 'Food',
        'name': 'Expense',
        'price': wrapper.vm.money.prefix + '19' + wrapper.vm.money.decimal + '90',
        'parcel': 0,
        'parcelTotal': 0,
        'type': 'Casual',
        'situation': 'Pending',
        'observation': '',
        'validation': {}
      },
      {
        'key': 2,
        'date': '2018-01-02',
        'category': 'Food',
        'name': 'Expense',
        'price': wrapper.vm.money.prefix + '19' + wrapper.vm.money.decimal + '90',
        'parcel': 0,
        'parcelTotal': 0,
        'type': 'Casual',
        'situation': 'Pending',
        'observation': '',
        'validation': {}
      },
      {
        'key': 3,
        'date': '2018-01-03',
        'category': 'Food',
        'name': 'Expense',
        'price': wrapper.vm.money.prefix + '19' + wrapper.vm.money.decimal + '90',
        'parcel': 0,
        'parcelTotal': 0,
        'type': 'Casual',
        'situation': 'Pending',
        'observation': '',
        'validation': {}
      }
    ]
    expect(wrapper.vm.remove({key: 2})).toBeTruthy()
    expect(wrapper.vm.expenses.length).toBe(2)
  })

  it('should load expenses in loadDataSpreadSheet method', () => {
    wrapper.vm.importing = true
    wrapper.vm.expenses = [
      {
        'date': '2018-01-01',
        'category': 'Food',
        'name': 'Expense',
        'price': wrapper.vm.money.prefix + '19' + wrapper.vm.money.decimal + '90',
        'parcel': 0,
        'parcelTotal': 0,
        'type': 'Casual',
        'situation': 'Pending',
        'observation': '',
        'validation': {}
      }
    ]
    wrapper.vm.loadDataSpreadSheet([[
      {
        'Date': '2018-01-02',
        'Category': 'Food',
        'Name': 'Expense',
        'Parcel': 0,
        'ParcelTotal': 0,
        'Type': 'Casual',
        'Situation': 'Pending',
        'Observation': ''
      },
      {
        'Date': '2018-01-03',
        'Category': 'Food',
        'Name': 'Expense',
        'Price': 1990,
        'Parcel': 0,
        'ParcelTotal': 0,
        'Type': 'Casual',
        'Situation': 'Pending',
        'Observation': ''
      }
    ]])
    expect(wrapper.vm.expenses.length).toBe(2)
    expect(typeof wrapper.vm.expenses[0].validation).toBe('object')
    expect(wrapper.vm.importing).toBeFalsy()
  })

  it('should validate expense in validate method', () => {
    wrapper.vm.expenses = [
      {
        'date': '',
        'category': 'Food',
        'name': 'Expense',
        'price': wrapper.vm.money.prefix + '19' + wrapper.vm.money.decimal + '90',
        'parcel': 0,
        'parcelTotal': 0,
        'type': 'Casual',
        'situation': 'Pending',
        'observation': '',
        'validation': {}
      }
    ]
    wrapper.vm.validate()
    expect(wrapper.vm.expenses.length).toBe(1)
    expect(typeof wrapper.vm.expenses[0].validation).toBe('object')
    expect(typeof wrapper.vm.expenses[0].validation.date).toBe('string')
    expect(wrapper.vm.expenses[0].validation.date.length).toBeGreaterThan(0)
  })

  it('should dispatch notify with empty expenses in confirmImport method', () => {
    wrapper.vm.expenses = []
    wrapper.vm.saving = true
    expect(wrapper.vm.confirmImport()).toBeFalsy()
    expect(storeMocks.actions.notify).toBeCalled()
    expect(wrapper.vm.saving).toBeFalsy()
  })

  it('should not dispatch notify in confirmImport method', () => {
    jest.resetModules()
    jest.clearAllMocks()
    wrapper.vm.saving = false
    wrapper.vm.expenses = [{
      'saved': false,
      'key': 1,
      'date': '2018-01-02',
      'category': 'Tax',
      'name': 'Expense',
      'price': wrapper.vm.money.prefix + '19' + wrapper.vm.money.decimal + '90',
      'parcel': 0,
      'parcelTotal': 0,
      'type': 'Casual',
      'situation': 'Pending',
      'observation': '',
      'validation': {}
    }]
    wrapper.vm.confirmImport()
    expect(wrapper.vm.saving).toBeTruthy()
    expect(storeMocks.actions.notify).not.toBeCalled()
    expect(storeMocks.actions.createExpense).toBeCalled()
  })

  it('should set false to import in importSpreadSheet method', () => {
    wrapper.vm.importing = false
    wrapper.vm.importSpreadSheet()
  })

  it('should dispatch notify with empty file in readFile method', () => {
    wrapper.vm.importing = true
    expect(wrapper.vm.readFile()).toBeFalsy()
    expect(storeMocks.actions.notify).toBeCalled()
    expect(wrapper.vm.importing).toBeFalsy()
  })
})
