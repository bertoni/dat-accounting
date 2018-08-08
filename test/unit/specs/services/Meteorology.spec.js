jest.mock('axios', (params) => ({
  deafult: jest.fn()
}))

// {
//   console.log(params)
//   Promise.resolve({ data: {} })
// })

import {listLocations, currentWeather} from '@/services/Meteorology'
import axios from 'axios'

describe('Meteorology.js', () => {
  it('should return locations with empty name and state', () => {
    listLocations({})
    expect(axios).toBeCalled()
    // expect(typeof validation.date).toBe('string')
    // expect(validation.date).toBe('Date is empty')
    // expect(typeof validation.category).toBe('string')
    // expect(validation.category).toBe('Choose a category')
    // expect(typeof validation.name).toBe('string')
    // expect(validation.name).toBe('The name is required')
    // expect(typeof validation.price).toBe('string')
    // expect(validation.price).toBe('The price is required')
    // expect(typeof validation.type).toBe('string')
    // expect(validation.type).toBe('Choose a type')
    // expect(typeof validation.situation).toBe('string')
    // expect(validation.situation).toBe('Choose a situation')
  })
})
