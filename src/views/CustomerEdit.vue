<template>
<v-container grid-list-md>
  <v-layout row>
    <v-flex xs12>
      <v-toolbar>
        <v-toolbar-title>{{ action }} Customer</v-toolbar-title>
      </v-toolbar>
    </v-flex>
  </v-layout>
    <v-tabs
      v-model="active"
      grow
    >
      <v-tab
        ripple
      >
        General Info
      </v-tab>
      <v-tab-item>
        <edit-customer
          :customer="customer"
          ref="editCustomer"
        ></edit-customer>
      </v-tab-item>
      <v-tab
        ripple
      >
        Pools
      </v-tab>
      <v-tab-item>
        <edit-pools
          ref="editPools"
          :pools="pools"
        ></edit-pools>
      </v-tab-item>
      <v-tab
        ripple
      >
        Spas
      </v-tab>
      <v-tab-item></v-tab-item>
      <v-tab
        ripple
      >
        Notes
      </v-tab>
      <v-tab-item>
        <edit-notes
          :notes="notes"
        ></edit-notes>
      </v-tab-item>
    </v-tabs>
</v-container>
</template>

<script>
import Axios from 'axios'
import EditCustomer from '@/components/customer/EditInfo.vue'
import EditNotes from '@/components/customer/EditNotes.vue'
import EditPools from '@/components/customer/EditPools.vue'


// Customer: https://next.json-generator.com/api/json/get/NkmgOparH
// Pools: https://next.json-generator.com/api/json/get/NyU8dAy8r

export default {
  data() {
    return {
      action: 'New',
      active: 0,
      customer: {
        id: '',
        firstName: '',
        lastName: '',
        spouse: '',
        address: '',
        address2: '',
        addressType: 'None',
        city: '',
        state: 'MI',
        zip: '',
        phone: [{
          number: '',
          type: ''
        }],
        primaryPhone: 0
      },
      pools: [{
        id: '',
        description: '',
        size: '',
        filter: '',
        pump: '',
        equip: '',
        generalNotes: [],
        address: {
          street: '',
          type: '',
          suite: '',
          city: '',
          state: '',
          zip: ''
        }
      }],
      notes: [{
          time: '29 Aug 2018 14:23',
          note: JSON.stringify('This is a test note\n\nSomething')
        },
        {
          time: '29 Aug 2018 14:23',
          note: JSON.stringify('This is a test note')
        }]
    }
  },
  components: {
    EditCustomer,
    EditNotes,
    EditPools
  },
  computed: {
    pageType() {
      let edit = /\/customers\/\d+\/edit/
      if (this.$route.path == "/customers/new") {
        return "new"
      } else if (edit.test(this.$route.path)) {
        return "edit"
      } else {
        return "list"
      }
    }
  },
  watch: {
    '$route.params.id' () {
      this.fetchData()
    }
  },
  mounted () {
    this.fetchData()
  },
  methods: {
    fetchData() {
      //For Edit
      if (this.pageType == "edit") {
        // Actually make axios call, but...
        const self = this
        Axios.get('https://next.json-generator.com/api/json/get/NkmgOparH')
          .then(function(response) {
            self.customer = response.data
            self.customer.addressType = response.data.suite_type
            self.customer.address2 = response.data.suite
            delete self.customer.suite_type
            delete self.customer.suite
          })
        Axios.get('https://next.json-generator.com/api/json/get/NyU8dAy8r')
          .then(function(response) {
            self.pools = response.data
          })
      } else if (this.pageType == "new") {
          this.customer = {
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
          }
          this.$refs.editCustomer.reset()
      }
    }
  }
}

</script>

<style scoped>

</style>