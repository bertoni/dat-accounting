import Vue from 'vue'
import { shallowMount } from '@vue/test-utils'
import ExpenseAdd from '@/components/pages/ExpenseAdd'

Vue.config.silent = true

let wrapper

describe('ExpenseAdd.vue', () => {
  it('should not have methods', () => {
    expect(typeof ExpenseAdd.methods).not.toBe('object')
  })

  it('should renders correctly component', () => {
    wrapper = shallowMount(ExpenseAdd)
    expect(wrapper.name()).toBe('ExpenseAdd')
    expect(wrapper.vm.date).toMatch(/[0-9]{4}(-[0-9]{2}){2}/)
    expect(wrapper.vm.category).toBe('')
    expect(wrapper.vm.name).toBe('')
    expect(wrapper.vm.price).toBe(0)
    expect(wrapper.vm.parcel).toBe(0)
    expect(wrapper.vm.type).toBe('')
    expect(wrapper.vm.situation).toBe('')
    expect(wrapper.vm.observation).toBe('')
  })
})
