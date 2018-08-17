import Vue from 'vue'
import { shallowMount } from '@vue/test-utils'
import { __createMocks as createStoreMocks } from './../__mocks__/vuex'
import Dashboard from '@/components/pages/Dashboard'
import moment from 'moment'

console.warn = jest.genMockFunction()

Vue.config.silent = true
let wrapper
let storeMocks = createStoreMocks({
  getters: {},
  mutations: {},
  actions: {
    notify: jest.fn(() => {}),
    getReportById: jest.fn(() => Promise.resolve(true)),
    getExpense: jest.fn(() => Promise.resolve([])),
    updateReport: jest.fn(() => Promise.resolve(true))
  },
  state: {
    categories: ['Food', 'Tax', 'Transport']
  }
})

const Chart = function (name) {
  this.data = {}
  this.update = jest.fn(function () {
    return true
  })
}

jest.mock('chart.js', () => {
  return function (name) {
    this.data = {}
    this.update = jest.fn(function () {
      return true
    })
  }
})

describe('Dashboard.vue', () => {
  it('should have methods', () => {
    expect(typeof Dashboard.methods).toBe('object')
  })

  it('should have a mountCharts method', () => {
    expect(typeof Dashboard.methods.mountCharts).toBe('function')
  })

  it('should have an updateWeekTime method', () => {
    expect(typeof Dashboard.methods.updateWeekTime).toBe('function')
  })

  it('should have a toProcessDataExpense method', () => {
    expect(typeof Dashboard.methods.toProcessDataExpense).toBe('function')
  })

  it('should have a getCurrentMonth method', () => {
    expect(typeof Dashboard.methods.getCurrentMonth).toBe('function')
  })

  it('should have a getNextMonth method', () => {
    expect(typeof Dashboard.methods.getNextMonth).toBe('function')
  })

  it('should have a getPreviousMonth method', () => {
    expect(typeof Dashboard.methods.getPreviousMonth).toBe('function')
  })

  it('should have a createReport method', () => {
    expect(typeof Dashboard.methods.createReport).toBe('function')
  })

  it('should have a saveReport method', () => {
    expect(typeof Dashboard.methods.saveReport).toBe('function')
  })

  it('should renders correctly component', () => {
    wrapper = shallowMount(Dashboard, {
      store: storeMocks.store,
      Vue
    })
    expect(wrapper.name()).toBe('Dashboard')
    expect(wrapper.vm.loading).toBeTruthy()
    expect(wrapper.vm.activeMonth).toBe('current')
    expect(wrapper.vm.timerID).toBeGreaterThan(0)
    expect(wrapper.vm.weektime).toBe('')
    expect(wrapper.vm.year).toBe('')
    expect(wrapper.vm.day).toBe('')
    expect(wrapper.vm.month).toBe('')
    expect(typeof wrapper.vm.charts).toBe('object')
    expect(wrapper.vm.charts.byType).toBe('')
    expect(wrapper.vm.charts.byCategory).toBe('')
    expect(typeof wrapper.vm.report).toBe('object')
    expect(typeof wrapper.vm.money).toBe('object')
    expect(typeof wrapper.vm.money.format).toBe('function')
    expect(wrapper.vm.valueExpenses).toBe('-')
    expect(wrapper.vm.valuePending).toBe('-')
    expect(wrapper.vm.valueSettled).toBe('-')
    expect(wrapper.vm.quantityExpenses).toBe('-')
    expect(wrapper.vm.quantityPending).toBe('-')
    expect(wrapper.vm.quantitySettled).toBe('-')
    expect(wrapper.vm.categoryMostExpensive).toMatchObject({name: '-', price: '-', quantity: 0})
    expect(wrapper.vm.dataChartExpenseByType).toMatchObject({})
    expect(wrapper.vm.dataChartExpenseByCategory).toMatchObject({})
    expect(wrapper.vm.dateReport).toBe('Never generated')
  })

  it('should return price in valueExpenses method', () => {
    wrapper.vm.loading = false
    wrapper.vm.report = {}
    wrapper.vm.report.current = JSON.parse('{"situation":{"price":{"settled":3266.28,"pending":996.69},"quantity":{"settled":21,"pending":8}},"type":{"price":{"fixed":3533.34,"casual":589.1800000000001,"superfluous":140.45},"quantity":{"fixed":16,"casual":8,"superfluous":5}},"category":{"price":{"Clothing":40,"Communication":161.4,"Education":50.3,"Entertainment":45,"Food":480.59999999999997,"Health":135,"House Maintenance":383.26000000000005,"House Usage":408.53,"Hygiene and Beauty":80,"Investment":2000,"Personal":55,"Pets":0,"Security":0,"Tax":0,"Transport":423.88},"quantity":{"Clothing":1,"Communication":4,"Education":1,"Entertainment":2,"Food":6,"Health":2,"House Maintenance":3,"House Usage":2,"Hygiene and Beauty":2,"Investment":1,"Personal":1,"Pets":0,"Security":0,"Tax":0,"Transport":4}}}')
    expect(wrapper.vm.valueExpenses).toBe(wrapper.vm.money.format(3266.28 + 996.69))
  })

  it('should return price in valuePending method', () => {
    wrapper.vm.loading = false
    wrapper.vm.report = {}
    wrapper.vm.report.current = JSON.parse('{"situation":{"price":{"settled":3266.28,"pending":996.69},"quantity":{"settled":21,"pending":8}},"type":{"price":{"fixed":3533.34,"casual":589.1800000000001,"superfluous":140.45},"quantity":{"fixed":16,"casual":8,"superfluous":5}},"category":{"price":{"Clothing":40,"Communication":161.4,"Education":50.3,"Entertainment":45,"Food":480.59999999999997,"Health":135,"House Maintenance":383.26000000000005,"House Usage":408.53,"Hygiene and Beauty":80,"Investment":2000,"Personal":55,"Pets":0,"Security":0,"Tax":0,"Transport":423.88},"quantity":{"Clothing":1,"Communication":4,"Education":1,"Entertainment":2,"Food":6,"Health":2,"House Maintenance":3,"House Usage":2,"Hygiene and Beauty":2,"Investment":1,"Personal":1,"Pets":0,"Security":0,"Tax":0,"Transport":4}}}')
    expect(wrapper.vm.valuePending).toBe(wrapper.vm.money.format(996.69))
  })

  it('should return price in valueSettled method', () => {
    wrapper.vm.loading = false
    wrapper.vm.report = {}
    wrapper.vm.report.current = JSON.parse('{"situation":{"price":{"settled":3266.28,"pending":996.69},"quantity":{"settled":21,"pending":8}},"type":{"price":{"fixed":3533.34,"casual":589.1800000000001,"superfluous":140.45},"quantity":{"fixed":16,"casual":8,"superfluous":5}},"category":{"price":{"Clothing":40,"Communication":161.4,"Education":50.3,"Entertainment":45,"Food":480.59999999999997,"Health":135,"House Maintenance":383.26000000000005,"House Usage":408.53,"Hygiene and Beauty":80,"Investment":2000,"Personal":55,"Pets":0,"Security":0,"Tax":0,"Transport":423.88},"quantity":{"Clothing":1,"Communication":4,"Education":1,"Entertainment":2,"Food":6,"Health":2,"House Maintenance":3,"House Usage":2,"Hygiene and Beauty":2,"Investment":1,"Personal":1,"Pets":0,"Security":0,"Tax":0,"Transport":4}}}')
    expect(wrapper.vm.valueSettled).toBe(wrapper.vm.money.format(3266.28))
  })

  it('should return integer in quantityExpenses method', () => {
    wrapper.vm.loading = false
    wrapper.vm.report = {}
    wrapper.vm.report.current = JSON.parse('{"situation":{"price":{"settled":3266.28,"pending":996.69},"quantity":{"settled":21,"pending":8}},"type":{"price":{"fixed":3533.34,"casual":589.1800000000001,"superfluous":140.45},"quantity":{"fixed":16,"casual":8,"superfluous":5}},"category":{"price":{"Clothing":40,"Communication":161.4,"Education":50.3,"Entertainment":45,"Food":480.59999999999997,"Health":135,"House Maintenance":383.26000000000005,"House Usage":408.53,"Hygiene and Beauty":80,"Investment":2000,"Personal":55,"Pets":0,"Security":0,"Tax":0,"Transport":423.88},"quantity":{"Clothing":1,"Communication":4,"Education":1,"Entertainment":2,"Food":6,"Health":2,"House Maintenance":3,"House Usage":2,"Hygiene and Beauty":2,"Investment":1,"Personal":1,"Pets":0,"Security":0,"Tax":0,"Transport":4}}}')
    expect(wrapper.vm.quantityExpenses).toBe(29)
  })

  it('should return integer in quantityPending method', () => {
    wrapper.vm.loading = false
    wrapper.vm.report = {}
    wrapper.vm.report.current = JSON.parse('{"situation":{"price":{"settled":3266.28,"pending":996.69},"quantity":{"settled":21,"pending":8}},"type":{"price":{"fixed":3533.34,"casual":589.1800000000001,"superfluous":140.45},"quantity":{"fixed":16,"casual":8,"superfluous":5}},"category":{"price":{"Clothing":40,"Communication":161.4,"Education":50.3,"Entertainment":45,"Food":480.59999999999997,"Health":135,"House Maintenance":383.26000000000005,"House Usage":408.53,"Hygiene and Beauty":80,"Investment":2000,"Personal":55,"Pets":0,"Security":0,"Tax":0,"Transport":423.88},"quantity":{"Clothing":1,"Communication":4,"Education":1,"Entertainment":2,"Food":6,"Health":2,"House Maintenance":3,"House Usage":2,"Hygiene and Beauty":2,"Investment":1,"Personal":1,"Pets":0,"Security":0,"Tax":0,"Transport":4}}}')
    expect(wrapper.vm.quantityPending).toBe(8)
  })

  it('should return integer in quantitySettled method', () => {
    wrapper.vm.loading = false
    wrapper.vm.report = {}
    wrapper.vm.report.current = JSON.parse('{"situation":{"price":{"settled":3266.28,"pending":996.69},"quantity":{"settled":21,"pending":8}},"type":{"price":{"fixed":3533.34,"casual":589.1800000000001,"superfluous":140.45},"quantity":{"fixed":16,"casual":8,"superfluous":5}},"category":{"price":{"Clothing":40,"Communication":161.4,"Education":50.3,"Entertainment":45,"Food":480.59999999999997,"Health":135,"House Maintenance":383.26000000000005,"House Usage":408.53,"Hygiene and Beauty":80,"Investment":2000,"Personal":55,"Pets":0,"Security":0,"Tax":0,"Transport":423.88},"quantity":{"Clothing":1,"Communication":4,"Education":1,"Entertainment":2,"Food":6,"Health":2,"House Maintenance":3,"House Usage":2,"Hygiene and Beauty":2,"Investment":1,"Personal":1,"Pets":0,"Security":0,"Tax":0,"Transport":4}}}')
    expect(wrapper.vm.quantitySettled).toBe(21)
  })

  it('should return object in categoryMostExpensive method', () => {
    wrapper.vm.loading = false
    wrapper.vm.report = {}
    wrapper.vm.report.current = JSON.parse('{"situation":{"price":{"settled":3266.28,"pending":996.69},"quantity":{"settled":21,"pending":8}},"type":{"price":{"fixed":3533.34,"casual":589.1800000000001,"superfluous":140.45},"quantity":{"fixed":16,"casual":8,"superfluous":5}},"category":{"price":{"Clothing":40,"Communication":161.4,"Education":50.3,"Entertainment":45,"Food":480.59999999999997,"Health":135,"House Maintenance":383.26000000000005,"House Usage":408.53,"Hygiene and Beauty":80,"Investment":2000,"Personal":55,"Pets":0,"Security":0,"Tax":0,"Transport":423.88},"quantity":{"Clothing":1,"Communication":4,"Education":1,"Entertainment":2,"Food":6,"Health":2,"House Maintenance":3,"House Usage":2,"Hygiene and Beauty":2,"Investment":1,"Personal":1,"Pets":0,"Security":0,"Tax":0,"Transport":4}}}')
    expect(wrapper.vm.categoryMostExpensive).toMatchObject({name: 'Investment', price: wrapper.vm.money.format(2000), quantity: 1})
  })

  it('should return object in dataChartExpenseByType method', () => {
    wrapper.vm.loading = false
    wrapper.vm.report = {}
    wrapper.vm.report.current = JSON.parse('{"situation":{"price":{"settled":3266.28,"pending":996.69},"quantity":{"settled":21,"pending":8}},"type":{"price":{"fixed":3533.34,"casual":589.1800000000001,"superfluous":140.45},"quantity":{"fixed":16,"casual":8,"superfluous":5}},"category":{"price":{"Clothing":40,"Communication":161.4,"Education":50.3,"Entertainment":45,"Food":480.59999999999997,"Health":135,"House Maintenance":383.26000000000005,"House Usage":408.53,"Hygiene and Beauty":80,"Investment":2000,"Personal":55,"Pets":0,"Security":0,"Tax":0,"Transport":423.88},"quantity":{"Clothing":1,"Communication":4,"Education":1,"Entertainment":2,"Food":6,"Health":2,"House Maintenance":3,"House Usage":2,"Hygiene and Beauty":2,"Investment":1,"Personal":1,"Pets":0,"Security":0,"Tax":0,"Transport":4}}}')
    expect(wrapper.vm.dataChartExpenseByType).toMatchObject({
      datasets: [{
        data: [
          (3533.34).toFixed(2),
          (589.1800000000001).toFixed(2),
          (140.45).toFixed(2)
        ],
        backgroundColor: [
          '#2196F3',
          '#FFEB3B',
          '#F44336'
        ]
      }],
      labels: [
        'Fixed',
        'Casual',
        'Superfluous'
      ]
    })
  })

  it('should return object in dataChartExpenseByCategory method', () => {
    wrapper.vm.loading = false
    wrapper.vm.report = {}
    wrapper.vm.report.current = JSON.parse('{"situation":{"price":{"settled":3266.28,"pending":996.69},"quantity":{"settled":21,"pending":8}},"type":{"price":{"fixed":3533.34,"casual":589.1800000000001,"superfluous":140.45},"quantity":{"fixed":16,"casual":8,"superfluous":5}},"category":{"price":{"Clothing":40,"Communication":161.4,"Education":50.3,"Entertainment":45,"Food":480.59999999999997,"Health":135,"House Maintenance":383.26000000000005,"House Usage":408.53,"Hygiene and Beauty":80,"Investment":2000,"Personal":55,"Pets":0,"Security":0,"Tax":0,"Transport":423.88},"quantity":{"Clothing":1,"Communication":4,"Education":1,"Entertainment":2,"Food":6,"Health":2,"House Maintenance":3,"House Usage":2,"Hygiene and Beauty":2,"Investment":1,"Personal":1,"Pets":0,"Security":0,"Tax":0,"Transport":4}}}')
    expect(wrapper.vm.dataChartExpenseByCategory.datasets[0].data).toMatchObject(
      ['40.000', '161.400', '50.300', '45.000', '480.600', '135.000', '383.260', '408.530', '80.000', '2000.000', '55.000', '0.000', '0.000', '0.000', '423.880']
    )
    expect(wrapper.vm.dataChartExpenseByCategory.labels).toMatchObject(
      ['Clothing', 'Communication', 'Education', 'Entertainment', 'Food', 'Health', 'House Maintenance', 'House Usage', 'Hygiene and Beauty', 'Investment', 'Personal', 'Pets', 'Security', 'Tax', 'Transport']
    )
  })

  it('should return string in dateReport method', () => {
    wrapper.vm.loading = false
    wrapper.vm.report = {}
    wrapper.vm.report.date = moment()
    expect(wrapper.vm.dateReport.length).toBeGreaterThanOrEqual(1)
    // expect(wrapper.vm.dateReport).toMatch(/^[0-9]{4}-[0-9]{2}-[0-9]{2} [0-9]{2}:[0-9]{2}$/)
  })

  it('should update dates in updateWeekTime method', () => {
    let date = moment()
    wrapper.vm.updateWeekTime()
    expect(wrapper.vm.weektime).toBe(date.format('dddd') + ', ' + date.format('HH') + ':' + date.format('mm') + ':' + date.format('ss'))
    expect(parseInt(wrapper.vm.year)).toBeGreaterThanOrEqual(parseInt(date.format('YYYY')))
    expect(parseInt(wrapper.vm.day)).toBeGreaterThanOrEqual(parseInt(date.format('DD')))
    expect(wrapper.vm.month).toBe(date.format('MMM'))
  })

  it('should process report in toProcessDataExpense method', () => {
    wrapper.vm.report = {}
    let expenses = [
      {situation: 'Settled', type: 'Fixed', category: 'Food', price: 10.5},
      {situation: 'Settled', type: 'Casual', category: 'Tax', price: 17.1},
      {situation: 'Pending', type: 'Superfluous', category: 'Transport', price: 8.99}
    ]
    wrapper.vm.toProcessDataExpense(expenses, 'next')
    expect(typeof wrapper.vm.report).toBe('object')
    expect(typeof wrapper.vm.report.next).toBe('object')
    expect(typeof wrapper.vm.report.next.situation).toBe('object')
    expect(typeof wrapper.vm.report.next.situation.price).toBe('object')
    expect(typeof wrapper.vm.report.next.situation.quantity).toBe('object')
    expect(typeof wrapper.vm.report.next.type).toBe('object')
    expect(typeof wrapper.vm.report.next.type.price).toBe('object')
    expect(typeof wrapper.vm.report.next.type.quantity).toBe('object')
    expect(typeof wrapper.vm.report.next.category).toBe('object')
    expect(typeof wrapper.vm.report.next.category.price).toBe('object')
    expect(typeof wrapper.vm.report.next.category.quantity).toBe('object')
    expect(wrapper.vm.report.next.situation.price.settled).toBe(expenses[0].price + expenses[1].price)
    expect(wrapper.vm.report.next.situation.price.pending).toBe(expenses[2].price)
    expect(wrapper.vm.report.next.situation.quantity.settled).toBe(2)
    expect(wrapper.vm.report.next.situation.quantity.pending).toBe(1)
    expect(wrapper.vm.report.next.type.price.fixed).toBe(expenses[0].price)
    expect(wrapper.vm.report.next.type.price.casual).toBe(expenses[1].price)
    expect(wrapper.vm.report.next.type.price.superfluous).toBe(expenses[2].price)
    expect(wrapper.vm.report.next.type.quantity.fixed).toBe(1)
    expect(wrapper.vm.report.next.type.quantity.casual).toBe(1)
    expect(wrapper.vm.report.next.type.quantity.superfluous).toBe(1)
    expect(wrapper.vm.report.next.category.price.Food).toBe(expenses[0].price)
    expect(wrapper.vm.report.next.category.price.Tax).toBe(expenses[1].price)
    expect(wrapper.vm.report.next.category.price.Transport).toBe(expenses[2].price)
    expect(wrapper.vm.report.next.category.quantity.Food).toBe(1)
    expect(wrapper.vm.report.next.category.quantity.Tax).toBe(1)
    expect(wrapper.vm.report.next.category.quantity.Transport).toBe(1)
  })

  it('should dispatch getExpense in getCurrentMonth method', () => {
    jest.resetModules()
    jest.clearAllMocks()
    wrapper.vm.getCurrentMonth()
    expect(storeMocks.actions.getExpense).toBeCalled()
  })

  it('should dispatch getExpense in getNextMonth method', () => {
    jest.resetModules()
    jest.clearAllMocks()
    wrapper.vm.getNextMonth()
    expect(storeMocks.actions.getExpense).toBeCalled()
  })

  it('should dispatch getExpense in getPreviousMonth method', () => {
    jest.resetModules()
    jest.clearAllMocks()
    wrapper.vm.getPreviousMonth()
    expect(storeMocks.actions.getExpense).toBeCalled()
  })

  it('should dispatch getExpense in createReport method', () => {
    jest.resetModules()
    jest.clearAllMocks()
    wrapper.vm.loading = false
    wrapper.vm.createReport()
    expect(wrapper.vm.loading).toBeTruthy()
    expect(storeMocks.actions.getExpense).toBeCalled()
  })

  it('should dispatch updateReport in saveReport method', () => {
    jest.resetModules()
    jest.clearAllMocks()
    wrapper.vm.saveReport()
    expect(storeMocks.actions.updateReport).toBeCalled()
  })

  it('should create charts in mountCharts method', () => {
    jest.resetModules()
    jest.clearAllMocks()
    wrapper.vm.charts.byType = ''
    expect(wrapper.vm.mountCharts()).toBeTruthy()
  })

  it('should update charts in mountCharts method', () => {
    wrapper.vm.charts.byType = new Chart()
    wrapper.vm.charts.byCategory = new Chart()
    expect(wrapper.vm.mountCharts()).toBeFalsy()
    expect(wrapper.vm.charts.byType.update).toBeCalled()
    expect(wrapper.vm.charts.byCategory.update).toBeCalled()
  })
})
