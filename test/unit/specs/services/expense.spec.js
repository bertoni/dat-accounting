import {validate} from '@/services/expense'

describe('expense.js', () => {
  it('should validate with empty expense', () => {
    let validation = {}
    validate({}, validation)
    expect(typeof validation.date).toBe('string')
    expect(validation.date).toBe('Date is empty')
    expect(typeof validation.category).toBe('string')
    expect(validation.category).toBe('Choose a category')
    expect(typeof validation.name).toBe('string')
    expect(validation.name).toBe('The name is required')
    expect(typeof validation.price).toBe('string')
    expect(validation.price).toBe('The price is required')
    expect(typeof validation.type).toBe('string')
    expect(validation.type).toBe('Choose a type')
    expect(typeof validation.situation).toBe('string')
    expect(validation.situation).toBe('Choose a situation')
  })

  it('should validate with empty data expense', () => {
    let validation = {}
    validate({date: ' ', category: ' ', name: ' ', price: ' ', type: ' ', situation: ' '}, validation)
    expect(typeof validation.date).toBe('string')
    expect(validation.date).toBe('Date incorrect')
    expect(typeof validation.category).toBe('string')
    expect(validation.category).toBe('Choose a category')
    expect(typeof validation.name).toBe('string')
    expect(validation.name).toBe('The name is required')
    expect(typeof validation.price).toBe('string')
    expect(validation.price).toBe('The price is required')
    expect(typeof validation.type).toBe('string')
    expect(validation.type).toBe('Choose a type')
    expect(typeof validation.situation).toBe('string')
    expect(validation.situation).toBe('Choose a situation')
  })

  it('should validate with wrong data expense', () => {
    let validation = {}
    validate({date: ' ', category: 'Bla', name: ' ', price: '$ 0.00', type: 'Bla', situation: 'Bla'}, validation)
    expect(typeof validation.date).toBe('string')
    expect(validation.date).toBe('Date incorrect')
    expect(typeof validation.category).toBe('string')
    expect(validation.category).toBe('Invalid category')
    expect(typeof validation.name).toBe('string')
    expect(validation.name).toBe('The name is required')
    expect(typeof validation.price).toBe('string')
    expect(validation.price).toBe('The price should be not empty')
    expect(typeof validation.type).toBe('string')
    expect(validation.type).toBe('Invalid type')
    expect(typeof validation.situation).toBe('string')
    expect(validation.situation).toBe('Invalid situation')
  })

  it('should validate with correct data expense', () => {
    let validation = {}
    validate(
      {date: '2018-01-01', category: 'Bla', name: 'Bla', price: 12.60, type: 'Bla', situation: 'Bla'},
      validation,
      ['Bla'],
      ['Bla'],
      ['Bla']
    )
    expect(Object.keys(validation).length).toBe(0)
  })
})
