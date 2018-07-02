import Vue from 'vue'
import { shallowMount } from '@vue/test-utils'
import { __createMocks as createStoreMocks } from './../__mocks__/vuex'
import MyAccounts from '@/components/pages/MyAccounts'

Vue.config.silent = true

const accounts = [
  {key: 1, url: '', title: '1', description: '', size: 1},
  {key: 2, url: '', title: '2', description: '', size: 2}
]

let wrapper
let storeMocks = createStoreMocks({
  getters: {},
  mutations: {
    addRepository (state, value) {
      state.repositories.push(value)
    }
  },
  actions: {
    notify: jest.fn(() => {}),
    openModalConfirm: jest.fn(() => {}),
    closeModalConfirm: jest.fn(() => {}),
    removeRepository: jest.fn(() => Promise.resolve(true)),
    changeAccount: jest.fn(() => Promise.resolve(true)),
    importRepository: jest.fn(() => Promise.resolve(true)),
    createAccount: jest.fn(() => Promise.resolve(true))
  },
  state: {
    repositories: accounts
  }
})

describe('MyAccounts.vue', () => {
  it('should have methods', () => {
    expect(typeof MyAccounts.methods).toBe('object')
  })

  it('should have a formatRow method', () => {
    expect(typeof MyAccounts.methods.formatRow).toBe('function')
  })

  it('should have a remove method', () => {
    expect(typeof MyAccounts.methods.remove).toBe('function')
  })

  it('should have a confirmRemove method', () => {
    expect(typeof MyAccounts.methods.confirmRemove).toBe('function')
  })

  it('should have an active method', () => {
    expect(typeof MyAccounts.methods.active).toBe('function')
  })

  it('should have an importAccountWithSuccess method', () => {
    expect(typeof MyAccounts.methods.importAccountWithSuccess).toBe('function')
  })

  it('should have an importAccount method', () => {
    expect(typeof MyAccounts.methods.importAccount).toBe('function')
  })

  it('should have a setAccounts method', () => {
    expect(typeof MyAccounts.methods.setAccounts).toBe('function')
  })

  it('should have a newAccount method', () => {
    expect(typeof MyAccounts.methods.newAccount).toBe('function')
  })

  it('should renders correctly component', () => {
    wrapper = shallowMount(MyAccounts, {
      store: storeMocks.store,
      Vue
    })
    expect(wrapper.name()).toBe('MyAccounts')
    expect(wrapper.vm.loading).toBeFalsy()
    expect(wrapper.vm.dataRemove).toBe('')
    expect(wrapper.vm.accounts).toMatchObject(accounts)
    expect(wrapper.vm.repositoryLink).toBe('')
    expect(wrapper.vm.oldAccounts).toMatchObject(accounts)
  })

  it('should format data in formatRow method', () => {
    let unformated = {key: 3, url: '', title: '3', description: '', size: 3}
    let formated = wrapper.vm.formatRow(unformated)
    expect(formated.key).toBe(unformated.key)
    expect(formated.title).toBe(unformated.title)
    expect(formated.description).toBe(unformated.description)
    expect(formated.size).toBe(unformated.size)
    expect(formated.url).toBe(unformated.url)
  })

  it('should set accounts data in setAccounts method', () => {
    wrapper.vm.loading = true
    wrapper.vm.setAccounts([
      {key: 1, url: '', title: '1', description: '', size: 1},
      {key: 2, url: '', title: '2', description: '', size: 2},
      {key: 3, url: '', title: '3', description: '', size: 3},
      {key: 4, url: '', title: '4', description: '', size: 4}
    ])
    expect(wrapper.vm.accounts.length).toBe(4)
    expect(wrapper.vm.loading).toBeFalsy()
  })

  it('should open modal confirm in remove method', () => {
    wrapper.vm.dataRemove = ''
    wrapper.vm.remove({key: 1, title: '1'})
    expect(wrapper.vm.dataRemove).toMatchObject({key: 1, title: '1'})
    expect(storeMocks.actions.openModalConfirm).toBeCalled()
  })

  it('should to dispatch removeRepository in confirmRemove method', () => {
    wrapper.vm.confirmRemove()
    expect(storeMocks.actions.closeModalConfirm).toBeCalled()
    expect(storeMocks.actions.removeRepository).toBeCalled()
  })

  it('should to dispatch changeAccount in active method', () => {
    wrapper.vm.active({key: 2})
    expect(storeMocks.actions.changeAccount).toBeCalled()
  })

  it('should to return error with empty repository in importAccount method', () => {
    wrapper.vm.repositoryLink = ''
    expect(wrapper.vm.importAccount()).toBeFalsy()
    expect(storeMocks.actions.notify).toBeCalled()
  })

  it('should to return error with invalid repository in importAccount method', () => {
    wrapper.vm.repositoryLink = 'http://my-dat.com'
    expect(wrapper.vm.importAccount()).toBeFalsy()
    expect(storeMocks.actions.notify).toBeCalled()
  })

  it('should to dispatch importRepository in importAccount method', () => {
    wrapper.vm.repositoryLink = 'dat://isjoaij9j91udh1ydg8y'
    wrapper.vm.importAccount()
    expect(storeMocks.actions.importRepository).toBeCalled()
  })

  it('should to dispatch notify in importAccountWithSuccess method', () => {
    wrapper.vm.importAccountWithSuccess()
    expect(storeMocks.actions.notify).toBeCalled()
  })

  it('should to dispatch createAccount in newAccount method', () => {
    wrapper.vm.loading = false
    wrapper.vm.newAccount()
    expect(wrapper.vm.loading).toBeTruthy()
    expect(storeMocks.actions.createAccount).toBeCalled()
    storeMocks.mutations.addRepository(storeMocks.state, {key: 5, url: '', title: '5', description: '', size: 5})
    expect(storeMocks.state.repositories.length).toBeGreaterThan(2)
  })
})
