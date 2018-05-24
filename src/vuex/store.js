import Vue from 'vue'
import Vuex from 'vuex'
import title from '@/vuex/title'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    title
  }
})

export default store
