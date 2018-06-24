import { mount } from '@vue/test-utils'
import QuickPanel from '@/components/QuickPanel'
import moment from 'moment'

describe('QuickPanel.vue', () => {
  it('should not have methods', () => {
    expect(typeof QuickPanel.methods).not.toBe('object')
  })

  it('should renders correctly component', () => {
    let wrapper = mount(QuickPanel)
    expect(wrapper.name()).toBe('QuickPanel')
    expect(wrapper.vm.week).toBe(moment().format('dddd'))
    expect(wrapper.vm.day).toBe(moment().format('DD'))
    expect(wrapper.vm.month).toBe(moment().format('MMM'))
  })
})
