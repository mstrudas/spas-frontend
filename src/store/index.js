import Vue from 'vue'
import Vuex from 'vuex'
import Axios from 'axios'

// Modules
import menu from './modules/menu'
import customer from './modules/customer'

import Cookies from 'browser-cookies'

Vue.use(Vuex)

const SITE = "http://local.devel/sensational-api"

export default new Vuex.Store({
  state: {
    isAuth: false,
    token: '',
    nextPath: '/',
  },
  getters: {
    getToken(state) {
      return state.token
    }
  },
  mutations: {
    loggedIn(state, payload) {
      state.isAuth = true
      state.token = payload.token
    },
    logout(state) {
      state.token = ''
      Cookies.erase('token')
      state.isAuth = false
    },
    preLoginPath(state, payload) {
      state.nextPath = payload
    }
  },
  actions: {
    login({ commit }, payload) {
      return Axios.post(SITE + "/api/v1/login", payload)
        .then(function (response) {
          return new Promise((resolve, reject) => {
            if (response.status !== 200) {
              reject("Error: Unable to authenticate")
            }
            if (response.data.token) {
              Cookies.set('token', response.data.token, {expires: 7})
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
