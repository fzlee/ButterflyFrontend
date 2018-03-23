import Router from 'vue-router'
import Index from '@/components/index/Index'
import Articles from '@/components/index/Articles'
import Article from '@/components/index/Article'
import Login from '@/components/index/Login'
import Manager from '@/components/manager/Manager'
import ManagerArticles from '@/components/manager/Articles'
import Editor from '@/components/manager/Editor'
import {hasLogin} from '@/services/auth'

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
        },
        {
          path: 'login',
          component: Login
        }
      ], 
    },
    {
      path: '/page/:url',
      redirect: '/articles/:url'
    },
    {
      path: '/manager',
      component: Manager,
      children: [
        {
          path: 'articles',
          component: ManagerArticles
        },{
          path: 'editor',
          component: Editor
        }
      ]      
    }
  ]
})

router.beforeEach(function (to, from, next) {
  if (/^\/manager/.test(to.fullPath) && !hasLogin()) {
    next({path: '/login', query: {url: to.fullPath}})
  } else {
    next()
  }
})


export default router
