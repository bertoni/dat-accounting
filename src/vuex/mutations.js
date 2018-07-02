import * as types from './mutation_types'
import PerfectScrollbar from 'perfect-scrollbar'
import MobileDetect from 'mobile-detect'

const mobileDetect = new MobileDetect(window.navigator.userAgent)

export default {
  [types.UPDATE_SCROLLBAR] (state) {
    /* istanbul ignore next */
    if (!mobileDetect.mobile()) {
      if (state.perfectScrollbars.length) {
        for (let idx in state.perfectScrollbars) {
          if (state.perfectScrollbars.hasOwnProperty(idx)) {
            state.perfectScrollbars[idx].update()
          }
        }
        return true
      }
      let container = document.querySelectorAll('.custom-scrollbar')
      for (let idx in container) {
        if (container.hasOwnProperty(idx)) {
          state.perfectScrollbars.push(new PerfectScrollbar(container[idx], {
            wheelSpeed: 2,
            wheelPropagation: true,
            minScrollbarLength: 20
          }))
        }
      }
    }
  },
  [types.CLOSE_MODAL_SIMPLE] (state) {
    state.modalSimple.opened = false
  },
  [types.OPEN_MODAL_SIMPLE] (state, data) {
    state.modalSimple.title = data.title || ''
    state.modalSimple.content = data.content || ''
    state.modalSimple.opened = true
  },
  [types.CLOSE_SIDE_MODAL] (state) {
    state.sideModal.opened = false
  },
  [types.OPEN_SIDE_MODAL] (state, data) {
    state.sideModal.title = data.title || ''
    state.sideModal.content = data.content || ''
    state.sideModal.opened = true
  },
  [types.CLOSE_MODAL_CONFIRM] (state) {
    state.modalConfirm.opened = false
  },
  [types.OPEN_MODAL_CONFIRM] (state, data) {
    state.modalConfirm.title = data.title || ''
    state.modalConfirm.content = data.content || ''
    state.modalConfirm.opened = true
    state.modalConfirm.callbackOk = data.callbackOk || (() => {})
  },
  [types.SET_REPOSITORY] (state, repository) {
    state.repository = repository || {}
  },
  [types.SET_REPOSITORIES] (state, repositories) {
    state.repositories = repositories || []
  },
  [types.SET_CATEGORIES] (state, categories) {
    state.categories = (typeof categories === 'object' && categories.length ? categories : ['Food', 'Tax', 'Transport'])
  }
}
