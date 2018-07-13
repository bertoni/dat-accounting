import Vue from 'vue'
import { shallowMount } from '@vue/test-utils'
import { __createMocks as createStoreMocks } from './../__mocks__/vuex'
import ExpenseList from '@/components/pages/ExpenseList'
import Moment from 'moment'

Vue.config.silent = true

let wrapper
let storeMocks = createStoreMocks({
  getters: {},
  mutations: {},
  actions: {
    notify: jest.fn(() => {}),
    openModalConfirm: jest.fn(() => {}),
    closeModalConfirm: jest.fn(() => {}),
    removeExpense: jest.fn(() => Promise.resolve(true)),
    getExpense: jest.fn((store, filter) => {
      if (filter.month === Moment().subtract(2, 'd').format('MM')) {
        return Promise.reject(Error('error'))
      }
      return Promise.resolve([
        {id: 1, name: 'Abc', category: 'Food', parcel: 0, type: 'Fixed', situation: 'Pending', date: '2018-01-01', price: 12.50},
        {id: 2, name: 'Abc', category: 'Food', parcel: 0, type: 'Fixed', situation: 'Pending', date: '2018-01-02', price: 15.50}
      ])
    })
  },
  state: {}
})

describe('ExpenseList.vue', () => {
  it('should have methods', () => {
    expect(typeof ExpenseList.methods).toBe('object')
  })

  it('should have a getColorSituaton method', () => {
    expect(typeof ExpenseList.methods.getColorSituaton).toBe('function')
  })

  it('should have a setFooter method', () => {
    expect(typeof ExpenseList.methods.setFooter).toBe('function')
  })

  it('should have a getExpense method', () => {
    expect(typeof ExpenseList.methods.getExpense).toBe('function')
  })

  it('should have a setExpenses method', () => {
    expect(typeof ExpenseList.methods.setExpenses).toBe('function')
  })

  it('should have a formatRow method', () => {
    expect(typeof ExpenseList.methods.formatRow).toBe('function')
  })

  it('should have a remove method', () => {
    expect(typeof ExpenseList.methods.remove).toBe('function')
  })

  it('should have an edit method', () => {
    expect(typeof ExpenseList.methods.edit).toBe('function')
  })

  it('should have a confirmRemove method', () => {
    expect(typeof ExpenseList.methods.confirmRemove).toBe('function')
  })

  it('should have an effectRemove method', () => {
    expect(typeof ExpenseList.methods.effectRemove).toBe('function')
  })

  it('should have a prevMonth method', () => {
    expect(typeof ExpenseList.methods.prevMonth).toBe('function')
  })

  it('should have a nextMonth method', () => {
    expect(typeof ExpenseList.methods.nextMonth).toBe('function')
  })

  it('should have a changeCalendar method', () => {
    expect(typeof ExpenseList.methods.changeCalendar).toBe('function')
  })

  it('should have a openPicker method', () => {
    expect(typeof ExpenseList.methods.openPicker).toBe('function')
  })

  it('should renders correctly component', () => {
    wrapper = shallowMount(ExpenseList, {
      store: storeMocks.store,
      Vue
    })
    expect(wrapper.name()).toBe('ExpenseList')
    expect(wrapper.vm.loading).toBeTruthy()
    expect(typeof wrapper.vm.currentDate).toBe('object')
    expect(wrapper.vm.currentDate instanceof Moment).toBeTruthy()
    expect(wrapper.vm.calendar instanceof Date).toBeTruthy()
    expect(wrapper.vm.dataRemove).toBe('')
    expect(wrapper.vm.expenses).toMatchObject([])
    expect(wrapper.vm.footer).toMatchObject([])
    expect(wrapper.vm.labelCurrentDate).toMatch(/[a-z]+\/[0-9]{4}/)
    expect(wrapper.vm.totalPrice).toBe(0)
    expect(wrapper.vm.paidPrice).toBe(0)
    expect(wrapper.vm.remainingPrice).toBe(0)
    expect(wrapper.vm.fixedPercent).toBe(0)
    expect(wrapper.vm.casualPercent).toBe(0)
    expect(wrapper.vm.superfluousPercent).toBe(0)
  })

  it('should return correct color in getColorSituaton method', () => {
    expect(wrapper.vm.getColorSituaton('Pending')).toBe('text-danger')
    expect(wrapper.vm.getColorSituaton('Settled')).toBe('text-success')
    expect(wrapper.vm.getColorSituaton('Another')).toBe('text-secondary')
  })

  it('should return correct color in getColorSituaton method', () => {
    expect(wrapper.vm.getColorSituaton('Pending')).toBe('text-danger')
    expect(wrapper.vm.getColorSituaton('Settled')).toBe('text-success')
    expect(wrapper.vm.getColorSituaton('Another')).toBe('text-secondary')
  })

  it('should set footer in setFooter method', () => {
    wrapper.vm.footer = []
    wrapper.vm.expenses = [
      {id: 1, name: 'Abc', category: 'Food', parcel: 0, type: 'Fixed', situation: 'Pending', date: '2018-01-01', price: '10.50'},
      {id: 2, name: 'Abc', category: 'Food', parcel: 0, type: 'Superfluous', situation: 'Settled', date: '2018-01-01', price: '20.30'}
    ]
    wrapper.vm.setFooter()
    expect(wrapper.vm.footer.length).toBe(3)
    expect(wrapper.vm.footer[0].id).toBe('')
    expect(wrapper.vm.footer[0].date).toBe('')
    expect(wrapper.vm.footer[0].category).toBe('')
    expect(wrapper.vm.footer[0].parcel).toBe('')
    expect(wrapper.vm.footer[0].name).toMatch(/Total Price/)
    expect(wrapper.vm.footer[0].type).toBe('Fixed')
    expect(wrapper.vm.footer[0].price).toMatch(/\$[0-9]+/)
    expect(wrapper.vm.footer[0].situation).toMatch(/[0-9]{2}.[0-9]%/)
    expect(wrapper.vm.footer[1].id).toBe('')
    expect(wrapper.vm.footer[1].date).toBe('')
    expect(wrapper.vm.footer[1].category).toBe('')
    expect(wrapper.vm.footer[1].parcel).toBe('')
    expect(wrapper.vm.footer[1].name).toMatch(/Paid Price/)
    expect(wrapper.vm.footer[1].type).toBe('Casual')
    expect(wrapper.vm.footer[1].price).toMatch(/\$[0-9]+/)
    expect(wrapper.vm.footer[1].situation).toMatch(/[0-9]{2}.[0-9]%/)
    expect(wrapper.vm.footer[2].id).toBe('')
    expect(wrapper.vm.footer[2].date).toBe('')
    expect(wrapper.vm.footer[2].category).toBe('')
    expect(wrapper.vm.footer[2].parcel).toBe('')
    expect(wrapper.vm.footer[2].name).toMatch(/Remaining Price/)
    expect(wrapper.vm.footer[2].type).toBe('Superfluous')
    expect(wrapper.vm.footer[2].price).toMatch(/\$[0-9]+/)
    expect(wrapper.vm.footer[2].situation).toMatch(/[0-9]{2}.[0-9]%/)
  })

  it('should format data in formatRow method', () => {
    let unformated = {
      id: 2, name: 'Abc', category: 'Food', parcel: 1, type: 'Superfluous', situation: 'Settled', date: '2018-01-01', price: '20.30', parcelTotal: 3
    }
    let formated = wrapper.vm.formatRow(unformated)
    expect(formated.id).toBe(unformated.id)
    expect(formated.name).toBe(unformated.name)
    expect(formated.category).toBe(unformated.category)
    expect(formated.parcel).toBe(unformated.parcel + ' of ' + unformated.parcelTotal)
    expect(formated.type).toBe(unformated.type)
    let regSituation = new RegExp(unformated.situation)
    expect(formated.situation).toMatch(regSituation)
    expect(formated.date).toMatch(/[0-9]{4}(-[0-9]{2}){2}/)
    expect(formated.price).toMatch(/\$[0-9]+/)
  })

  it('should set expense data in setExpenses method', () => {
    wrapper.vm.footer = []
    wrapper.vm.expenses = []
    wrapper.vm.loading = true
    wrapper.vm.setExpenses([
      {id: 1, name: 'Abc', category: 'Food', parcel: 0, type: 'Fixed', situation: 'Pending', date: '2018-01-01', price: '10.50'},
      {id: 2, name: 'Abc', category: 'Food', parcel: 0, type: 'Superfluous', situation: 'Settled', date: '2018-01-01', price: '20.30'}
    ])
    expect(wrapper.vm.footer.length).toBe(3)
    expect(wrapper.vm.expenses.length).toBe(2)
    expect(wrapper.vm.loading).toBeFalsy()
  })

  it('should get expense data in getExpense method', () => {
    wrapper.vm.loading = false
    wrapper.vm.getExpense()
    expect(wrapper.vm.loading).toBeTruthy()
    expect(storeMocks.actions.getExpense).toBeCalled()
  })

  it('should open modal confirm in remove method', () => {
    wrapper.vm.dataRemove = ''
    wrapper.vm.remove({id: 1})
    expect(wrapper.vm.dataRemove).toMatchObject({id: 1})
    expect(storeMocks.actions.openModalConfirm).toBeCalled()
  })

  it('should to dispatch removeExpense in confirmRemove method', () => {
    wrapper.vm.confirmRemove()
    expect(storeMocks.actions.closeModalConfirm).toBeCalled()
    expect(storeMocks.actions.removeExpense).toBeCalled()
  })

  it('should to remove expense in effectRemove method', () => {
    wrapper.vm.dataRemove = {id: 2}
    wrapper.vm.expenses = [
      {id: 1, name: 'Abc', category: 'Food', parcel: 0, type: 'Fixed', situation: 'Pending', date: '2018-01-01', price: '10.50'},
      {id: 2, name: 'Abc', category: 'Food', parcel: 0, type: 'Superfluous', situation: 'Settled', date: '2018-01-01', price: '20.30'},
      {id: 3, name: 'Abc', category: 'Food', parcel: 0, type: 'Superfluous', situation: 'Settled', date: '2018-01-01', price: '20.30'}
    ]
    wrapper.vm.effectRemove()
    expect(wrapper.vm.dataRemove).toMatchObject({})
    expect(wrapper.vm.footer.length).toBe(3)
    expect(wrapper.vm.expenses.length).toBe(2)
    expect(storeMocks.actions.notify).toBeCalled()
  })

  it('should dispatch notify with error in effectRemove method', () => {
    wrapper.vm.dataRemove = {id: 6}
    wrapper.vm.expenses = [
      {id: 1, name: 'Abc', category: 'Food', parcel: 0, type: 'Fixed', situation: 'Pending', date: '2018-01-01', price: '10.50'},
      {id: 2, name: 'Abc', category: 'Food', parcel: 0, type: 'Superfluous', situation: 'Settled', date: '2018-01-01', price: '20.30'},
      {id: 3, name: 'Abc', category: 'Food', parcel: 0, type: 'Superfluous', situation: 'Settled', date: '2018-01-01', price: '20.30'}
    ]
    wrapper.vm.effectRemove()
    expect(wrapper.vm.dataRemove).toMatchObject({id: 6})
    expect(wrapper.vm.expenses.length).toBe(3)
    expect(storeMocks.actions.notify).toBeCalled()
  })

  it('should to change current month filter to prev in prevMonth method', () => {
    wrapper.vm.currentDate = Moment()
    wrapper.vm.prevMonth()
    expect(wrapper.vm.currentDate.format('MM')).toBe(Moment().subtract(1, 'months').format('MM'))
    expect(wrapper.vm.calendar.getFullYear().toString()).toBe(Moment().subtract(1, 'months').format('YYYY'))
    expect((wrapper.vm.calendar.getMonth() + 1).toString()).toBe(Moment().subtract(1, 'months').format('M'))
  })

  it('should to change current month filter to next in nextMonth method', () => {
    wrapper.vm.currentDate = Moment()
    wrapper.vm.nextMonth()
    expect(wrapper.vm.currentDate.format('MM')).toBe(Moment().add(1, 'months').format('MM'))
    expect(wrapper.vm.calendar.getFullYear().toString()).toBe(Moment().add(1, 'months').format('YYYY'))
    expect((wrapper.vm.calendar.getMonth() + 1).toString()).toBe(Moment().add(1, 'months').format('M'))
  })

  it('should to change calendar in changeCalendar method', () => {
    wrapper.vm.currentDate = Moment()
    wrapper.vm.calendar = new Date(Moment().subtract(1, 'months').toString())
    wrapper.vm.changeCalendar()
    expect(wrapper.vm.currentDate.format('MM')).toBe(Moment().subtract(1, 'months').format('MM'))
  })

  it('should to push router in edit method', () => {
    wrapper = shallowMount(ExpenseList, {
      mocks: {
        $router: []
      },
      store: storeMocks.store,
      Vue
    })
    wrapper.vm.edit({id: 1})
    expect(wrapper.vm.$router[0].name).toBe('expense-edit')
    expect(typeof wrapper.vm.$router[0].params).toBe('object')
    expect(wrapper.vm.$router[0].params.id).toBe(1)
  })

  it('should to return sum of total price in totalPrice variable', () => {
    wrapper.vm.expenses = [
      {id: 1, name: 'Abc', category: 'Food', parcel: 0, type: 'Fixed', situation: 'Pending', date: '2018-01-01', price: '10.50'},
      {id: 2, name: 'Abc', category: 'Food', parcel: 0, type: 'Superfluous', situation: 'Settled', date: '2018-01-01', price: '20.30'},
      {id: 3, name: 'Abc', category: 'Food', parcel: 0, type: 'Superfluous', situation: 'Settled', date: '2018-01-01', price: '20.30'}
    ]
    expect(wrapper.vm.totalPrice).toBe(10.5 + 20.3 + 20.3)
  })

  it('should to return sum of paid price in paidPrice variable', () => {
    wrapper.vm.expenses = [
      {id: 1, name: 'Abc', category: 'Food', parcel: 0, type: 'Fixed', situation: 'Pending', date: '2018-01-01', price: '10.50'},
      {id: 2, name: 'Abc', category: 'Food', parcel: 0, type: 'Superfluous', situation: 'Settled', date: '2018-01-01', price: '20.30'},
      {id: 3, name: 'Abc', category: 'Food', parcel: 0, type: 'Superfluous', situation: 'Settled', date: '2018-01-01', price: '20.30'}
    ]
    expect(wrapper.vm.paidPrice).toBe(20.3 + 20.3)
  })

  it('should to return sum of remaining price in remainingPrice variable', () => {
    wrapper.vm.expenses = [
      {id: 1, name: 'Abc', category: 'Food', parcel: 0, type: 'Fixed', situation: 'Pending', date: '2018-01-01', price: '10.50'},
      {id: 2, name: 'Abc', category: 'Food', parcel: 0, type: 'Superfluous', situation: 'Settled', date: '2018-01-01', price: '20.30'},
      {id: 3, name: 'Abc', category: 'Food', parcel: 0, type: 'Superfluous', situation: 'Pending', date: '2018-01-01', price: '20.30'}
    ]
    expect(wrapper.vm.remainingPrice).toBe(10.5 + 20.3)
  })

  it('should to return percent of fixed expenses in fixedPercent variable', () => {
    wrapper.vm.expenses = [
      {id: 1, name: 'Abc', category: 'Food', parcel: 0, type: 'Casual', situation: 'Pending', date: '2018-01-01', price: '10.50'},
      {id: 2, name: 'Abc', category: 'Food', parcel: 0, type: 'Fixed', situation: 'Settled', date: '2018-01-01', price: '20.30'},
      {id: 3, name: 'Abc', category: 'Food', parcel: 0, type: 'Superfluous', situation: 'Pending', date: '2018-01-01', price: '20.30'}
    ]
    expect(wrapper.vm.fixedPercent).toBe(((20.3 * 100) / (10.5 + 20.3 + 20.3)) * 100)
  })

  it('should to return percent of casual expenses in casualPercent variable', () => {
    wrapper.vm.expenses = [
      {id: 1, name: 'Abc', category: 'Food', parcel: 0, type: 'Casual', situation: 'Pending', date: '2018-01-01', price: '10.50'},
      {id: 2, name: 'Abc', category: 'Food', parcel: 0, type: 'Fixed', situation: 'Settled', date: '2018-01-01', price: '20.30'},
      {id: 3, name: 'Abc', category: 'Food', parcel: 0, type: 'Superfluous', situation: 'Pending', date: '2018-01-01', price: '20.30'}
    ]
    expect(wrapper.vm.casualPercent).toBe(((10.5 * 100) / (10.5 + 20.3 + 20.3)) * 100)
  })

  it('should to return percent of superfluous expenses in superfluousPercent variable', () => {
    wrapper.vm.expenses = [
      {id: 1, name: 'Abc', category: 'Food', parcel: 0, type: 'Casual', situation: 'Pending', date: '2018-01-01', price: '10.50'},
      {id: 2, name: 'Abc', category: 'Food', parcel: 0, type: 'Fixed', situation: 'Settled', date: '2018-01-01', price: '20.30'},
      {id: 3, name: 'Abc', category: 'Food', parcel: 0, type: 'Superfluous', situation: 'Pending', date: '2018-01-01', price: '27.50'}
    ]
    expect(wrapper.vm.superfluousPercent).toBe(((27.5 * 100) / (10.5 + 20.3 + 27.5)) * 100)
  })
})
