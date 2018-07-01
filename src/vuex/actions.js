import Vue from 'vue'
import * as types from './mutation_types'
import API from './api'
import Moment from 'moment'

const formatSettingsRepository = (repositoryLink) => ({ repository: repositoryLink })

export default {
  init: (store) => {
    API.infra.defineTables()
    try {
      let settingsLocalStorage = JSON.parse(window.localStorage.settings)
      API.infra.openDB(settingsLocalStorage.repository)
        .then(ret => store.commit(types.SET_REPOSITORY, settingsLocalStorage.repository))
        .then(() => {
          API.categories.load(settingsLocalStorage.repository)
            .then(categories => store.commit(types.SET_CATEGORIES, categories.categories))
            .catch(error => { console.warn(error.message) })
        })
    } catch (e) {
      console.warn(e.message)
    }
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
    Vue.prototype.$notify({
      group: (data.group || 'general'),
      type: (data.type || 'warn'),
      duration: (data.time || 6000),
      speed: (data.speed || 1000),
      text: (data.text || ''),
      title: (data.title || null)
    })
  },
  setRepository: (store, repository) => {
    return new Promise((resolve, reject) => {
      API.infra.openDB(repository)
        .then(ret => {
          let settings = formatSettingsRepository(repository)
          window.localStorage.setItem('settings', JSON.stringify(settings))
          store.commit(types.SET_REPOSITORY, repository)
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
  logout: (store) => {
    store.commit(types.SET_REPOSITORY, '')
    window.localStorage.removeItem('settings')
  },
  setCategories: (store, categories) => {
    return new Promise((resolve, reject) => {
      API.categories.create(store.state.repository, categories)
        .then(() => {
          store.commit(types.SET_CATEGORIES, categories)
          resolve(true)
        })
        .catch(error => reject(error))
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
      API.expense.get(store.state.repository, id)
        .then(expense => resolve(expense))
        .catch(error => reject(error))
    })
  },
  createExpense (store, expense) {
    let expenses = []
    expense = JSON.parse(JSON.stringify(expense))
    expense.id = (Date.now().toString(36) + Math.random().toString(36).substr(2, 5)).toUpperCase()
    expense.date = Moment(expense.date)
    expense.parcelTotal = (expense.parcel > 2 ? expense.parcel : null)
    expense.parcel = (expense.parcel > 2 ? 1 : 0)
    expense.price = parseFloat(expense.price.toString().replace(/\$\s/, ''))
    expenses.push(API.expense.save(store.state.repository, expense))
    if (expense.parcelTotal) {
      for (let i = 2; i <= expense.parcelTotal; i++) {
        let nextExpense = JSON.parse(JSON.stringify(expense))
        nextExpense.id = (Date.now().toString(36) + Math.random().toString(36).substr(2, 5)).toUpperCase()
        nextExpense.date = Moment(nextExpense.date).add((i - 1), 'months')
        nextExpense.parcel = i
        nextExpense.situations = 'Pending'
        expenses.push(API.expense.save(store.state.repository, nextExpense))
      }
    }
    return Promise.all(expenses)
  },
  updateExpense (store, expense) {
    expense = JSON.parse(JSON.stringify(expense))
    expense.date = Moment(expense.date)
    expense.price = parseFloat(expense.price.toString().replace(/\$\s/, ''))
    return API.expense.save(store.state.repository, expense)
  }
}
