import Vue from 'vue'
import BootstrapVue from 'bootstrap-vue'
import VueAnalytics from 'vue-analytics'
import Router from 'vue-router'
import App from './App.vue'
import http from '@/services/http'
import router from '@/router/index'

Vue.use(BootstrapVue)
Vue.use(Router)
Vue.use(VueAnalytics, {
  id: ['UA-39931077-2'],
  router
})

Vue.prototype.$http = http
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router,
}).$mount('#app')
 