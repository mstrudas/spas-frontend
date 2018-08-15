import '@babel/polyfill'
import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import router from './router'
import store from './store'
import mixins from './mixins'
import { sync } from 'vuex-router-sync'

sync(store, router)

Vue.mixin(mixins)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
