import Vue from 'vue'
import Router from 'vue-router'

import Default from '@/layouts/Default.vue'

import CustomerList from '../views/CustomerList.vue'
import Customer from '../views/Customer.vue'
import Login from '../views/Login.vue'

import store from '@/store'


Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Default,
      children: [
        {
          path: '',
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
          path: 'customers/new',
          name: 'newCustomer',
          component: Customer
        }
      ]
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