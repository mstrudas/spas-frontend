const state = {
  drawer: false,
  items: [{
        icon: 'home',
        title: 'Home',
        path: '/'
      },
      {
        icon: 'supervisor_account',
        title: 'Customers',
        path: '/customers'
      },
      {
        icon: 'library_add',
        title: 'Add Customer (Test)',
        path: '/customers/new'
      },
      {
        icon: 'group',
        title: 'View Customer 10 (Test)',
        path: '/customers/10/view'
      },
      {
        icon: 'edit',
        title: 'Edit Customer 10 (Test)',
        path: '/customers/10/edit'
      }
    ]
}

const getters = {

}

const mutations = {
  toggleMenu (state, p) {
    if (p) {
      state.drawer = p
    } else {
      state.drawer = !state.drawer
    }
  }
}

const actions = {

}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}