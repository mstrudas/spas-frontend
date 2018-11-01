import Vue from 'vue'
import Router from 'vue-router'

import Default from '@/layouts/Default.vue'

import CustomerList from '../views/CustomerList.vue'
import Customer from '../views/Customer.vue'
import Login from '../layouts/Login.vue'
import Print from '../views/Print.vue'
import NotFound from '@/layouts/404.vue'

import store from '@/store'
import Cookies from 'browser-cookies'


Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      component: Default,
      meta: { requiresAuth: true },
      children: [
        {
          path: '',
          name: 'home',
          component: CustomerList
        },
        {
          path: 'customers',
          name: 'customers',
          component: CustomerList
        },
        {
          path: 'customers/:id/view',
          name: 'viewCustomer',
          component: Customer
        },
        {
          path: 'customers/:id/edit',
          name: 'editCustomer',
          component: Customer
        },
        {
          path: 'customers/:id/print',
          name: 'printCustomer',
          component: Print
        },
        {
          path: 'customers/new',
          name: 'newCustomer',
          component: Customer
        }
      ]
    },
    {
      path: '/login',
      name: 'login',
      meta: { requiresAuth: false},
      component: Login,
      props: (route) => ({nextUrl: route.params.nextUrl})
    },
    {
      path: '*',
      name: 'notFound',
      meta: { requiresAuth: true },
      component: NotFound
    }
  ]
})

router.beforeEach(function (to, from, next) {
  if(to.matched.some(record => record.meta.requiresAuth)) {
    if (Cookies.get('token')) {
      const token = Cookies.get('token')
      store.dispatch('login', {token})
        .then(() => next())
    } else if (store.state.token != '') {
      Cookies.set('token', store.state.token)
      next()
    } else {
      store.commit('preLoginPath', to.path)
      router.push('/login')
    }
  } else {
    next()
  }
})

export default router