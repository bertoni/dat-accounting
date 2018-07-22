import Vue from 'vue'
import { shallowMount } from '@vue/test-utils'
import { __createMocks as createStoreMocks } from './../__mocks__/vuex'
import ExpenseForm from '@/components/pages/ExpenseForm'

Vue.config.silent = true

let wrapper
let storeMocks = createStoreMocks({
  getters: {},
  mutations: {},
  actions: {
    notify: jest.fn((store, data) => {}),
    createExpenses: jest.fn((store, expense) => {
      if (expense.category === 'Food') {
        return Promise.reject(Error('error'))
      }
      return Promise.resolve(true)
    }),
    updateExpense: jest.fn((store, expense) => {
      if (expense.category === 'Food') {
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

describe('ExpenseForm.vue', () => {
  it('should have methods', () => {
    expect(typeof ExpenseForm.methods).toBe('object')
  })

  it('should have a clearExpense method', () => {
    expect(typeof ExpenseForm.methods.clearExpense).toBe('function')
  })

  it('should have a clearValidate method', () => {
    expect(typeof ExpenseForm.methods.clearValidate).toBe('function')
  })

  it('should have a dataIsValidate method', () => {
    expect(typeof ExpenseForm.methods.dataIsValidate).toBe('function')
  })

  it('should have a submit method', () => {
    expect(typeof ExpenseForm.methods.submit).toBe('function')
  })

  it('should have a save method', () => {
    expect(typeof ExpenseForm.methods.save).toBe('function')
  })

  it('should have a createSuccess method', () => {
    expect(typeof ExpenseForm.methods.createSuccess).toBe('function')
  })

  it('should have an updateSuccess method', () => {
    expect(typeof ExpenseForm.methods.updateSuccess).toBe('function')
  })

  it('should renders correctly component', () => {
    const date = '2018-01-01'
    const category = ''
    const name = ''
    const price = 0
    const parcel = 0
    const type = ''
    const situation = ''
    const observation = ''
    const id = ''
    const parcelTotal = 3
    wrapper = shallowMount(ExpenseForm, {
      propsData: {
        date: date,
        category: category,
        name: name,
        price: price,
        parcel: parcel,
        type: type,
        situation: situation,
        observation: observation,
        id: id,
        parcelTotal: parcelTotal
      },
      store: storeMocks.store,
      Vue
    })
    expect(wrapper.name()).toBe('ExpenseForm')
    expect(wrapper.props().date).toBe(date)
    expect(wrapper.props().category).toBe(category)
    expect(wrapper.props().name).toBe(name)
    expect(wrapper.props().price).toBe(price)
    expect(wrapper.props().parcel).toBe(parcel)
    expect(wrapper.props().type).toBe(type)
    expect(wrapper.props().situation).toBe(situation)
    expect(wrapper.props().observation).toBe(observation)
    expect(wrapper.props().id).toBe(id)
    expect(wrapper.props().parcelTotal).toBe(parcelTotal)
    expect(wrapper.vm.formValidated).toBeFalsy()
    expect(wrapper.vm.saving).toBeFalsy()
    expect(typeof wrapper.vm.validation).toBe('object')
    expect(wrapper.vm.validation.date).toBe('')
    expect(wrapper.vm.validation.category).toBe('')
    expect(wrapper.vm.validation.name).toBe('')
    expect(wrapper.vm.validation.price).toBe('')
    expect(wrapper.vm.validation.type).toBe('')
    expect(wrapper.vm.validation.situation).toBe('')
    expect(typeof wrapper.vm.expense).toBe('object')
    expect(wrapper.vm.expense.id).toBe(id)
    expect(wrapper.vm.expense.parcelTotal).toBe(parcelTotal)
    expect(wrapper.vm.expense.date).toBe(date)
    expect(wrapper.vm.expense.category).toBe(category)
    expect(wrapper.vm.expense.name).toBe(name)
    expect(wrapper.vm.expense.price.length).toBeGreaterThanOrEqual(1)
    expect(wrapper.vm.expense.parcel).toBe(parcel)
    expect(wrapper.vm.expense.type).toBe(type)
    expect(wrapper.vm.expense.situation).toBe(situation)
    expect(wrapper.vm.expense.observation).toBe(observation)
    expect(typeof wrapper.vm.money).toBe('object')
    expect(typeof wrapper.vm.money.decimal).toBe('string')
    expect(typeof wrapper.vm.money.thousands).toBe('string')
    expect(typeof wrapper.vm.money.prefix).toBe('string')
    expect(typeof wrapper.vm.money.suffix).toBe('string')
    expect(typeof wrapper.vm.money.precision).toBe('number')
    expect(wrapper.vm.money.masked).toBeFalsy()
    expect(wrapper.vm.categories).toMatchObject(storeMocks.state.categories)
    expect(wrapper.vm.types).toMatchObject(storeMocks.state.types)
    expect(wrapper.vm.situations).toMatchObject(storeMocks.state.situations)
  })

  it('should clear expense in clearExpense method', () => {
    wrapper.vm.expense.date = '2018-01-02'
    wrapper.vm.expense.category = 'Food'
    wrapper.vm.expense.name = 'Bla'
    wrapper.vm.expense.parcel = 1
    wrapper.vm.expense.type = 'Fixed'
    wrapper.vm.expense.situation = 'Pending'
    wrapper.vm.expense.observation = 'bla'
    wrapper.vm.clearExpense()
    expect(wrapper.vm.expense.date).toBe('')
    expect(wrapper.vm.expense.category).toBe('')
    expect(wrapper.vm.expense.name).toBe('')
    expect(wrapper.vm.expense.price.length).toBeGreaterThanOrEqual(1)
    expect(wrapper.vm.expense.parcel).toBe(0)
    expect(wrapper.vm.expense.type).toBe('')
    expect(wrapper.vm.expense.situation).toBe('')
    expect(wrapper.vm.expense.observation).toBe('')
    expect(wrapper.vm.expense.parcelTotal).toBe('')
  })

  it('should clear validations in clearValidate method', () => {
    wrapper.vm.formValidated = true
    wrapper.vm.validation.date = 'qsdasd'
    wrapper.vm.validation.category = 'asdnoasjd'
    wrapper.vm.validation.name = 'asdnoasjd'
    wrapper.vm.validation.price = 'asdnoasjd'
    wrapper.vm.validation.type = 'asdnoasjd'
    wrapper.vm.validation.situation = 'asdnoasjd'
    wrapper.vm.clearValidate()
    expect(wrapper.vm.formValidated).toBeFalsy()
    expect(typeof wrapper.vm.validation).toBe('object')
    expect(wrapper.vm.validation.date).toBe('')
    expect(wrapper.vm.validation.category).toBe('')
    expect(wrapper.vm.validation.name).toBe('')
    expect(wrapper.vm.validation.price).toBe('')
    expect(wrapper.vm.validation.type).toBe('')
    expect(wrapper.vm.validation.situation).toBe('')
  })

  it('should return true in dataIsValidate method', () => {
    expect(wrapper.vm.dataIsValidate()).toBeTruthy()
  })

  it('should return false in dataIsValidate method', () => {
    wrapper.vm.validation.price = 'asdnoasjd'
    expect(wrapper.vm.dataIsValidate()).toBeFalsy()
  })

  it('should dispatch notify in createSuccess method', () => {
    wrapper.vm.expense.date = '2018-01-02'
    wrapper.vm.expense.category = 'Food'
    wrapper.vm.expense.name = 'Bla'
    wrapper.vm.expense.parcel = 1
    wrapper.vm.expense.type = 'Fixed'
    wrapper.vm.expense.situation = 'Pending'
    wrapper.vm.expense.observation = 'bla'
    wrapper.vm.formValidated = true
    wrapper.vm.validation.date = 'qsdasd'
    wrapper.vm.validation.category = 'asdnoasjd'
    wrapper.vm.validation.name = 'asdnoasjd'
    wrapper.vm.validation.price = 'asdnoasjd'
    wrapper.vm.validation.type = 'asdnoasjd'
    wrapper.vm.validation.situation = 'asdnoasjd'
    wrapper.vm.createSuccess()
    expect(storeMocks.actions.notify).toBeCalled()
    expect(wrapper.vm.formValidated).toBeFalsy()
    expect(typeof wrapper.vm.validation).toBe('object')
    expect(wrapper.vm.validation.date).toBe('')
    expect(wrapper.vm.validation.category).toBe('')
    expect(wrapper.vm.validation.name).toBe('')
    expect(wrapper.vm.validation.price).toBe('')
    expect(wrapper.vm.validation.type).toBe('')
    expect(wrapper.vm.validation.situation).toBe('')
    expect(wrapper.vm.expense.date).toBe('')
    expect(wrapper.vm.expense.category).toBe('')
    expect(wrapper.vm.expense.name).toBe('')
    expect(wrapper.vm.expense.price.length).toBeGreaterThanOrEqual(1)
    expect(wrapper.vm.expense.parcel).toBe(0)
    expect(wrapper.vm.expense.type).toBe('')
    expect(wrapper.vm.expense.situation).toBe('')
    expect(wrapper.vm.expense.observation).toBe('')
    expect(wrapper.vm.expense.parcelTotal).toBe('')
  })

  it('should dispatch notify in updateSuccess method', () => {
    wrapper.vm.formValidated = true
    wrapper.vm.validation.date = 'qsdasd'
    wrapper.vm.validation.category = 'asdnoasjd'
    wrapper.vm.validation.name = 'asdnoasjd'
    wrapper.vm.validation.price = 'asdnoasjd'
    wrapper.vm.validation.type = 'asdnoasjd'
    wrapper.vm.validation.situation = 'asdnoasjd'
    wrapper.vm.updateSuccess()
    expect(storeMocks.actions.notify).toBeCalled()
    expect(wrapper.vm.formValidated).toBeFalsy()
    expect(typeof wrapper.vm.validation).toBe('object')
    expect(wrapper.vm.validation.date).toBe('')
    expect(wrapper.vm.validation.category).toBe('')
    expect(wrapper.vm.validation.name).toBe('')
    expect(wrapper.vm.validation.price).toBe('')
    expect(wrapper.vm.validation.type).toBe('')
    expect(wrapper.vm.validation.situation).toBe('')
  })

  it('should dispatch createExpense with success in save method', () => {
    wrapper.vm.saving = false
    wrapper.vm.formValidated = true
    wrapper.vm.validation.date = 'qsdasd'
    wrapper.vm.validation.category = 'asdnoasjd'
    wrapper.vm.validation.name = 'asdnoasjd'
    wrapper.vm.validation.price = 'asdnoasjd'
    wrapper.vm.validation.type = 'asdnoasjd'
    wrapper.vm.validation.situation = 'asdnoasjd'
    wrapper.vm.expense.category = 'Pets'
    wrapper.vm.save()
    expect(wrapper.vm.saving).toBeTruthy()
    expect(storeMocks.actions.createExpenses).toBeCalled()
  })

  it('should dispatch createExpense with error in save method', () => {
    wrapper.vm.saving = false
    wrapper.vm.expense.date = '2018-01-02'
    wrapper.vm.expense.category = 'Food'
    wrapper.vm.expense.name = 'Bla'
    wrapper.vm.expense.parcel = 1
    wrapper.vm.expense.type = 'Fixed'
    wrapper.vm.expense.situation = 'Pending'
    wrapper.vm.expense.observation = 'bla'
    wrapper.vm.save()
    expect(wrapper.vm.saving).toBeTruthy()
    expect(storeMocks.actions.createExpenses).toBeCalled()
  })

  it('should dispatch updateExpense with success in save method', () => {
    wrapper.vm.saving = false
    wrapper.vm.formValidated = true
    wrapper.vm.validation.date = 'qsdasd'
    wrapper.vm.validation.category = 'asdnoasjd'
    wrapper.vm.validation.name = 'asdnoasjd'
    wrapper.vm.validation.price = 'asdnoasjd'
    wrapper.vm.validation.type = 'asdnoasjd'
    wrapper.vm.validation.situation = 'asdnoasjd'
    wrapper.vm.expense.category = 'Pets'
    wrapper.vm.expense.id = '1p21idosoc'
    wrapper.vm.save()
    expect(wrapper.vm.saving).toBeTruthy()
    expect(storeMocks.actions.updateExpense).toBeCalled()
  })

  it('should dispatch updateExpense with error in save method', () => {
    wrapper.vm.saving = false
    wrapper.vm.expense.category = 'Food'
    wrapper.vm.expense.id = '1p21idosoc'
    wrapper.vm.save()
    expect(wrapper.vm.saving).toBeTruthy()
    expect(storeMocks.actions.updateExpense).toBeCalled()
  })

  it('should to set validations without save in submit method', () => {
    wrapper.vm.expense.date = ''
    wrapper.vm.expense.category = ''
    wrapper.vm.expense.name = ''
    wrapper.vm.expense.type = ''
    wrapper.vm.expense.situation = ''
    wrapper.vm.submit()
    expect(wrapper.vm.validation.date).toBe('Date is empty')
    expect(wrapper.vm.validation.category).toBe('Choose a category')
    expect(wrapper.vm.validation.name).toBe('The name is required')
    expect(wrapper.vm.validation.price).toBe('The price should be not empty')
    expect(wrapper.vm.validation.type).toBe('Choose a type')
    expect(wrapper.vm.validation.situation).toBe('Choose a situation')
    expect(wrapper.vm.formValidated).toBeTruthy()
    expect(wrapper.vm.dataIsValidate()).toBeFalsy()
  })

  it('should to save in submit method', () => {
    wrapper.vm.expense.date = '2018-01-01'
    wrapper.vm.expense.category = 'Transport'
    wrapper.vm.expense.name = 'Bla'
    wrapper.vm.expense.type = 'Superfluous'
    wrapper.vm.expense.situation = 'Pending'
    wrapper.vm.expense.price = wrapper.vm.money.prefix + '12' + wrapper.vm.money.decimal + '50'
    wrapper.vm.submit()
    expect(wrapper.vm.validation.date).toBe('')
    expect(wrapper.vm.validation.category).toBe('')
    expect(wrapper.vm.validation.name).toBe('')
    expect(wrapper.vm.validation.price).toBe('')
    expect(wrapper.vm.validation.type).toBe('')
    expect(wrapper.vm.validation.situation).toBe('')
    expect(wrapper.vm.formValidated).toBeTruthy()
    expect(wrapper.vm.dataIsValidate()).toBeTruthy()
  })
})
