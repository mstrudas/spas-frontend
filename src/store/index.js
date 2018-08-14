import Vue from 'vue'
import Vuex from 'vuex'
import router from '@/router'
import Menu from './modules/menu'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isAuth: true
  },
  getters: {

  },
  mutations: {
    login (state) {
      state.isAuth = true
      router.push('/')
    },
    logout (state) {
      router.push('/login')
      state.isAuth = false
    }
  },
  actions: {

  },
  modules: {
    menu: Menu
  }
})
