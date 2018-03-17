import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld.vue'
import Pages from '@/components/index/Pages.vue'
import Page from '@/components/index/Page.vue'


let router = new Router({
  mode: 'history',
  routes: [
    { 
      path: '/helloworld', 
      component: HelloWorld
    }, {
      path: '/',
      component: Pages
    }, {
      path: '/pages/:url',
      component: Page
    }
  ]
})

export default router
