/* global DatArchive */
const WebDB = require('@beaker/webdb')

const webdb = {
  options: [],
  current: {}
}

const infra = {
  defineTables: function () {
    webdb.current.webdb.define('account', {
      // index: ['name'],
      filePattern: ['/account.json']
    })
    webdb.current.webdb.define('categories', {
      // index: ['lastUpdate', 'lastUpdate'],
      filePattern: [
        '/categories.json'
      ]
    })
    webdb.current.webdb.define('expense', {
      index: ['date'],
      // index: ['id', 'date', 'category', 'price', 'type', 'situation'],
      filePattern: '/expense/*.json'
    })
    return webdb.current.webdb.open()
  },
  checkDB: function (repository) {
    return DatArchive.load(repository)
      .then(archive => {
        this.makeStructure(archive)
        return archive.getInfo()
      })
  },
  addWebDB: function (data) {
    webdb.options[data.key] = JSON.parse(JSON.stringify(data))
  },
  addCurrentWebDB: function (data) {
    webdb.current = JSON.parse(JSON.stringify(data))
    webdb.current.webdb = new WebDB('webdb-dat-accounting-' + data.key)
    this.defineTables()
    return webdb.current.webdb.indexArchive(data.url)
  },
  removeWebDB: function (data) {
    if (webdb.current.key === data.key) {
      throw new Error('This account is active and cannot be remove')
    }
    delete webdb.options[data.key]
  },
  openDB: function (repository) {
    let detail
    return this.checkDB(repository)
      .then(info => {
        detail = info
        this.addWebDB(detail)
        return this.addCurrentWebDB(detail)
      })
      .then(() => webdb.current.webdb.indexArchive(repository))
      .then(() => detail)
  },
  create: function (title, description) {
    return DatArchive.create({
      'title': title,
      'description': description
    })
  },
  makeStructure: function (archive) {
    return archive.readdir('expense')
      .then(() => true)
      .catch(/* istanbul ignore next */() => archive.mkdir('expense'))
  }
}

const categories = {
  load: function () {
    return webdb.current.webdb.categories.get(webdb.current.url + '/categories.json')
  },
  create: function (categories) {
    return webdb.current.webdb.categories.upsert(webdb.current.url + '/categories.json', {
      lastUpdate: new Date(),
      categories: categories
    })
  }
}

const expense = {
  list: function (formData) {
    let query = webdb.current.webdb.expense.query()
    /* istanbul ignore else */
    if (formData.limit) {
      query = query.limit(formData.limit)
    }
    /* istanbul ignore else */
    if (typeof formData.offset === 'number') {
      query = query.offset(formData.offset)
    }
    /* istanbul ignore else */
    if (formData.order) {
      query = query.orderBy(formData.order)
    }
    /* istanbul ignore else */
    if (formData.sort === 'DESC') {
      query = query.reverse()
    }
    /* istanbul ignore else */
    if (formData.month) {
      query = query.filter(/* istanbul ignore next */record => parseInt((new Date(record.date)).getMonth() + 1) === parseInt(formData.month))
    }
    /* istanbul ignore else */
    if (formData.year) {
      query = query.filter(/* istanbul ignore next */record => parseInt((new Date(record.date)).getFullYear()) === parseInt(formData.year))
    }
    return query.toArray()
  },
  remove: function (id) {
    return webdb.current.webdb.expense.delete(webdb.current.url + '/expense/' + id + '.json')
  },
  create: function (expense) {
    return webdb.current.webdb.expense.put(webdb.current.url + '/expense/' + expense.id + '.json', expense)
  },
  update: function (expense) {
    return webdb.current.webdb.expense.upsert(webdb.current.url + '/expense/' + expense.id + '.json', expense)
  },
  get: function (id) {
    return webdb.current.webdb.expense.get(webdb.current.url + '/expense/' + id + '.json')
  }
}

export default {webdb: webdb, infra: infra, categories: categories, expense: expense}
