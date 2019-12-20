import Vue from 'vue'
import VueAnalytics from 'vue-analytics'
import Router from 'vue-router'
import App from './App.vue'
import store from '@/vuex/store'
import http from '@/services/http'
import router from '@/router/index'
import BootstrapVue from 'bootstrap-vue'

// vee validate
import { extend, ValidationProvider, ValidationObserver } from 'vee-validate'
import { required, email, min, regex } from 'vee-validate/dist/rules'

// Add the required rule
extend('required', { ...required })
extend('email', { ...email })
extend('min', { ...min })
extend('regex', { ...regex })
Vue.component('ValidationProvider', ValidationProvider)
Vue.component('ValidationObserver', ValidationObserver)

Vue.use(BootstrapVue)
Vue.use(Router)
Vue.use(VueAnalytics, {
  id: ['UA-39931077-2'],
  router,
  fields: {
    siteSpeedSampleRate: 100
  }
})

Vue.prototype.$http = http
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router,
  store: store
}).$mount('#app')
