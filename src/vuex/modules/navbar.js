const types = {
  HIDE_NAVBAR: 'HIDE_NAVBAR',
  SHOW_NAVBAR: 'SHOW_NAVBAR'
}

const state = {
  showNav: true
}

const getters = {
  showNav (state) {
    return state.showNav
  }
}

const mutations = {
  [types.SHOW_NAVBAR] (state) {
    state.showNav = true
  },
  [types.HIDE_NAVBAR] (state) {
    state.showNav = false
  }
}

export default {
  state,
  getters,
  mutations
}
