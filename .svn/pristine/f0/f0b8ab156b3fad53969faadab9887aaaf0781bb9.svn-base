import Vue from 'vue'
import Router from 'vue-router'
import index from '../page/index'
import { utils } from '../libs/util'
import login from './login'
import teachCenter from './teachCenter'

Vue.use(Router)

let routePath = [
  // 系统打的默认首页
  {path: utils.pathPrefix + '.html', redirect: utils.pathPrefix},
  {path: '/', name: 'index', component: index},
  teachCenter,
  login,
]

let routes = new Router({
  base: '/sasteacher/',
  mode: 'history',
  routes: routePath
})

routes.beforeEach((to, from, next) => {
  // 必须登录才能访问
  console.log(to.meta.requireAuth,to)
  if (to.meta.requireAuth && !utils.isLogin()) {
    next({name: 'login'})
  } else {
    next()
  }
})

export default routes
