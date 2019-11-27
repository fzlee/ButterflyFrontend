import Vue from 'vue'
import Cookies from 'js-cookie'

const types = {
  USER_LOGOUT: 'USER_LOGOUT',
  USER_LOGGED: 'USER_LOGGED'
}

function getUser () {
  let content = Cookies.get('b.user')
  return content ? JSON.parse(content) : null
}

const cookieUser = getUser()
// initial state
const initialState = {
  user: cookieUser,
  isAuthorized: cookieUser && Object.keys(cookieUser).length > 0
}

// getters
const getters = {
  user (state) {
    return state.user
  }
}

// mutations
const mutations = {
  [types.USER_LOGOUT] (state) {
    // clear state
    for (let key in state) {
      Vue.set(state, key, null)
    }
    Vue.set(state, 'isAuthorized', null)
    // clear cookie
    localStorage.clear()
    Cookies.remove('b.user')
    Cookies.remove('b.uid')
    Cookies.remove('b.token')
  },

  [types.USER_LOGGED] (state, user = {}) {
    console.log('ssssssssssssssssssssssss')
    if (Object.keys(user).length > 0) {
      Vue.set(state, 'user', user)
      Vue.set(state, 'isAuthorized', true)
    }
  }
}

export default {
  state: initialState,
  getters,
  mutations
}
