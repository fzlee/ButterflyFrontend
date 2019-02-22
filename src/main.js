import Vue from 'vue'
// import BootstrapVue from 'bootstrap-vue'
import VueAnalytics from 'vue-analytics'
import Router from 'vue-router'
import App from './App.vue'
import store from '@/vuex/store'
import http from '@/services/http'
import router from '@/router/index'

// bootstrap components
import { Modal, Nav, Navbar, Button, Form, FormInput, FormGroup, FormRadio, ButtonGroup, InputGroup } from 'bootstrap-vue/es/components/'
Vue.use(Modal)
Vue.use(Nav)
Vue.use(Navbar)
Vue.use(Button)
Vue.use(ButtonGroup)
Vue.use(Form)
Vue.use(FormInput)
Vue.use(FormGroup)
Vue.use(FormRadio)
Vue.use(InputGroup)

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
