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

}

const mutations = {


}

const actions = {
  fetchCustomer({ commit }) {
    //For Edit
      // Actually make axios call, but...
    Axios.get('https://next.json-generator.com/api/json/get/NkmgOparH')
      .then(function(response) {
        self.customer = response.data
        self.customer.addressType = response.data.suite_type
        self.customer.address2 = response.data.suite
        delete self.customer.suite_type
        delete self.customer.suite
      })
  },
  fetchPools() {
    Axios.get('https://next.json-generator.com/api/json/get/NyU8dAy8r')
      .then(function(response) {
        self.pools = response.data
      })
  },
  fetchSpas() {
    Axios.get('https://next.json-generator.com/api/json/get/Vy9Ia7H8B')
      .then(function(response) {
        self.spas = response.data
      })
  },
  fetchNotes() {
    Axios.get('https://next.json-generator.com/api/json/get/VJB-1ES8r')
      .then(function(response) {
        self.notes = response.data
      })
  },
  fetchCard() {
    Axios.get('https://next.json-generator.com/api/json/get/Ny3JMESIB')
      .then(function(response) {
        self.card = response.data
      })
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}