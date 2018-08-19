import * as mutationTypes from '@/vuex/mutation_types'
import mutations from '@/vuex/mutations'
import { __createMocks as createStoreMocks } from '../__mocks__/vuex'

let store = createStoreMocks({
  state: {
    location: {
      currentLocation: {},
      currentWeather: {}
    },
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
    }
  },
  mutations: mutations
})

describe('vuex/mutations.js', () => {
  it('should be an object', () => {
    expect(typeof store.mutations).toBe('object')
  })

  it('should open modal simple in OPEN_MODAL_SIMPLE method', () => {
    expect(store.state.modalSimple.opened).toBeFalsy()
    expect(store.state.modalSimple.title).toBe('')
    expect(store.state.modalSimple.content).toBe('')
    store.store.commit(mutationTypes.OPEN_MODAL_SIMPLE, {title: 'a', content: 'b'})
    expect(store.state.modalSimple.opened).toBeTruthy()
    expect(store.state.modalSimple.title).toBe('a')
    expect(store.state.modalSimple.content).toBe('b')
  })

  it('should open modal simple default in OPEN_MODAL_SIMPLE method', () => {
    store.store.commit(mutationTypes.OPEN_MODAL_SIMPLE, {})
    expect(store.state.modalSimple.opened).toBeTruthy()
    expect(store.state.modalSimple.title).toBe('')
    expect(store.state.modalSimple.content).toBe('')
  })

  it('should close modal simple in CLOSE_MODAL_SIMPLE method', () => {
    store.store.commit(mutationTypes.CLOSE_MODAL_SIMPLE)
    expect(store.state.modalSimple.opened).toBeFalsy()
  })

  it('should open side modal in OPEN_SIDE_MODAL method', () => {
    expect(store.state.sideModal.opened).toBeFalsy()
    expect(store.state.sideModal.title).toBe('')
    expect(store.state.sideModal.content).toBe('')
    store.store.commit(mutationTypes.OPEN_SIDE_MODAL, {title: 'a', content: 'b'})
    expect(store.state.sideModal.opened).toBeTruthy()
    expect(store.state.sideModal.title).toBe('a')
    expect(store.state.sideModal.content).toBe('b')
  })

  it('should open side modal default in OPEN_SIDE_MODAL method', () => {
    store.store.commit(mutationTypes.OPEN_SIDE_MODAL, {})
    expect(store.state.sideModal.opened).toBeTruthy()
    expect(store.state.sideModal.title).toBe('')
    expect(store.state.sideModal.content).toBe('')
  })

  it('should close side modal in CLOSE_SIDE_MODAL method', () => {
    store.store.commit(mutationTypes.CLOSE_SIDE_MODAL)
    expect(store.state.sideModal.opened).toBeFalsy()
  })

  it('should open modal confirm in OPEN_MODAL_CONFIRM method', () => {
    expect(store.state.modalConfirm.opened).toBeFalsy()
    expect(store.state.modalConfirm.title).toBe('')
    expect(store.state.modalConfirm.content).toBe('')
    expect(typeof store.state.modalConfirm.callbackOk).toBe('function')
    store.store.commit(mutationTypes.OPEN_MODAL_CONFIRM, {title: 'a', content: 'b'})
    expect(store.state.modalConfirm.opened).toBeTruthy()
    expect(store.state.modalConfirm.title).toBe('a')
    expect(store.state.modalConfirm.content).toBe('b')
  })

  it('should open modal confirm default in OPEN_MODAL_CONFIRM method', () => {
    store.store.commit(mutationTypes.OPEN_MODAL_CONFIRM, {})
    expect(store.state.modalConfirm.opened).toBeTruthy()
    expect(store.state.modalConfirm.title).toBe('')
    expect(store.state.modalConfirm.content).toBe('')
  })

  it('should close modal confirm in CLOSE_MODAL_CONFIRM method', () => {
    store.store.commit(mutationTypes.CLOSE_MODAL_CONFIRM)
    expect(store.state.modalConfirm.opened).toBeFalsy()
  })

  it('should set repository in SET_REPOSITORY method', () => {
    const repository = {key: 1}
    store.store.commit(mutationTypes.SET_REPOSITORY, repository)
    expect(store.state.repository).toMatchObject(repository)
  })

  it('should empty repository in SET_REPOSITORY method', () => {
    store.store.commit(mutationTypes.SET_REPOSITORY)
    expect(store.state.repository).toMatchObject({})
  })

  it('should set repositories in SET_REPOSITORIES method', () => {
    const repositories = [{key: 1}, {key: 2}]
    store.store.commit(mutationTypes.SET_REPOSITORIES, repositories)
    expect(store.state.repositories).toMatchObject(repositories)
  })

  it('should empty repositories in SET_REPOSITORIES method', () => {
    store.store.commit(mutationTypes.SET_REPOSITORIES)
    expect(store.state.repositories).toMatchObject([])
  })

  it('should set categories in SET_CATEGORIES method', () => {
    const categories = ['a', 'b', 'c']
    store.store.commit(mutationTypes.SET_CATEGORIES, categories)
    expect(store.state.categories).toMatchObject(categories)
  })

  it('should empty categories in SET_CATEGORIES method', () => {
    store.store.commit(mutationTypes.SET_CATEGORIES)
    expect(store.state.categories).toMatchObject(['Food', 'Tax', 'Transport'])
  })

  it('should fill location in SET_LOCATION method', () => {
    store.store.commit(mutationTypes.SET_LOCATION, {id: 123})
    expect(store.state.location.currentLocation).toMatchObject({id: 123})
  })

  it('should empty location in REMOVE_LOCATION method', () => {
    store.store.commit(mutationTypes.REMOVE_LOCATION)
    expect(store.state.location.currentLocation).toMatchObject({})
  })

  it('should fill current weather in SET_CURRENT_WEATHER method', () => {
    store.store.commit(mutationTypes.SET_CURRENT_WEATHER, {temperature: 20})
    expect(store.state.location.currentWeather).toMatchObject({temperature: 20})
  })
})
