import Vue from 'vue'
import * as types from './mutation_types'
import API from './api'
import Moment from 'moment'

const formatSettingsRepository = (repositories, repository) => ({ 'repository': repository, 'repositories': repositories })

const initCurrentDB = (store, account) => {
  return API.infra.addCurrentWebDB(account)
    .then(() => {
      store.commit(types.SET_REPOSITORY, account)
      return API.categories.load()
        .then(categories => store.commit(types.SET_CATEGORIES, categories.categories))
        .catch(/* istanbul ignore next */error => { console.warn(error.message) })
    })
}

export default {
  init: (store) => {
    return new Promise((resolve, reject) => {
      try {
        let settingsLocalStorage = window.localStorage
        if (settingsLocalStorage) {
          if (!settingsLocalStorage.settings) {
            throw new Error('Settings is empty')
          }
          settingsLocalStorage = JSON.parse(settingsLocalStorage.settings)
          if (settingsLocalStorage.repositories.length > 1) {
            let commit = []
            for (let idx in settingsLocalStorage.repositories) {
              commit.push(API.infra.addWebDB(settingsLocalStorage.repositories[idx]))
            }
            Promise.all(commit)
              .then(() => {
                store.commit(types.SET_REPOSITORIES, settingsLocalStorage.repositories)
                initCurrentDB(store, settingsLocalStorage.repository)
                  .then(() => resolve('ok'))
                  .catch(error => { throw error })
              })
          } else {
            store.commit(types.SET_REPOSITORIES, settingsLocalStorage.repositories)
            initCurrentDB(store, settingsLocalStorage.repository)
              .then(() => resolve('ok'))
              .catch(error => { throw error })
          }
        } else {
          reject(Error('Local Storage unavailable'))
        }
      } catch (e) {
        reject(e)
      }
    })
  },
  updateScrollbar: (store) => {
    store.commit(types.UPDATE_SCROLLBAR)
  },
  closeModalSimple: (store) => {
    store.commit(types.CLOSE_MODAL_SIMPLE)
  },
  openModalSimple: (store, data) => {
    store.commit(types.OPEN_MODAL_SIMPLE, data)
  },
  closeModalConfirm: (store) => {
    store.commit(types.CLOSE_MODAL_CONFIRM)
  },
  openModalConfirm: (store, data) => {
    store.commit(types.OPEN_MODAL_CONFIRM, data)
  },
  closeSideModal: (store) => {
    store.commit(types.CLOSE_SIDE_MODAL)
  },
  openSideModal: (store, data) => {
    store.commit(types.OPEN_SIDE_MODAL, data)
  },
  notify: (store, data) => {
    /* istanbul ignore next */
    Vue.prototype.$notify({
      group: (data.group || 'general'),
      type: (data.type || 'warn'),
      duration: (data.time || 6000),
      speed: (data.speed || 1000),
      text: (data.text || ''),
      title: (data.title || null)
    })
  },
  removeRepository: (store, key) => {
    return new Promise((resolve, reject) => {
      let repository = store.state.repositories.filter(elem => elem.key === key)
      if (!repository[0]) {
        return reject(Error('Account not found'))
      }
      try {
        API.infra.removeWebDB(repository[0])
        let settingsLocalStorage = JSON.parse(window.localStorage.settings)
        settingsLocalStorage.repositories = store.state.repositories.filter(elem => elem.key !== key)
        window.localStorage.setItem('settings', JSON.stringify(settingsLocalStorage))
        store.commit(types.SET_REPOSITORIES, settingsLocalStorage.repositories)
        resolve('Account removed')
      } catch (e) {
        reject(e)
      }
    })
  },
  importRepository: (store, repository) => {
    return API.infra.checkDB(repository)
      .then(detailDB => {
        let settingsLocalStorage = JSON.parse(window.localStorage.settings)
        let exists = settingsLocalStorage.repositories.filter(elem => elem.key === detailDB.key)
        if (exists[0]) {
          throw Error('Account already exists')
        }
        API.infra.addWebDB(detailDB)
        settingsLocalStorage.repositories.push(detailDB)
        window.localStorage.setItem('settings', JSON.stringify(settingsLocalStorage))
        store.commit(types.SET_REPOSITORIES, settingsLocalStorage.repositories)
        return true
      })
  },
  setRepository: (store, repository) => {
    return new Promise((resolve, reject) => {
      API.infra.openDB(repository)
        .then(detailDB => {
          delete detailDB.webdb
          let repositories = []
          let settingsLocalStorage = window.localStorage.settings || false
          if (settingsLocalStorage) {
            repositories = JSON.parse(settingsLocalStorage)
          }
          let exists = repositories.filter(elem => elem.key === detailDB.key)
          if (!exists[0]) {
            repositories.push(detailDB)
          }
          let settings = formatSettingsRepository(repositories, detailDB)
          window.localStorage.setItem('settings', JSON.stringify(settings))
          store.commit(types.SET_REPOSITORY, detailDB)
          store.commit(types.SET_REPOSITORIES, repositories)
          resolve(true)
        })
        .catch(error => reject(error))
    })
  },
  createAccount: (store) => {
    return API.infra.create('DatAccounting Repository', 'My DatAccounting repository, where contain my data')
      .then(archive => {
        API.infra.makeStructure(archive)
        return archive.url
      })
  },
  changeAccount: (store, key) => {
    return new Promise((resolve, reject) => {
      let repository = store.state.repositories.filter(elem => elem.key === key)
      if (!repository[0]) {
        return reject(Error('Account not found'))
      }
      initCurrentDB(store, repository[0])
        .then(() => {
          let settingsLocalStorage = JSON.parse(window.localStorage.settings)
          settingsLocalStorage.repository = repository[0]
          window.localStorage.setItem('settings', JSON.stringify(settingsLocalStorage))
          resolve('Changed Account')
        })
        .catch(error => reject(error))
    })
  },
  logout: (store) => {
    store.commit(types.SET_REPOSITORY)
    store.commit(types.SET_REPOSITORIES)
    store.commit(types.SET_CATEGORIES)
    window.localStorage.removeItem('settings')
  },
  setCategories: (store, categories) => {
    return new Promise((resolve, reject) => {
      API.categories.create(categories)
        .then(() => {
          store.commit(types.SET_CATEGORIES, categories)
          resolve(true)
        })
        .catch(/* istanbul ignore next */error => reject(error))
    })
  },
  getExpense: (store, formData) => {
    return new Promise((resolve, reject) => {
      API.expense.list(formData)
        .then(expenses => resolve(expenses))
        .catch(error => reject(error))
    })
  },
  removeExpense (store, id) {
    return new Promise((resolve, reject) => {
      API.expense.remove(id)
        .then(() => resolve('ok'))
        .catch(error => reject(error))
    })
  },
  getExpenseById (store, id) {
    return new Promise((resolve, reject) => {
      API.expense.get(id)
        .then(expense => resolve(expense))
        .catch(error => reject(error))
    })
  },
  createExpense (store, expense) {
    let expenses = []
    let scheduling = (expense.parcelTotal === undefined || isNaN(parseInt(expense.parcelTotal)))
    expense = JSON.parse(JSON.stringify(expense))
    expense.id = (Date.now().toString(36) + Math.random().toString(36).substr(2, 5)).toUpperCase()
    expense.date = Moment(expense.date)
    expense.parcelTotal = (scheduling ? (expense.parcel >= 2 ? expense.parcel : 0) : expense.parcelTotal)
    expense.parcel = (scheduling ? (expense.parcel >= 2 ? 1 : 0) : expense.parcel)
    expense.price = parseFloat(expense.price.toString().replace(/\$\s/, ''))
    expenses.push(API.expense.save(expense))
    if (scheduling && expense.parcelTotal) {
      for (let i = 2; i <= expense.parcelTotal; i++) {
        let nextExpense = JSON.parse(JSON.stringify(expense))
        nextExpense.id = (Date.now().toString(36) + Math.random().toString(36).substr(2, 5)).toUpperCase()
        nextExpense.date = Moment(nextExpense.date).add((i - 1), 'months')
        nextExpense.parcel = i
        nextExpense.situation = 'Pending'
        expenses.push(API.expense.save(nextExpense))
      }
    }
    return Promise.all(expenses)
  },
  updateExpense (store, expense) {
    expense = JSON.parse(JSON.stringify(expense))
    expense.date = Moment(expense.date)
    expense.price = parseFloat(expense.price.toString().replace(/\$\s/, ''))
    return API.expense.save(expense)
  }
}
