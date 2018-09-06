import Vue from 'vue'
import { shallowMount } from '@vue/test-utils'
import { __createMocks as createStoreMocks } from './../__mocks__/vuex'
import ReportByYear from '@/components/pages/ReportByYear'
import {padStart} from '@/services/utilsOldES'
import moment from 'moment'

console.warn = jest.genMockFunction()
console.error = jest.genMockFunction()
window.dispatchEvent = jest.genMockFunction()

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

jest.mock('chart.js', () => {
  return function (name) {
    this.data = {}
    this.destroy = jest.fn(function () {
      return true
    })
  }
})

describe('ReportByYear.vue', () => {
  it('should test structure', () => {
    expect(typeof ReportByYear).toBe('object')
    expect(ReportByYear.name).toBe('ReportByYear')
    expect(typeof ReportByYear.props).not.toBe('object')
    expect(typeof ReportByYear.methods).toBe('object')
    expect(typeof ReportByYear.methods.prevYear).toBe('function')
    expect(typeof ReportByYear.methods.nextYear).toBe('function')
    expect(typeof ReportByYear.methods.changeCalendar).toBe('function')
    expect(typeof ReportByYear.methods.openPicker).toBe('function')
    expect(typeof ReportByYear.methods.mountCharts).toBe('function')
    expect(typeof ReportByYear.methods.toProcessDataMonth).toBe('function')
    expect(typeof ReportByYear.methods.getReportMonth).toBe('function')
    expect(typeof ReportByYear.methods.createReport).toBe('function')
    expect(typeof ReportByYear.methods.saveReport).toBe('function')
    expect(typeof ReportByYear.methods.loadData).toBe('function')
    expect(typeof ReportByYear.methods.successData).toBe('function')
  })

  it('should renders correctly component', () => {
    wrapper = shallowMount(ReportByYear, {
      store: storeMocks.store,
      Vue
    })
    expect(wrapper.vm.loading).toBeTruthy()
    expect(wrapper.vm.calendar instanceof Date).toBeTruthy()
    expect(wrapper.vm.currentDate instanceof moment).toBeTruthy()
    expect(typeof wrapper.vm.monthsOfYears).toBe('object')
    expect(wrapper.vm.monthsOfYears.length).toBe(12)
    expect(wrapper.vm.report).toMatchObject({})
    expect(typeof wrapper.vm.charts).toBe('object')
    expect(wrapper.vm.charts.bySituationMonth).toBe('')
    expect(wrapper.vm.charts.byTypeMonth).toBe('')
    expect(wrapper.vm.charts.byCategoryYear).toBe('')
    expect(wrapper.vm.idReport).toBe('by-year-' + moment().format('YYYY'))
    expect(wrapper.vm.labelCurrentYear).toBe(moment().format('YYYY'))
    expect(wrapper.vm.dateReport).toBe('Never generated')
    expect(wrapper.vm.dataChartExpenseBySituationByMonth).toMatchObject({})
    expect(wrapper.vm.dataChartExpenseByTypeByMonth).toMatchObject({})
    expect(wrapper.vm.dataChartExpenseByCategoryByYear).toMatchObject({})
  })

  it('should date of report in dateReport computed', () => {
    wrapper.vm.loading = false
    wrapper.vm.report = {date: new Date()}
    expect(wrapper.vm.dateReport).not.toBe('Never generated')
  })

  it('should return object in dataChartExpenseBySituationByMonth computed', () => {
    wrapper.vm.loading = false
    wrapper.vm.report = {}
    for (let i = 1; i <= 12; i++) {
      wrapper.vm.report[padStart(i.toString(), 2, '0')] = JSON.parse('{"situation":{"price":{"settled":3266.28,"pending":996.69},"quantity":{"settled":21,"pending":8}},"type":{"price":{"fixed":3533.34,"casual":589.1800000000001,"superfluous":140.45},"quantity":{"fixed":16,"casual":8,"superfluous":5}},"category":{"price":{"Clothing":40,"Communication":161.4,"Education":50.3,"Entertainment":45,"Food":480.59999999999997,"Health":135,"House Maintenance":383.26000000000005,"House Usage":408.53,"Hygiene and Beauty":80,"Investment":2000,"Personal":55,"Pets":0,"Security":0,"Tax":0,"Transport":423.88},"quantity":{"Clothing":1,"Communication":4,"Education":1,"Entertainment":2,"Food":6,"Health":2,"House Maintenance":3,"House Usage":2,"Hygiene and Beauty":2,"Investment":1,"Personal":1,"Pets":0,"Security":0,"Tax":0,"Transport":4}}}')
    }
    expect(wrapper.vm.dataChartExpenseBySituationByMonth).toMatchObject({
      datasets: [
        {
          label: 'Total',
          data: Array(12).fill((3266.28 + 996.69).toString()),
          backgroundColor: '#69B8EA',
          borderWidth: 0,
          yAxisID: 'y-axis-total'
        },
        {
          label: 'Settled',
          data: Array(12).fill('3266.28'),
          backgroundColor: '#009688',
          borderWidth: 0,
          yAxisID: 'y-axis-settled'
        },
        {
          label: 'Pending',
          data: Array(12).fill('996.69'),
          backgroundColor: '#F44336',
          borderWidth: 0,
          yAxisID: 'y-axis-pending'
        }
      ],
      labels: wrapper.vm.monthsOfYears
    })
  })

  it('should return object in dataChartExpenseByTypeByMonth computed', () => {
    wrapper.vm.loading = false
    wrapper.vm.report = {}
    for (let i = 1; i <= 12; i++) {
      wrapper.vm.report[padStart(i.toString(), 2, '0')] = JSON.parse('{"situation":{"price":{"settled":3266.28,"pending":996.69},"quantity":{"settled":21,"pending":8}},"type":{"price":{"fixed":3533.34,"casual":589.1800000000001,"superfluous":140.45},"quantity":{"fixed":16,"casual":8,"superfluous":5}},"category":{"price":{"Clothing":40,"Communication":161.4,"Education":50.3,"Entertainment":45,"Food":480.59999999999997,"Health":135,"House Maintenance":383.26000000000005,"House Usage":408.53,"Hygiene and Beauty":80,"Investment":2000,"Personal":55,"Pets":0,"Security":0,"Tax":0,"Transport":423.88},"quantity":{"Clothing":1,"Communication":4,"Education":1,"Entertainment":2,"Food":6,"Health":2,"House Maintenance":3,"House Usage":2,"Hygiene and Beauty":2,"Investment":1,"Personal":1,"Pets":0,"Security":0,"Tax":0,"Transport":4}}}')
    }
    expect(wrapper.vm.dataChartExpenseByTypeByMonth).toMatchObject({
      datasets: [
        {
          label: 'Fixed',
          data: Array(12).fill('3533.34'),
          backgroundColor: '#2196F3',
          borderWidth: 0,
          yAxisID: 'y-axis-fixed'
        },
        {
          label: 'Casual',
          data: Array(12).fill('589.18'),
          backgroundColor: '#FFEB3B',
          borderWidth: 0,
          yAxisID: 'y-axis-casual'
        },
        {
          label: 'Superfluous',
          data: Array(12).fill('140.45'),
          backgroundColor: '#F44336',
          borderWidth: 0,
          yAxisID: 'y-axis-superfluous'
        }
      ],
      labels: wrapper.vm.monthsOfYears
    })
  })

  it('should return object in dataChartExpenseByCategoryByYear computed', () => {
    wrapper.vm.loading = false
    wrapper.vm.report = {}
    for (let i = 1; i <= 12; i++) {
      wrapper.vm.report[padStart(i.toString(), 2, '0')] = JSON.parse('{"situation":{"price":{"settled":3266.28,"pending":996.69},"quantity":{"settled":21,"pending":8}},"type":{"price":{"fixed":3533.34,"casual":589.1800000000001,"superfluous":140.45},"quantity":{"fixed":16,"casual":8,"superfluous":5}},"category":{"price":{"Clothing":40,"Communication":161.4,"Education":50.3,"Entertainment":45,"Food":480.59999999999997,"Health":135,"House Maintenance":383.26000000000005,"House Usage":408.53,"Hygiene and Beauty":80,"Investment":2000,"Personal":55,"Pets":0,"Security":0,"Tax":0,"Transport":423.88},"quantity":{"Clothing":1,"Communication":4,"Education":1,"Entertainment":2,"Food":6,"Health":2,"House Maintenance":3,"House Usage":2,"Hygiene and Beauty":2,"Investment":1,"Personal":1,"Pets":0,"Security":0,"Tax":0,"Transport":4}}}')
    }
    expect(wrapper.vm.dataChartExpenseByCategoryByYear.datasets[0].data).toMatchObject(
      [(40.000 * 12).toFixed(2).toString(),
        (161.400 * 12).toFixed(2).toString(),
        (50.300 * 12).toFixed(2).toString(),
        (45.000 * 12).toFixed(2).toString(),
        (480.600 * 12).toFixed(2).toString(),
        (135.000 * 12).toFixed(2).toString(),
        (383.260 * 12).toFixed(2).toString(),
        (408.530 * 12).toFixed(2).toString(),
        (80.000 * 12).toFixed(2).toString(),
        (2000.000 * 12).toFixed(2).toString(),
        (55.000 * 12).toFixed(2).toString(),
        (0.000 * 12).toFixed(2).toString(),
        (0.000 * 12).toFixed(2).toString(),
        (0.000 * 12).toFixed(2).toString(),
        (423.880 * 12).toFixed(2).toString()]
    )
    expect(wrapper.vm.dataChartExpenseByCategoryByYear.labels).toMatchObject(
      ['Clothing', 'Communication', 'Education', 'Entertainment', 'Food', 'Health', 'House Maintenance', 'House Usage', 'Hygiene and Beauty', 'Investment', 'Personal', 'Pets', 'Security', 'Tax', 'Transport']
    )
  })

  it('should dispatch getReportById in prevYear method', () => {
    jest.resetModules()
    jest.clearAllMocks()
    wrapper.vm.prevYear()
    let year = moment().format('YYYY')
    expect(wrapper.vm.currentDate instanceof moment).toBeTruthy()
    expect(moment(wrapper.vm.currentDate).format('YYYY')).toBe((year - 1).toString())
    expect(storeMocks.actions.getReportById).toBeCalled()
  })

  it('should dispatch getReportById in nextYear method', () => {
    jest.resetModules()
    jest.clearAllMocks()
    wrapper.vm.nextYear()
    let year = moment().format('YYYY')
    expect(wrapper.vm.currentDate instanceof moment).toBeTruthy()
    expect(moment(wrapper.vm.currentDate).format('YYYY')).toBe(year.toString())
    expect(storeMocks.actions.getReportById).toBeCalled()
  })

  it('should dispatch getReportById in changeCalendar method', () => {
    jest.resetModules()
    jest.clearAllMocks()
    wrapper.vm.currentDate = moment()
    wrapper.vm.calendar = new Date(moment().subtract(1, 'months').toString())
    wrapper.vm.changeCalendar()
    expect(wrapper.vm.currentDate.format('MM')).toBe(moment().subtract(1, 'months').format('MM'))
    expect(storeMocks.actions.getReportById).toBeCalled()
  })

  it('should to call showCalendar in openPicker method', () => {
    wrapper.vm.$refs.programaticOpen = {
      showCalendar: jest.fn(function () {
        return true
      })
    }
    wrapper.vm.openPicker()
    expect(wrapper.vm.$refs.programaticOpen.showCalendar).toBeCalled()
  })

  it('should create charts in mountCharts method', () => {
    jest.resetModules()
    jest.clearAllMocks()
    wrapper.vm.report = {}
    for (let i = 1; i <= 12; i++) {
      wrapper.vm.report[padStart(i.toString(), 2, '0')] = JSON.parse('{"situation":{"price":{"settled":3266.28,"pending":996.69},"quantity":{"settled":21,"pending":8}},"type":{"price":{"fixed":3533.34,"casual":589.1800000000001,"superfluous":140.45},"quantity":{"fixed":16,"casual":8,"superfluous":5}},"category":{"price":{"Clothing":40,"Communication":161.4,"Education":50.3,"Entertainment":45,"Food":480.59999999999997,"Health":135,"House Maintenance":383.26000000000005,"House Usage":408.53,"Hygiene and Beauty":80,"Investment":2000,"Personal":55,"Pets":0,"Security":0,"Tax":0,"Transport":423.88},"quantity":{"Clothing":1,"Communication":4,"Education":1,"Entertainment":2,"Food":6,"Health":2,"House Maintenance":3,"House Usage":2,"Hygiene and Beauty":2,"Investment":1,"Personal":1,"Pets":0,"Security":0,"Tax":0,"Transport":4}}}')
    }
    wrapper.vm.charts.bySituationMonth = ''
    wrapper.vm.charts.byTypeMonth = ''
    wrapper.vm.charts.byCategoryYear = ''
    wrapper.vm.mountCharts()
    expect(wrapper.vm.charts.bySituationMonth.destroy).not.toBeCalled()
    expect(wrapper.vm.charts.byTypeMonth.destroy).not.toBeCalled()
    expect(wrapper.vm.charts.byCategoryYear.destroy).not.toBeCalled()
  })

  it('should process report in toProcessDataMonth method', () => {
    wrapper.vm.report = {}
    let expenses = [
      {situation: 'Settled', type: 'Fixed', category: 'Food', price: 10.5},
      {situation: 'Settled', type: 'Casual', category: 'Tax', price: 17.1},
      {situation: 'Pending', type: 'Superfluous', category: 'Transport', price: 8.99}
    ]
    wrapper.vm.toProcessDataMonth(expenses, '01')
    expect(typeof wrapper.vm.report).toBe('object')
    expect(typeof wrapper.vm.report['01']).toBe('object')
    expect(typeof wrapper.vm.report['01'].situation).toBe('object')
    expect(typeof wrapper.vm.report['01'].situation.price).toBe('object')
    expect(typeof wrapper.vm.report['01'].situation.quantity).toBe('object')
    expect(typeof wrapper.vm.report['01'].type).toBe('object')
    expect(typeof wrapper.vm.report['01'].type.price).toBe('object')
    expect(typeof wrapper.vm.report['01'].type.quantity).toBe('object')
    expect(typeof wrapper.vm.report['01'].category).toBe('object')
    expect(typeof wrapper.vm.report['01'].category.price).toBe('object')
    expect(typeof wrapper.vm.report['01'].category.quantity).toBe('object')
    expect(wrapper.vm.report['01'].situation.price.settled).toBe(expenses[0].price + expenses[1].price)
    expect(wrapper.vm.report['01'].situation.price.pending).toBe(expenses[2].price)
    expect(wrapper.vm.report['01'].situation.quantity.settled).toBe(2)
    expect(wrapper.vm.report['01'].situation.quantity.pending).toBe(1)
    expect(wrapper.vm.report['01'].type.price.fixed).toBe(expenses[0].price)
    expect(wrapper.vm.report['01'].type.price.casual).toBe(expenses[1].price)
    expect(wrapper.vm.report['01'].type.price.superfluous).toBe(expenses[2].price)
    expect(wrapper.vm.report['01'].type.quantity.fixed).toBe(1)
    expect(wrapper.vm.report['01'].type.quantity.casual).toBe(1)
    expect(wrapper.vm.report['01'].type.quantity.superfluous).toBe(1)
    expect(wrapper.vm.report['01'].category.price.Food).toBe(expenses[0].price)
    expect(wrapper.vm.report['01'].category.price.Tax).toBe(expenses[1].price)
    expect(wrapper.vm.report['01'].category.price.Transport).toBe(expenses[2].price)
    expect(wrapper.vm.report['01'].category.quantity.Food).toBe(1)
    expect(wrapper.vm.report['01'].category.quantity.Tax).toBe(1)
    expect(wrapper.vm.report['01'].category.quantity.Transport).toBe(1)
  })

  it('should dispatch getExpense in getReportMonth method', () => {
    jest.resetModules()
    jest.clearAllMocks()
    wrapper.vm.getReportMonth()
    expect(storeMocks.actions.getExpense).toBeCalled()
  })

  it('should dispatch getExpense in createReport method', () => {
    jest.resetModules()
    jest.clearAllMocks()
    wrapper.vm.loading = false
    wrapper.vm.createReport()
    expect(wrapper.vm.loading).toBeTruthy()
    expect(wrapper.vm.report).toMatchObject({})
    expect(storeMocks.actions.getExpense).toBeCalled()
  })

  it('should dispatch updateReport in saveReport method', () => {
    jest.resetModules()
    jest.clearAllMocks()
    wrapper.vm.saveReport()
    expect(storeMocks.actions.updateReport).toBeCalled()
  })

  it('should dispatch getReportById in loadData method', () => {
    jest.resetModules()
    jest.clearAllMocks()
    wrapper.vm.loading = false
    wrapper.vm.loadData()
    expect(wrapper.vm.loading).toBeTruthy()
    expect(storeMocks.actions.getReportById).toBeCalled()
  })

  it('should set loading with false in successData method', () => {
    jest.resetModules()
    jest.clearAllMocks()
    wrapper.vm.loading = true
    wrapper.vm.report = {}
    wrapper.vm.successData()
    expect(wrapper.vm.loading).toBeFalsy()
  })
})
