import Router from 'vue-router'
import Index from '@/components/index/Index'
import Articles from '@/components/index/Articles'
import Article from '@/components/index/Article'
import Manager from '@/components/manager/Manager'
import ManagerArticles from '@/components/manager/Articles'

let router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: Index, 
      children: [
        {
          path: '',
          component: Articles
        },
        {
          path: 'articles/:url',
          component: Article
        }
      ], 
    },
    {
      path: '/manager',
      component: Manager,
      children: [
        {
          path: 'articles',
          component: ManagerArticles
        }
      ]      
    }
  ]
})

export default router
