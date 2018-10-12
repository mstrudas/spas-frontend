import Vue from 'vue'
import Vuex from 'vuex'
import router from '@/router'
// import Axios from 'axios'

// Modules
import menu from './modules/menu'
import customer from './modules/customer'

Vue.use(Vuex)



export default new Vuex.Store({
  state: {
    isAuth: true
  },
  getters: {

  },
  mutations: {
    loggedIn(state) {
      state.isAuth = true
      router.push('/')
    },
    logout (state) {
      router.push('/login')
      state.isAuth = false
    }
  },
  actions: {
    login () {


    }
  },
  modules: {
    menu,
    customer
  }
})
