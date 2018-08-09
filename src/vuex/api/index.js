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
      index: ['id', 'date'],
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
        webdb.options[detail.key] = detail
        webdb.current = detail
        webdb.current.webdb = new WebDB('webdb-dat-accounting-' + detail.key)
        return this.defineTables()
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
      .catch(() => archive.mkdir('expense'))
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
    if (formData.limit) {
      query = query.limit(formData.limit)
    }
    if (typeof formData.offset === 'number') {
      query = query.offset(formData.offset)
    }
    if (formData.order) {
      query = query.orderBy(formData.order)
    }
    if (formData.sort === 'DESC') {
      query = query.reverse()
    }
    if (formData.month) {
      query = query.filter(record => parseInt((new Date(record.date)).getMonth() + 1) === parseInt(formData.month))
    }
    if (formData.year) {
      query = query.filter(record => parseInt((new Date(record.date)).getFullYear()) === parseInt(formData.year))
    }
    return query.toArray()
  },
  remove: function (id) {
    return webdb.current.webdb.expense.query()
      .where('id').equals(id)
      .delete()
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

// const API = {
//   webdb: {
//     options: [],
//     current: {}
//   },
//   infra: {
//     defineTables: () => {
//       this.a.webdb.current.webdb.define('account', {
//         // index: ['name'],
//         filePattern: ['/account.json']
//       })
//       this.a.webdb.current.webdb.define('categories', {
//         // index: ['lastUpdate', 'lastUpdate'],
//         filePattern: [
//           '/categories.json'
//         ]
//       })
//       this.a.webdb.current.webdb.define('expense', {
//         index: ['id', 'date'],
//         // index: ['id', 'date', 'category', 'price', 'type', 'situation'],
//         filePattern: '/expense/*.json'
//       })
//       return this.a.webdb.current.webdb.open()
//     },
//     checkDB: (repository) => {
//       return DatArchive.load(repository)
//         .then(archive => {
//           this.a.infra.makeStructure(archive)
//           return archive.getInfo()
//         })
//     },
//     addWebDB: (data) => {
//       this.a.webdb.options[data.key] = JSON.parse(JSON.stringify(data))
//     },
//     addCurrentWebDB: (data) => {
//       this.a.webdb.current = JSON.parse(JSON.stringify(data))
//       this.a.webdb.current.webdb = new WebDB('webdb-dat-accounting-' + data.key)
//       this.a.infra.defineTables()
//       return this.a.webdb.current.webdb.indexArchive(data.url)
//     },
//     removeWebDB: (data) => {
//       if (this.a.webdb.current.key === data.key) {
//         throw new Error('This account is active and cannot be remove')
//       }
//       delete this.a.webdb.options[data.key]
//     },
//     openDB: (repository) => {
//       let detail
//       return this.a.infra.checkDB(repository)
//         .then(info => {
//           detail = info
//           this.a.webdb.options[detail.key] = detail
//           this.a.webdb.current = detail
//           this.a.webdb.current.webdb = new WebDB('webdb-dat-accounting-' + detail.key)
//           return this.a.infra.defineTables()
//         })
//         .then(() => this.a.webdb.current.webdb.indexArchive(repository))
//         .then(() => detail)
//     },
//     create: (title, description) => DatArchive.create({
//       'title': title,
//       'description': description
//     }),
//     makeStructure: (archive) => {
//       return archive.readdir('expense')
//         .then(() => true)
//         .catch(() => archive.mkdir('expense'))
//     }
//   },
//   categories: {
//     load: () => this.a.webdb.current.webdb.categories.get(this.a.webdb.current.url + '/categories.json'),
//     create: (categories) => this.a.webdb.current.webdb.categories.upsert(this.a.webdb.current.url + '/categories.json', {
//       lastUpdate: new Date(),
//       categories: categories
//     })
//   },
//   expense: {
//     list: (formData) => {
//       let query = this.a.webdb.current.webdb.expense.query()
//       if (formData.limit) {
//         query = query.limit(formData.limit)
//       }
//       if (typeof formData.offset === 'number') {
//         query = query.offset(formData.offset)
//       }
//       if (formData.order) {
//         query = query.orderBy(formData.order)
//       }
//       if (formData.sort === 'DESC') {
//         query = query.reverse()
//       }
//       if (formData.month) {
//         query = query.filter(record => parseInt((new Date(record.date)).getMonth() + 1) === parseInt(formData.month))
//       }
//       if (formData.year) {
//         query = query.filter(record => parseInt((new Date(record.date)).getFullYear()) === parseInt(formData.year))
//       }
//       return query.toArray()
//     },
//     remove: (id) => {
//       return this.a.webdb.current.webdb.expense.query()
//         .where('id').equals(id)
//         .delete()
//     },
//     create: (expense) => this.a.webdb.current.webdb.expense.put(this.a.webdb.current.url + '/expense/' + expense.id + '.json', expense),
//     update: (expense) => this.a.webdb.current.webdb.expense.upsert(this.a.webdb.current.url + '/expense/' + expense.id + '.json', expense),
//     get: (id) => this.a.webdb.current.webdb.expense.get(this.a.webdb.current.url + '/expense/' + id + '.json')
//   }
// }

export default {webdb: webdb, infra: infra, categories: categories, expense: expense}
