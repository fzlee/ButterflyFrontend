import Router from 'vue-router'
import Pages from '@/components/index/Pages.vue'
import Page from '@/components/index/Page.vue'
import Sidebar from '@/components/_partial/Sidebar.vue'


let router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      components: {
        default: Pages,
        sidebar: Sidebar
      }
    }, {
      path: '/pages/:url',
      component: Page,
      components: {
        default: Page,
        sidebar: Sidebar
      }
    }
  ]
})

export default router
