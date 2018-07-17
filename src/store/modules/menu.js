const state = {
  drawer: false
}

const getters = {

}

const mutations = {
  toggleMenu (state, p) {
    if (p) {
      state.drawer = p
    } else {
      state.drawer = !state.drawer
    }
  }
}

const actions = {

}

export default {
  state,
  getters,
  mutations,
  actions
}