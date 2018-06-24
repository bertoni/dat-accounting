export default {
  userIsLogged: state => {
    return state.repository.length > 0
  }
}
