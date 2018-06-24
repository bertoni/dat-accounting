const WebDB = require('@beaker/webdb')
let webdb = new WebDB('webdb-dat-accounting')

export default {
  infra: {
    defineTables: () => {
      webdb.define('account', {
        index: ['name'],
        filePattern: ['/account.json']
      })
      webdb.define('categories', {
        index: ['lastUpdate', 'lastUpdate'],
        filePattern: [
          '/categories.json'
        ]
      })
      webdb.define('expense', {
        index: ['id', 'date', 'category', 'price', 'type', 'situation'],
        filePattern: '/expense/*.json'
      })
      webdb.open()
    },
    openDB: (repository) => webdb.indexArchive(repository)
  },
  categories: {
    load: (repository) => webdb.categories.get(repository + '/categories.json'),
    create: (repository, categories) => webdb.account.upsert(repository + '/categories.json', {
      lastUpdate: new Date(),
      categories: categories
    })
  },
  expense: {
    list: (formData) => {
      let query = webdb.expense.query()
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
      return query.toArray()
    },
    remove: (id) => {
      return webdb.expense.query()
        .where('id').equals(id)
        .delete()
    },
    save: (repository, expense) => {
      return webdb.expense.upsert(repository + '/expense/' + expense.id + '.json', expense)
    },
    get: (repository, id) => webdb.expense.get(repository + '/expense/' + id + '.json')
  }
}
