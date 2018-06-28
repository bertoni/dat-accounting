import { mount } from '@vue/test-utils'
import Dashboard from '@/components/pages/Dashboard'
import moment from 'moment'

let wrapper

describe('Dashboard.vue', () => {
  it('should have methods', () => {
    expect(typeof Dashboard.methods).toBe('object')
  })

  it('should have an updateWeekTime method', () => {
    expect(typeof Dashboard.methods.updateWeekTime).toBe('function')
  })

  it('should renders correctly component', () => {
    wrapper = mount(Dashboard)
    expect(wrapper.name()).toBe('Dashboard')
    expect(wrapper.vm.timerID).toBeGreaterThan(0)
    expect(wrapper.vm.weektime).toBe('')
    expect(wrapper.vm.year).toBe('')
    expect(wrapper.vm.day).toBe('')
    expect(wrapper.vm.month).toBe('')
  })

  it('should update dates in updateWeekTime method', () => {
    let date = moment()
    wrapper.vm.updateWeekTime()
    expect(wrapper.vm.weektime).toBe(date.format('dddd') + ', ' + date.format('HH') + ':' + date.format('mm') + ':' + date.format('ss'))
    expect(parseInt(wrapper.vm.year)).toBeGreaterThanOrEqual(parseInt(date.format('YYYY')))
    expect(parseInt(wrapper.vm.day)).toBeGreaterThanOrEqual(parseInt(date.format('DD')))
    expect(wrapper.vm.month.length).toBeGreaterThan(0)
  })
})
