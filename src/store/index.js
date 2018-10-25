import Vue from 'vue'
import Vuex from 'vuex'
import router from '@/router'
import Axios from 'axios'

// Modules
import menu from './modules/menu'
import customer from './modules/customer'

import Cookies from 'browser-cookies'

Vue.use(Vuex)



export default new Vuex.Store({
  state: {
    isAuth: false,
    token: ''
  },
  getters: {

  },
  mutations: {
    loggedIn(state, payload) {
      state.isAuth = true
      state.token = payload.token
      router.push('/')
    },
    logout(state) {
      router.push('/login')
      state.token = ''
      Cookies.erase('token')
      state.isAuth = false
    }
  },
  actions: {
    login({ commit }, payload) {
      return Axios.post("http://local.devel/sensational-api/api/v1/login", payload)
        .then(function (response) {
          return new Promise((resolve, reject) => {
            if (response.status !== 200) {
              reject("Error: Unable to authenticate")
            }
            if (response.data.token) {
              Cookies.set('token', response.data.token)
              commit('loggedIn', { token: response.data.token })
              resolve()
            } else {
              reject(response.data.message)
            }
          })
        })
        .catch(function () {
          return new Promise((resolve, reject) => {
            reject("Invalid Username/Password")
          })
        })
    }
  },
  modules: {
    menu,
    customer
  }
})
