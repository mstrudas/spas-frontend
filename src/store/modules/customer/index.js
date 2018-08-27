import Axios from 'axios'

const state = {
  info: {
    id: '',
    firstName: '',
    lastName: '',
    spouse: '',
    address: '',
    address2: '',
    addressType: '',
    city: '',
    state: '',
    zip: '',
    email: '',
    phone: [{
      number: '',
      type: ''
    }],
    primaryPhone: 0
  },
  spas: [],
  pools: [],
  card: {
    cardNumber: '',
    expiration: '',
    ccv: ''
  },
  notes: []
}

const getters = {
  getMode(state, getters, rootState) {
    let edit = /\/customers\/\d+\/edit/
    if (rootState.route.path == "/customers/new") {
      return "new"
    } else if (edit.test(rootState.route.path)) {
      return "edit"
    } else {
      return "view"
    }
  }

}

const mutations = {
  SET_CUSTOMER: (state, payload) => {
    state.info = payload
  },
  SET_POOLS: (state, payload) => {
    state.pools = payload
  },
  SET_SPAS: (state, payload) => {
    state.spas = payload
  },
  SET_NOTES: (state, payload) => {
    state.notes = payload
  },
  SET_CARD: (state, payload) => {
    state.card = payload
  }

}

const actions = {
  fetchAll({ dispatch }) {
    dispatch('fetchCustomer')
    dispatch('fetchPools')
    dispatch('fetchSpas')
    dispatch('fetchNotes')
    dispatch('fetchCard')
  },
  fetchCustomer({ commit }) {
    return new Promise((resolve, reject) => {
      Axios.get('https://next.json-generator.com/api/json/get/NkmgOparH')
        .then(function(response) {
          let customer = response.data
          customer.addressType = response.data.suite_type
          customer.address2 = response.data.suite
          delete customer.suite_type
          delete customer.suite
          commit('SET_CUSTOMER', customer)
          resolve()
      }).catch(() => reject())
    })
  },
  fetchPools({ commit }) {
    Axios.get('https://next.json-generator.com/api/json/get/NyU8dAy8r')
      .then(function(response) {
        commit('SET_POOLS', response.data)
      })
  },
  fetchSpas({ commit }) {
    Axios.get('https://next.json-generator.com/api/json/get/Vy9Ia7H8B')
      .then(function(response) {
        commit('SET_SPAS', response.data)
      })
  },
  fetchNotes({ commit }) {
    Axios.get('https://next.json-generator.com/api/json/get/VJB-1ES8r')
      .then(function(response) {
        commit('SET_NOTES', response.data)
      })
  },
  fetchCard({ commit }) {
    return new Promise((resolve, reject) => {
      Axios.get('https://next.json-generator.com/api/json/get/Ny3JMESIB')
        .then(function(response) {
          commit('SET_CARD', response.data)
          resolve()
        })
        .catch(() => reject())
    })
  },
  resetAll({ commit }) {
    const info =  {
      id: '',
      firstName: '',
      lastName: '',
      spouse: '',
      address: '',
      address2: '',
      addressType: '',
      city: '',
      state: '',
      zip: '',
      email: '',
      phone: [{
        number: '',
        type: ''
      }],
      primaryPhone: 0
    }
    const spas = []
    const pools = []
    const card = {
      cardNumber: '',
      expiration: '',
      ccv: ''
    }
    const notes = []

    commit('SET_CUSTOMER', info)
    commit('SET_SPAS', spas)
    commit('SET_POOLS', pools)
    commit('SET_CARD', card)
    commit('SET_NOTES', notes)
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}