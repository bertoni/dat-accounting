import { mount } from '@vue/test-utils'
import ItemAutocomplete from '@/components/ItemAutocomplete'

describe('ItemAutocomplete.vue', () => {
  it('should not have methods', () => {
    expect(typeof ItemAutocomplete.methods).not.toBe('object')
  })

  it('should renders correctly component with props', () => {
    let wrapper = mount(ItemAutocomplete, {
      propsData: {
        item: {name: 'São Paulo', state: 'SP', country: 'BR'}
      }
    })
    expect(wrapper.name()).toBe('ItemAutocomplete')
    expect(wrapper.vm.text).toBe('São Paulo (SP) - BR')
  })

  it('should renders correctly component without props', () => {
    let wrapper = mount(ItemAutocomplete, {
      propsData: {
        item: ''
      }
    })
    expect(wrapper.name()).toBe('ItemAutocomplete')
    expect(wrapper.vm.text).toBe('')
  })
})
