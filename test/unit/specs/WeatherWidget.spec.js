import Vue from 'vue'
import { shallowMount } from '@vue/test-utils'
import { __createMocks as createStoreMocks } from './__mocks__/vuex'
import WeatherWidget from '@/components/WeatherWidget'
import {listLocations, currentWeather} from '@/services/Meteorology'

Vue.config.silent = true
let wrapper
let storeMocks = createStoreMocks({
  getters: {},
  mutations: {
    'SET_LOCATION' (state, location) {
      state.location.currentLocation = location
    },
    'REMOVE_LOCATION' (state) {
      state.location.currentLocation = {}
    },
    'SET_CURRENT_WEATHER' (state, currentWeather) {
      state.location.currentWeather = currentWeather
    }
  },
  actions: {
    setCurrentWeather: jest.fn((store, currentWeather) => {
      store.commit('SET_CURRENT_WEATHER', currentWeather)
    }),
    setLocation: jest.fn((store, location) => {
      store.commit('SET_LOCATION', location)
    }),
    removeLocation: jest.fn(store => {
      store.commit('REMOVE_LOCATION')
    })
  },
  state: {
    location: {
      currentLocation: {},
      currentWeather: {}
    }
  }
})

jest.mock('@/assets/images/loader.svg', () => '')

jest.mock('@/services/Meteorology', () => ({
  listLocations: jest.fn(() => Promise.resolve(true)),
  currentWeather: jest.fn(() => Promise.resolve({
    data: {
      query: {
        results: {
          channel: []
        }
      }
    }
  }))
}))

describe('WeatherWidget.vue', () => {
  it('should have methods', () => {
    expect(typeof WeatherWidget.methods).toBe('object')
  })

  it('should have a setCurrentWeather method', () => {
    expect(typeof WeatherWidget.methods.setCurrentWeather).toBe('function')
  })

  it('should have a clearLocation method', () => {
    expect(typeof WeatherWidget.methods.clearLocation).toBe('function')
  })

  it('should have an updateCurrentWeather method', () => {
    expect(typeof WeatherWidget.methods.updateCurrentWeather).toBe('function')
  })

  it('should have a change method', () => {
    expect(typeof WeatherWidget.methods.change).toBe('function')
  })

  it('should have an itemClicked method', () => {
    expect(typeof WeatherWidget.methods.itemClicked).toBe('function')
  })

  it('should have an itemSelected method', () => {
    expect(typeof WeatherWidget.methods.itemSelected).toBe('function')
  })

  it('should have an updateItems method', () => {
    expect(typeof WeatherWidget.methods.updateItems).toBe('function')
  })

  it('should have a setResultItems method', () => {
    expect(typeof WeatherWidget.methods.setResultItems).toBe('function')
  })

  it('should renders correctly component', () => {
    wrapper = shallowMount(WeatherWidget, {
      store: storeMocks.store,
      Vue
    })
    expect(wrapper.name()).toBe('WeatherWidget')
    expect(typeof wrapper.vm.search).toBe('object')
    expect(wrapper.vm.search.searching).toBeFalsy()
    expect(wrapper.vm.search.itemname).toBe('')
    expect(typeof wrapper.vm.search.template).toBe('object')
    expect(wrapper.vm.search.items).toMatchObject([])
    expect(wrapper.vm.search.itemSelected).toMatchObject({})
    expect(wrapper.vm.loader).toBe('')
    expect(wrapper.vm.location).toMatchObject({})
    expect(wrapper.vm.currentWeather).toMatchObject({})
    expect(wrapper.vm.hasLocation).toBeFalsy()
    expect(wrapper.vm.temperature).toBe('')
    expect(wrapper.vm.temperatureCode).toBe(0)
    expect(wrapper.vm.windSpeed).toBe('')
    expect(wrapper.vm.windDirection).toBe('')
    expect(wrapper.vm.windHumidity).toBe('')
    expect(wrapper.vm.tomorrow).toMatchObject({date: '', temperature: '', code: 0})
    expect(wrapper.vm.afterTomorrow).toMatchObject({date: '', temperature: '', code: 0})
    expect(wrapper.vm.afterAfterTomorrow).toMatchObject({date: '', temperature: '', code: 0})
  })

  it('should set search item in change method', () => {
    wrapper.vm.search.searching = false
    wrapper.vm.search.itemname = ''
    wrapper.vm.change('test')
    expect(wrapper.vm.search.searching).toBeTruthy()
    expect(wrapper.vm.search.itemname).toBe('test')
  })

  it('should format result items in setResultItems method', () => {
    wrapper.vm.search.items = []
    wrapper.vm.setResultItems([
      {woeid: 1, name: 'São Paulo', admin1: {content: 'SP'}, country: {code: 'BR'}},
      {woeid: 2, name: 'Rio de Janeiro', admin1: {content: 'RJ'}, country: {code: 'BR'}}
    ])
    expect(wrapper.vm.search.items[0]).toMatchObject({
      id: 1, name: 'São Paulo', state: 'SP', country: 'BR'
    })
    expect(wrapper.vm.search.items[1]).toMatchObject({
      id: 2, name: 'Rio de Janeiro', state: 'RJ', country: 'BR'
    })
  })

  it('should set location in itemClicked method', () => {
    wrapper.vm.search.itemname = ''
    wrapper.vm.search.itemSelected = {}
    wrapper.vm.itemClicked({id: 1, name: 'São Paulo'})
    expect(wrapper.vm.search.itemname).toBe('São Paulo')
    expect(wrapper.vm.search.itemSelected).toMatchObject({
      id: 1, name: 'São Paulo'
    })
    expect(storeMocks.actions.setLocation).toBeCalled()
  })

  it('should set currentWeather in setCurrentWeather method', () => {
    wrapper.vm.setCurrentWeather([])
    expect(storeMocks.actions.setCurrentWeather).toBeCalled()
  })

  it('should get weathers in updateCurrentWeather method', () => {
    wrapper.vm.updateCurrentWeather()
    expect(currentWeather).toBeCalled()
  })

  it('should dispatch setLocation in itemSelected method', () => {
    wrapper.vm.itemSelected({id: 1, name: 'São Paulo'})
    expect(storeMocks.actions.setLocation).toBeCalled()
  })

  it('should not dispatch setLocation in itemSelected method', () => {
    jest.resetModules()
    jest.clearAllMocks()
    wrapper.vm.itemSelected('')
    expect(storeMocks.actions.setLocation).not.toBeCalled()
  })

  it('should dispatch removeLocation in clearLocation method', () => {
    wrapper.vm.clearLocation()
    expect(storeMocks.actions.removeLocation).toBeCalled()
  })

  it('should get weathers in updateItems method', () => {
    wrapper.vm.search.searching = false
    wrapper.vm.updateItems('bla')
    expect(wrapper.vm.search.searching).toBeTruthy()
    expect(listLocations).toBeCalled()
  })

  it('should get computed values with currentWeather', () => {
    wrapper.vm.setCurrentWeather({
      wind: {
        speed: 28,
        direction: 225
      },
      atmosphere: {
        humidity: 67
      },
      item: {
        condition: {
          temp: 20,
          code: 1
        },
        forecast: [
          {},
          {date: '1', code: 1, high: 15, low: 15},
          {date: '2', code: 2, high: 20, low: 40},
          {date: '3', code: 3, high: 30, low: 20}
        ]
      }
    })
    expect(wrapper.vm.temperature).toBe(20)
    expect(wrapper.vm.temperatureCode).toBe(1)
    expect(wrapper.vm.windSpeed).toBe(28)
    expect(wrapper.vm.windDirection).toBe(225)
    expect(wrapper.vm.windHumidity).toBe(67)
    expect(wrapper.vm.tomorrow).toMatchObject({date: '1', temperature: 15, code: 1})
    expect(wrapper.vm.afterTomorrow).toMatchObject({date: '2', temperature: 30, code: 2})
    expect(wrapper.vm.afterAfterTomorrow).toMatchObject({date: '3', temperature: 25, code: 3})
  })
})
