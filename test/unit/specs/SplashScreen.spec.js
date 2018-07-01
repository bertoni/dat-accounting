import { mount } from '@vue/test-utils'
import SplashScreen from '@/components/SplashScreen'

describe('SplashScreen.vue', () => {
  it('should not have methods', () => {
    expect(typeof SplashScreen.methods).not.toBe('object')
  })

  it('should renders correctly component', () => {
    let wrapper = mount(SplashScreen)
    expect(wrapper.name()).toBe('SplashScreen')
  })
})
