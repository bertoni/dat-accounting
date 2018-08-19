import {listLocations, currentWeather} from '@/services/Meteorology'
import axios from 'axios'

jest.mock('axios', () => ({
  defaults: {
    baseURL: ''
  },
  get: jest.fn(() => Promise.resolve(true))
}))

const isPromise = (object) => {
  if (Promise && Promise.resolve) {
    return Promise.resolve(object) === object
  }
  return false
}

describe('Meteorology.js', () => {
  it('should call get on listLocations method', () => {
    expect(isPromise(listLocations('bla'))).toBeTruthy()
    expect(axios.get).toBeCalled()
  })

  it('should call get on listLocations method without name', () => {
    expect(isPromise(listLocations())).toBeTruthy()
    expect(axios.get).toBeCalled()
  })

  it('should call get on currentWeather method', () => {
    expect(isPromise(currentWeather('bla'))).toBeTruthy()
    expect(axios.get).toBeCalled()
  })
})
