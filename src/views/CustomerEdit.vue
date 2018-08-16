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
      ></edit-customer>
    </v-tab-item>
    <v-tab
      ripple
    >
      Pools
    </v-tab>
    <v-tab-item></v-tab-item>
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
      <edit-notes :notes="notes"></edit-notes>
    </v-tab-item>
  </v-tabs>
</v-container>
</template>

<script>
import EditCustomer from '@/components/customer/EditInfo.vue'
import EditNotes from '@/components/customer/EditNotes.vue'

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
    EditNotes
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
    '$route.params.id' (to, from) {
      alert("reloaded data")
      this.fetchData()
    }
  },
  created () {
    this.fetchData()
  },
  methods: {
    fetchData() {
      //For Edit
      if (this.pageType == "edit") {
        // Actually make axios call, but...
        this.customer = {
          id: 10,
          firstName: 'Michael',
          lastName: 'Strudas',
          spouse: 'Sophia',
          address: '4961 S Roosevelt Rd',
          address2: '',
          addressType: 'None',
          city: 'Stevensville',
          state: 'MI',
          zip: '49127',
          phone: [{
            number: '2526467161',
            type: 'Cell'
          },
          {
            number: '2695880652',
            type: 'Work'
          }],
          primaryPhone: 0
        }
      }
    }
  }
}

</script>

<style scoped>

</style>