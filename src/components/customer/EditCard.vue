<template>
  <v-form ref="cardForm" lazy-validation>
    <v-progress-linear class="ma-0" :indeterminate="true" v-if="loading"></v-progress-linear>
    <v-container class="ma-0 pa-0">
      <v-layout row>
        <v-flex>
          <v-card>
            <v-card-title><h3>Card Information</h3></v-card-title>
            <v-card-text>
              <v-layout row>
                <v-flex xs6 md6>
                  <v-text-field
                    v-model="card.cardNumber"
                    label="Card Number"
                    mask="credit-card"
                    :type="hideCardNumber ? 'password' : 'text'"
                    :append-icon="hideCardNumber ? 'fa-eye' : 'fa-eye-slash'"
                    @click:append="hideCardNumber = !hideCardNumber"
                    :readonly="viewonly"
                  ></v-text-field>
                </v-flex>
                <v-flex xs3 md2>
                  <v-text-field
                    v-model="card.expiration"
                    label="Expiration"
                    mask="##/##"
                    :readonly="viewonly"
                  ></v-text-field>
                </v-flex>
                <v-flex xs3 md2>
                  <v-text-field
                    v-model="card.ccv"
                    label="CCV"
                    mask="####"
                    :readonly="viewonly"
                  ></v-text-field>
                </v-flex>
                <v-flex md2>
                  <v-checkbox
                    label="Prepaid"
                    v-model="card.prepay"
                  ></v-checkbox>
                </v-flex>
              </v-layout>
            </v-card-text>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </v-form>
</template>

<script>
import { mapActions } from 'vuex'
import { blankCard } from '@/static/customer'
import Util from './utility'

export default {
  data() {
    return {
      card: {},
      hideCardNumber: true,
      loading: true
    }
  },
  computed: {
    viewonly() {
      return this.$store.getters['customer/getMode'] == 'view'
    },
    mode() {
      return this.$store.getters['customer/getMode']
    }
  },
  methods: {
    ...mapActions('customer', ['fetchCard']),
    copyObject: Util.copyObject,
    resetData() {
      this.card = this.copyObject(blankCard)
      this.$refs.cardForm.resetValidation()
    },
    fetchData() {
      this.fetchCard().then(() => {
        this.card = this.copyObject(this.$store.state.customer.card)
        this.loading = false
      })
    }
  },
  watch: {
    '$route': {
      handler: function (to)  {
        const regex = /customers\/\d+\/(edit|view)/
        if (regex.test(to.path)) {
          this.fetchData()
        } else {
          this.$nextTick(() => this.resetData())
        }
      },
      immediate: true
    }
  }
}
</script>

<style scoped>

</style>