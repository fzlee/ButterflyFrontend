import Vue from 'vue'
import Vuex from 'vuex'
import title from '@/vuex/title'
import user from './modules/user'
import navbar from './modules/navbar'

Vue.use(Vuex)

const state = {
  ...user.state
}

const store = new Vuex.Store({
  state,
  getters: user.getters,
  mutations: user.mutations,
  modules: {
    title,
    navbar
  }
})

export default store
