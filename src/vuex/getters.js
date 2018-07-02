export default {
  userIsLogged: state => {
    return state.repository && state.repository.key
  },
  currentAccount: state => {
    return state.repository.title || ''
  }
}
