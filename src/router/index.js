import Vue from 'vue'
import Router from 'vue-router'

import Default from '@/layouts/Default.vue'

import CustomerList from '../views/CustomerList.vue'
import Customer from '../views/Customer.vue'
import Login from '../layouts/Login.vue'
import Print from '../views/Print.vue'
import NotFound from '@/layouts/404.vue'

import store from '@/store'


Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      component: Default,
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
      component: Login
    },
    {
      path: '*',
      name: 'notFound',
      component: NotFound
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