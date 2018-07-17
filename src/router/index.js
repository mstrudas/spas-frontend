import Vue from 'vue'
import Router from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import store from '@/store'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    }
  ]
})


router.beforeEach (function (to, from, next) {
  if (!store.state.isAuth && to.path !== "/login") {
    next('/login')
  } else {
    next()
  }
})

export default router