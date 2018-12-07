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
  
  axiosConfig(state, getters, rootState) {
    return {
      baseURL: 'http://local.devel/sensational-api/',
      headers: {
        'bearer': rootState.token
      }
    }
  },
  getMode(state, getters, rootState) {
    let edit = /\/customers\/\d+\/edit/
    if (rootState.route.path == "/customers/new") {
      return "new"
    } else if (edit.test(rootState.route.path)) {
      return "edit"
    } else {
      return "view"
    }
  },
  viewonly(state, getters) {
    return getters.getMode == 'view'
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
  fetchCustomer({ commit, rootState, getters }) {
    return new Promise((resolve, reject) => {
      Axios.get('api/v1/customers/' + rootState.route.params.id, getters.axiosConfig)
        .then(function(response) {
          let customer = response.data.data
          commit('SET_CUSTOMER', customer)
          resolve()
      }).catch(() => reject("Unable to retrieve customer information"))
    })
  },
  fetchPools({ commit }) {
    return new Promise((resolve, reject) => {
      Axios.get('https://next.json-generator.com/api/json/get/NyU8dAy8r')
        .then(function(response) {
          commit('SET_POOLS', response.data)
          resolve()
        })
        .catch(() => reject())
    })
  },
  fetchSpas({ commit, rootState, getters }) {
    return new Promise((resolve, reject) => {
      Axios.get('api/v1/customers/' + rootState.route.params.id + '/spas', getters.axiosConfig)
        .then(function(response) {
          commit('SET_SPAS', response.data.data)
          resolve()
        })
        .catch(() => reject("Unable to retrieve Spas information"))
    })
  },
  fetchNotes({ commit }) {
    return new Promise((resolve, reject) => {
      Axios.get('https://next.json-generator.com/api/json/get/VJB-1ES8r')
        .then(function(response) {
          commit('SET_NOTES', response.data)
          resolve()
        })
        .catch(() => reject())
    })
  },
  fetchCard({ commit, rootState, getters }) {
    return new Promise((resolve, reject) => {
      Axios.get('api/v1/customers/' + rootState.route.params.id + '/cards', getters.axiosConfig)
        .then(function(response) {
          commit('SET_CARD', response.data.data)
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