import Router from 'vue-router'
import { hasLogin } from '@/services/auth'
import store from '@/vuex/store'

let router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: () => import('@/components/index/Index'),
      children: [
        {
          path: '',
          component: () => import('@/components/index/Articles')
        },
        {
          path: 'articles/:url',
          component: () => import('@/components/index/Article')
        },
        {
          path: 'login',
          component: () => import('@/components/index/Login')
        },
        {
          path: 'search',
          component: () => import('@/components/index/Search')
        },
        {
          path: 'tools/qrcode',
          component: () => import('@/components/tools/QRCode')
        },
        {
          path: 'tools/encoding',
          component: () => import('@/components/tools/Encoding')
        }
      ]
    },
    {
      path: '/tools/markdown',
      component: () => import('@/components/tools/Markdown')
    },
    {
      path: '/page/:url',
      redirect: '/articles/:url'
    },
    {
      path: '/manager',
      component: () => import(/* webpackChunkName: 'manager' */'@/components/manager/Manager'),
      children: [
        {
          path: 'articles',
          component: () => import(/* webpackChunkName: 'manager' */'@/components/manager/Articles')
        }, {
          path: 'editor',
          component: () => import(/* webpackChunkName: 'manager' */'@/components/manager/Editor')
        }, {
          path: 'comments',
          component: () => import(/* webpackChunkName: 'manager' */'@/components/manager/Comments')
        }, {
          path: 'links',
          component: () => import(/* webpackChunkName: 'manager' */'@/components/manager/Links')
        }, {
          path: 'medias',
          component: () => import(/* webpackChunkName: 'manager' */'@/components/manager/Medias')
        }
      ]
    }
  ]
})

router.beforeEach(function (to, from, next) {
  store.commit('setTitle', '')

  if (/^\/manager/.test(to.fullPath) && !hasLogin()) {
    next({ path: '/login', query: { url: to.fullPath } })
  } else {
    next()
  }
})

export default router
