<template>
<v-container grid-list-md>
  <v-layout row>
    <v-flex xs12>
      <v-toolbar>
        <v-toolbar-title>{{ action }} Customer</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-icon v-if="pageType == 'view'" @click="$router.push('/customers/' + $route.params.id + '/edit')">edit</v-icon>
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
          :viewonly="viewOnly"
          ref="editCustomer"
        ></edit-customer>
      </v-tab-item>
      <v-tab
        ripple
      >
        Card Info
      </v-tab>
      <v-tab-item>
        <edit-card
          :card="card"
          :viewonly="viewOnly"
          ref="editCard"
        ></edit-card>
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
          :viewonly="viewOnly"
        ></edit-pools>
      </v-tab-item>
      <v-tab
        ripple
      >
        Spas
      </v-tab>
      <v-tab-item>
        <edit-spas
          ref="editSpas"
          :spas="spas"
          :viewonly="viewOnly"
        ></edit-spas>
      </v-tab-item>
      <v-tab
        ripple
      >
        Customer Notes
      </v-tab>
      <v-tab-item>
        <edit-notes
          :notes="notes"
          :viewonly="viewOnly"
        ></edit-notes>
      </v-tab-item>
    </v-tabs>
</v-container>
</template>

<script>
import { mapActions, mapState, mapGetters } from 'vuex'

import EditCustomer from '@/components/customer/EditInfo.vue'
import EditNotes from '@/components/customer/EditNotes.vue'
import EditPools from '@/components/customer/EditPools.vue'
import EditSpas from '@/components/customer/EditSpas.vue'
import EditCard from '@/components/customer/EditCard.vue'


// Customer: https://next.json-generator.com/api/json/get/NkmgOparH
// Pools: https://next.json-generator.com/api/json/get/NyU8dAy8r
// Spas: https://next.json-generator.com/api/json/get/Vy9Ia7H8B
// Notes: https://next.json-generator.com/api/json/get/VJB-1ES8r
// Card: https://next.json-generator.com/api/json/get/Ny3JMESIB

export default {
  data() {
    return {
      active: 0
    }
  },
  components: {
    EditCustomer,
    EditNotes,
    EditPools,
    EditSpas,
    EditCard
  },
  computed: {
    ...mapState({
      customer: state => state.customer.info,
      card: state => state.customer.card,
      pools: state => state.customer.pools,
      spas: state => state.customer.spas,
      notes: state => state.customer.notes
    }),
    action() {
      return this.pageType().charAt(0).toUpperCase() + this.pageType().substr(1)
    },
    viewOnly() {
      return this.pageType() == 'view'
    }
  },
  watch: {
    '$route' () {
      this.fetchData()
    },
    pageType() {
      this.fetchData()
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    ...mapActions('customer', {
      fetchData: 'fetchAll'
    }),
    ...mapGetters('customer', {
      pageType: 'getMode'
    }),
    resetAll() {
      this.$refs.editCustomer.reset()
      this.$refs.editPools.reset()
      this.$refs.editSpas.reset()
      this.$refs.editCard.reset()
    },
    clearAll() {
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
      this.notes = []
      this.pools = []
      this.spas = []
      this.card = {
          cardNumber: '',
          expiration: '',
          ccv: ''
      }
    }
  }
}

</script>

<style scoped>

</style>