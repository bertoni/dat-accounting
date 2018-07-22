import mutations from '@/vuex/mutations'
import actions from '@/vuex/actions'
import { __createMocks as createStoreMocks } from '../__mocks__/vuex'

jest.mock('./../../../../src/vuex/api/index.js', () => ({
  infra: {
    addWebDB: jest.fn(() => Promise.resolve(true)),
    addCurrentWebDB: jest.fn(() => Promise.resolve({key: 1})),
    openDB: jest.fn(() => Promise.resolve({key: 1})),
    create: jest.fn(() => Promise.resolve({url: 'dat://ijwd9ij1di'})),
    makeStructure: jest.fn(() => Promise.resolve(true)),
    removeWebDB: jest.fn(() => true),
    checkDB: jest.fn(repository => Promise.resolve({key: repository.replace(/dat:\/\//, '')}))
  },
  categories: {
    create: jest.fn(() => Promise.resolve(true)),
    load: jest.fn(() => Promise.resolve(['a', 'b']))
  },
  expense: {
    list: jest.fn(formData => {
      if (formData.limit !== undefined && formData.limit === 0) {
        return Promise.reject(Error('error'))
      }
      return Promise.resolve([{id: 1}, {id: 2}, {id: 3}])
    }),
    remove: jest.fn(id => {
      if (id === 0) {
        return Promise.reject(Error('error'))
      }
      return Promise.resolve(true)
    }),
    get: jest.fn(id => {
      if (id === 0) {
        return Promise.reject(Error('error'))
      }
      return Promise.resolve({id: id})
    }),
    create: jest.fn(expense => {
      if (expense.id === 0) {
        return Promise.reject(Error('error'))
      }
      return Promise.resolve(true)
    }),
    update: jest.fn(expense => {
      if (expense.id === 0) {
        return Promise.reject(Error('error'))
      }
      return Promise.resolve(true)
    })
  }
}))

const localStorageMock = (function () {
  let store = {}
  return {
    getItem: function (key) {
      return store[key] || null
    },
    setItem: function (key, value) {
      store[key] = value.toString()
    },
    removeItem: function (key) {
      delete store[key]
    },
    clear: function () {
      store = {}
    }
  }
})()

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock
})

let state = {
  modalSimple: {
    title: '',
    content: '',
    opened: false
  },
  sideModal: {
    title: '',
    content: '',
    opened: false
  },
  modalConfirm: {
    title: '',
    content: '',
    opened: false,
    callbackOk: () => {}
  },
  perfectScrollbars: [],
  repository: {},
  repositories: [],
  types: ['Fixed', 'Casual', 'Superfluous'],
  situations: ['Pending', 'Settled'],
  categories: ['Food', 'Tax', 'Transport']
}

let store = (createStoreMocks({actions: actions, mutations: mutations, state: state})).store

describe('vuex/actions.js', () => {
  it('should be an object', () => {
    expect(typeof store._actions).toBe('object')
  })

  it('should init app with one account in init method', () => {
    window.localStorage.clear()
    window.localStorage.setItem('settings', JSON.stringify({
      repositories: [{key: 1}],
      repository: {key: 1}
    }))
    actions.init(store, {})
      .then(message => {
        expect(message).toBe('ok')
        expect(store.state.repositories).toMatchObject([{key: 1}])
        expect(store.state.repository).toMatchObject({key: 1})
        expect(store.state.categories).toMatchObject(['a', 'b'])
      })
  })

  it('should init app with two account in init method', () => {
    window.localStorage.clear()
    window.localStorage.setItem('settings', JSON.stringify({
      repositories: [{key: 1}, {key: 2}],
      repository: {key: 2}
    }))
    actions.init(store, {})
      .then(message => {
        expect(message).toBe('ok')
        expect(store.state.repositories).toMatchObject([{key: 1}, {key: 2}])
        expect(store.state.repository).toMatchObject({key: 2})
        expect(store.state.categories).toMatchObject(['a', 'b'])
      })
  })

  it('should commit CLOSE_MODAL_SIMPLE in closeModalSimple method', () => {
    actions.closeModalSimple(store)
    expect(store.state.modalSimple.opened).toBeFalsy()
  })

  it('should commit OPEN_MODAL_SIMPLE in openModalSimple method', () => {
    actions.openModalSimple(store, {})
    expect(store.state.modalSimple.opened).toBeTruthy()
  })

  it('should commit CLOSE_MODAL_CONFIRM in closeModalConfirm method', () => {
    actions.closeModalConfirm(store)
    expect(store.state.modalConfirm.opened).toBeFalsy()
  })

  it('should commit OPEN_MODAL_CONFIRM in openModalConfirm method', () => {
    actions.openModalConfirm(store, {})
    expect(store.state.modalSimple.opened).toBeTruthy()
  })

  it('should commit CLOSE_SIDE_MODAL in closeSideModal method', () => {
    actions.closeSideModal(store)
    expect(store.state.sideModal.opened).toBeFalsy()
  })

  it('should commit OPEN_SIDE_MODAL in openSideModal method', () => {
    actions.openSideModal(store, {})
    expect(store.state.modalSimple.opened).toBeTruthy()
  })

  it('should add repository in importRepository method', () => {
    actions.importRepository(store, 'data://ij0i1jd9u1w9duh')
      .then(ret => {
        expect(ret).toBeTruthy()
        expect(store.state.repositories.length).toBe(3)
      })
  })

  it('should load repository in setRepository method', () => {
    actions.setRepository(store, 'data://ij0i1jd9u1w9duh')
      .then(ret => {
        expect(ret).toBeTruthy()
      })
  })

  it('should create account in createAccount method', () => {
    actions.createAccount(store)
      .then(url => {
        expect(url).toMatch(/^dat:\/\/[a-z0-9]+/)
      })
  })

  it('should return error in changeAccount method', () => {
    actions.changeAccount(store, 10)
      .catch(error => {
        expect(error.message).toBe('Account not found')
      })
  })

  it('should change account in changeAccount method', () => {
    actions.changeAccount(store, 1)
      .then(message => {
        expect(message).toBe('Changed Account')
      })
  })

  it('should set categories in setCategories method', () => {
    actions.setCategories(store, ['a', 'b', 'c', 'd'])
      .then(ret => {
        expect(ret).toBeTruthy()
        expect(store.state.categories).toMatchObject(['a', 'b', 'c', 'd'])
      })
  })

  it('should return error in removeRepository method', () => {
    actions.removeRepository(store, 10)
      .catch(error => {
        expect(error.message).toBe('Account not found')
      })
  })

  it('should return ok in removeRepository method', () => {
    actions.removeRepository(store, 2)
      .then(message => {
        expect(message).toBe('Account removed')
      })
  })

  it('should return error in getExpense method', () => {
    actions.getExpense(store, {limit: 0})
      .catch(error => {
        expect(error.message).toBe('error')
      })
  })

  it('should return expenses in getExpense method', () => {
    actions.getExpense(store, {})
      .then(expenses => {
        expect(expenses).toMatchObject([{id: 1}, {id: 2}, {id: 3}])
      })
  })

  it('should return error in removeExpense method', () => {
    actions.removeExpense(store, 0)
      .catch(error => {
        expect(error.message).toBe('error')
      })
  })

  it('should return ok in removeExpense method', () => {
    actions.removeExpense(store, 1)
      .then(message => {
        expect(message).tobe('ok')
      })
  })

  it('should return error in getExpenseById method', () => {
    actions.getExpenseById(store, 0)
      .catch(error => {
        expect(error.message).toBe('error')
      })
  })

  it('should return expense in getExpenseById method', () => {
    actions.getExpenseById(store, 1)
      .then(expense => {
        expect(expense).toMatchObject({id: 1})
      })
  })

  it('should return error in createExpense method', () => {
    actions.createExpense(store, {id: 0, date: '2018-01-01', parcel: 0, price: 1})
      .catch(error => {
        expect(error.message).toBe('error')
      })
  })

  it('should return ok in createExpense method', () => {
    actions.createExpense(store, {id: 1, date: '2018-01-01', parcel: 0, price: 1})
      .then(ret => {
        expect(ret).toBeTruthy()
      })
  })

  it('should return error in createExpenses method', () => {
    actions.createExpenses(store, {id: 0, date: '2018-01-01', parcel: 0, price: 1})
      .catch(error => {
        expect(error.message).toBe('error')
      })
  })

  it('should return ok in createExpenses method', () => {
    actions.createExpenses(store, {id: 1, date: '2018-01-01', parcel: 0, price: 1})
      .then(ret => {
        expect(ret).toBeTruthy()
      })
  })

  it('should return ok with 2 expenses in createExpenses method', () => {
    actions.createExpenses(store, {id: 1, date: '2018-01-01', parcel: 2, price: 1})
      .then((ret1, ret2) => {
        expect(ret1).toBeTruthy()
        expect(ret2).toBeTruthy()
      })
  })

  it('should return error in updateExpense method', () => {
    actions.updateExpense(store, {id: 0, date: '2018-01-01', parcel: 0, price: 1})
      .catch(error => {
        expect(error.message).toBe('error')
      })
  })

  it('should return ok in updateExpense method', () => {
    actions.updateExpense(store, {id: 1, date: '2018-01-01', parcel: 0, price: 1})
      .then(ret => {
        expect(ret).toBeTruthy()
      })
  })

  it('should clear repository in logout method', () => {
    actions.logout(store)
    expect(store.state.repository).toMatchObject({})
    expect(store.state.repositories).toMatchObject([])
    expect(store.state.categories).toMatchObject(['Food', 'Tax', 'Transport'])
  })
})
