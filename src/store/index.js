import Vue from 'vue'
import Vuex from 'vuex'
import router from '@/router'
import Axios from 'axios'

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
    login ({ commit }, payload) {
      Axios.post('https://sensational-api-atroxic.c9users.io/api/v1/login', {
        data: payload,
        headers: {
          "Accept": "application/json, text/plain, */*",
          "Content-Type": "application/json;charset=utf-8"
        }
      })
        .then((res) => {
          console.log(res)
        })
        .catch(err => console.log(err))

    }
  },
  modules: {
    menu,
    customer
  }
})
