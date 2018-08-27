<template>
<v-container grid-list-md>
  <v-layout row>
    <v-flex xs12>
      <v-alert
        :value="showLeaveWarning"
        type="warning"
        transition="scale-transition"
      >
        <v-layout row align-content-space-between fill-height>
          <v-flex>
            <div class="mt-3">
              You have unsaved changes. Are you sure you want to leave?
            </div>
          </v-flex>
          <v-flex align-content-end>
              <v-btn color="red" @click="$router.push(to)">Yes</v-btn>
              <v-btn color="green" @click="showLeaveWarning = false">No</v-btn>
        </v-flex>
        </v-layout>
    </v-alert>
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
      show-arrows
    >
      <v-tab
        ripple
      >
        General Info
      </v-tab>
      <v-tab-item>
        <edit-customer
        ></edit-customer>
      </v-tab-item>
      <v-tab
        ripple
      >
        Card Info
      </v-tab>
      <v-tab-item>
        <edit-card
        ></edit-card>
      </v-tab-item>
      <v-tab
        ripple
      >
        Pools
      </v-tab>
      <v-tab-item>
        <edit-pools
        ></edit-pools>
      </v-tab-item>
      <v-tab
        ripple
      >
        Spas
      </v-tab>
      <v-tab-item>
        <edit-spas
        ></edit-spas>
      </v-tab-item>
      <!--
      <v-tab
        ripple
      >
        Customer Notes
      </v-tab>
      <v-tab-item>
        <edit-notes
        ></edit-notes>
      </v-tab-item>
      -->
    </v-tabs>
</v-container>
</template>

<script>
import { mapGetters } from 'vuex'

import EditCustomer from '@/components/customer/EditInfo.vue'
import EditNotes from '@/components/customer/EditNotes.vue'
import EditPools from '@/components/customer/EditPools.vue'
import EditSpas from '@/components/customer/EditSpas.vue'
import EditCard from '@/components/customer/EditCard.vue'

export default {
  data() {
    return {
      active: 0,
      showLeaveWarning: false,
      changed: false
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
    ...mapGetters('customer', {
      pageType: 'getMode'
    }),
    orig() {
      return {
        customer: this.$store.state.customer.info,
        card: this.$store.state.customer.card,
        pools: this.$store.state.customer.pools,
        spas: this.$store.state.customer.spas,
        notes: this.$store.state.customer.notes
      }
    },
    action() {
      return this.pageType.charAt(0).toUpperCase() + this.pageType.substr(1)
    }
  },
  watch: {
  },
  created() {
  },
  methods: {
  },
  beforeRouteUpdate(to, from, next) {
    alert('Route update')
    next()
  },
  beforeRouteLeave(to, from, next) {
    next()
  }
}

</script>

<style scoped>

</style>