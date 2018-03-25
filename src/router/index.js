import Router from 'vue-router'
import Index from '@/components/index/Index'
import Articles from '@/components/index/Articles'
import Article from '@/components/index/Article'
import Login from '@/components/index/Login'
import Search from '@/components/index/Search'
import QRCode from '@/components/tools/QRCode'
import Markdown from '@/components/tools/Markdown'
import Manager from '@/components/manager/Manager'
import ManagerArticles from '@/components/manager/Articles'
import Editor from '@/components/manager/Editor'
import Comments from '@/components/manager/Comments'
import Links from '@/components/manager/Links'
import Medias from '@/components/manager/Medias'
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
        },
        {
          path: 'search',
          component: Search
        }, 
        {
          path: 'tools/qrcode',
          component: QRCode
        }
      ], 
    },
    {
      path: '/tools/markdown',
      component: Markdown
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
        }, {
          path: 'comments',
          component: Comments
        }, {
          path: 'links',
          component: Links
        }, {
          path: 'medias',
          component: Medias
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
