import API from '@/vuex/api'

global.DatArchive = {
  load: jest.fn(() => Promise.resolve({
    readdir: jest.fn(() => Promise.resolve(true)),
    getInfo: jest.fn(() => Promise.resolve({key: new Date().getTime(), title: ''}))
  })),
  create: jest.fn(() => Promise.resolve(true))
}

const WebDB = function (name) {
  this.define = jest.fn(function (name, config) {
    return {'name': name, 'config': config}
  })
  this.open = jest.fn(function () {
    return Promise.resolve(true)
  })
  this.indexArchive = jest.fn(function () {
    return Promise.resolve(true)
  })
  this.categories = {
    get: jest.fn(function () {
      return Promise.resolve(true)
    }),
    upsert: jest.fn(function () {
      return Promise.resolve(true)
    })
  }
  this.expense = {
    query: jest.fn(function () {
      return {
        limit: jest.fn(function () { return this }),
        offset: jest.fn(function () { return this }),
        orderBy: jest.fn(function () { return this }),
        reverse: jest.fn(function () { return this }),
        filter: jest.fn(function () { return this }),
        toArray: jest.fn(function () { return Promise.resolve(true) })
      }
    }),
    delete: jest.fn(function () {
      return Promise.resolve(true)
    }),
    put: jest.fn(function () {
      return Promise.resolve(true)
    }),
    upsert: jest.fn(function () {
      return Promise.resolve(true)
    }),
    get: jest.fn(function () {
      return Promise.resolve(true)
    })
  }
  this.report = {
    get: jest.fn(function () {
      return Promise.resolve(true)
    }),
    upsert: jest.fn(function () {
      return Promise.resolve(true)
    })
  }
}

jest.mock('@beaker/webdb', () => {
  return function (name) {
    this.define = jest.fn(function (name, config) {
      return {'name': name, 'config': config}
    })
    this.open = jest.fn(function () {
      return Promise.resolve(true)
    })
    this.indexArchive = jest.fn(function () {
      return Promise.resolve(true)
    })
    this.categories = {
      get: jest.fn(function () {
        return Promise.resolve(true)
      }),
      upsert: jest.fn(function () {
        return Promise.resolve(true)
      })
    }
  }
})

describe('vuex/api/index.js', () => {
  it('should API be an object', () => {
    expect(typeof API).toBe('object')
  })

  it('should to have properties', () => {
    expect(typeof API.webdb).toBe('object')
    expect(typeof API.infra).toBe('object')
    expect(typeof API.categories).toBe('object')
    expect(typeof API.expense).toBe('object')
    expect(typeof API.report).toBe('object')
  })

  it('should to have properties on API.webdb', () => {
    expect(typeof API.webdb.options).toBe('object')
    expect(API.webdb.options).toMatchObject([])
    expect(typeof API.webdb.current).toBe('object')
    expect(API.webdb.current).toMatchObject({})
  })

  it('should to have functions on API.infra', () => {
    expect(typeof API.infra.defineTables).toBe('function')
    expect(typeof API.infra.checkDB).toBe('function')
    expect(typeof API.infra.addWebDB).toBe('function')
    expect(typeof API.infra.addCurrentWebDB).toBe('function')
    expect(typeof API.infra.removeWebDB).toBe('function')
    expect(typeof API.infra.openDB).toBe('function')
    expect(typeof API.infra.create).toBe('function')
    expect(typeof API.infra.makeStructure).toBe('function')
  })

  it('should to have functions on API.categories', () => {
    expect(typeof API.categories.load).toBe('function')
    expect(typeof API.categories.create).toBe('function')
  })

  it('should to have functions on API.expense', () => {
    expect(typeof API.expense.list).toBe('function')
    expect(typeof API.expense.remove).toBe('function')
    expect(typeof API.expense.create).toBe('function')
    expect(typeof API.expense.update).toBe('function')
    expect(typeof API.expense.get).toBe('function')
  })

  it('should to have functions on API.report', () => {
    expect(typeof API.report.get).toBe('function')
    expect(typeof API.report.update).toBe('function')
  })

  it('should be an object on infra.checkDB function', () => {
    API.infra.checkDB('dat://aaisoaocamoc')
    expect(global.DatArchive.load).toBeCalled()
  })

  it('should return true on infra.makeStructure function', () => {
    const archive = {
      readdir: jest.fn(() => Promise.resolve(true))
    }
    API.infra.makeStructure(archive)
    expect(archive.readdir).toBeCalled()
  })

  it('should return true on infra.createExpenseDir function', () => {
    const archive = {
      readdir: jest.fn(() => Promise.resolve(true))
    }
    API.infra.createExpenseDir(archive)
    expect(archive.readdir).toBeCalled()
  })

  it('should return true on infra.createReportDir function', () => {
    const archive = {
      readdir: jest.fn(() => Promise.resolve(true))
    }
    API.infra.createReportDir(archive)
    expect(archive.readdir).toBeCalled()
  })

  it('should return true on infra.create function', () => {
    API.infra.create('Title', 'Description')
    expect(global.DatArchive.create).toBeCalled()
  })

  it('should be called WebDB.open on infra.defineTables function', () => {
    API.webdb.current = {}
    API.webdb.current.webdb = new WebDB('bla')

    API.infra.defineTables()
    expect(API.webdb.current.webdb.define).toBeCalled()
    expect(API.webdb.current.webdb.open).toBeCalled()
  })

  it('should add WebDB in webdb.options on infra.addWebDB function', () => {
    API.webdb.options = []
    API.infra.addWebDB({key: 1})
    expect(API.webdb.options.length).toBeGreaterThan(0)
    expect(API.webdb.options[1]).toMatchObject({key: 1})
  })

  it('should add WebDB in webdb.current on infra.addCurrentWebDB function', () => {
    API.webdb.options = []
    API.webdb.current = {}
    API.infra.addCurrentWebDB({key: 1, url: ''})
    expect(API.webdb.current.webdb.define).toBeCalled()
    expect(API.webdb.current.webdb.open).toBeCalled()
  })

  it('should remove WebDB in webdb.options on infra.removeWebDB function', () => {
    API.webdb.options = []
    API.webdb.options[1] = {key: 1}
    API.webdb.options[2] = {key: 2}
    API.webdb.current = {key: 2}
    API.infra.removeWebDB({key: 1})
    expect(API.webdb.options[2]).toMatchObject({key: 2})
    expect(API.webdb.options[1]).toBeUndefined()
  })

  it('should throw Error on infra.removeWebDB function', () => {
    API.webdb.options = []
    API.webdb.options[1] = {key: 1}
    API.webdb.options[2] = {key: 2}
    API.webdb.current = {key: 2}
    expect(() => {
      API.infra.removeWebDB({key: 2})
    }).toThrow()
  })

  it('should be called DatArchive.load on infra.openDB function', () => {
    API.webdb.options = []
    API.webdb.current = {}
    API.infra.openDB('dat://aaisoaocamoc')
    expect(global.DatArchive.load).toBeCalled()
  })

  it('should be called categories.get on categories.load function', () => {
    API.webdb.current = {}
    API.webdb.current.webdb = new WebDB('bla')

    API.categories.load()
    expect(API.webdb.current.webdb.categories.get).toBeCalled()
  })

  it('should be called categories.upsert on categories.create function', () => {
    API.webdb.current = {}
    API.webdb.current.webdb = new WebDB('bla')

    API.categories.create()
    expect(API.webdb.current.webdb.categories.upsert).toBeCalled()
  })

  it('should be called report.get on report.get function', () => {
    API.webdb.current = {}
    API.webdb.current.webdb = new WebDB('bla')

    API.report.get()
    expect(API.webdb.current.webdb.report.get).toBeCalled()
  })

  it('should be called report.update on report.upsert function', () => {
    API.webdb.current = {}
    API.webdb.current.webdb = new WebDB('bla')

    API.report.update()
    expect(API.webdb.current.webdb.report.upsert).toBeCalled()
  })

  it('should be called expense.query on expense.list function', () => {
    API.webdb.current = {}
    API.webdb.current.webdb = new WebDB('bla')

    API.expense.list({limit: 1, offset: 0, order: 'Date', sort: 'DESC', month: 1, year: 2018})
    expect(API.webdb.current.webdb.expense.query).toBeCalled()
  })

  it('should be called expense.delete on expense.remove function', () => {
    API.webdb.current = {}
    API.webdb.current.webdb = new WebDB('bla')

    API.expense.remove(1)
    expect(API.webdb.current.webdb.expense.delete).toBeCalled()
  })

  it('should be called expense.put on expense.create function', () => {
    API.webdb.current = {}
    API.webdb.current.webdb = new WebDB('bla')

    API.expense.create({id: 1})
    expect(API.webdb.current.webdb.expense.put).toBeCalled()
  })

  it('should be called expense.put on expense.update function', () => {
    API.webdb.current = {}
    API.webdb.current.webdb = new WebDB('bla')

    API.expense.update({id: 1})
    expect(API.webdb.current.webdb.expense.upsert).toBeCalled()
  })

  it('should be called expense.put on expense.get function', () => {
    API.webdb.current = {}
    API.webdb.current.webdb = new WebDB('bla')

    API.expense.get(1)
    expect(API.webdb.current.webdb.expense.get).toBeCalled()
  })
})
