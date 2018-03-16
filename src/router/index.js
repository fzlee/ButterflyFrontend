import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld.vue'
import Pages from '@/components/index/Pages.vue'


let router = new Router({
  mode: 'history',
  routes: [
    { 
      path: '/helloworld', 
      component: HelloWorld
    }, {
      path: '/pages',
      component: Pages
    }
  ]
})

export default router
