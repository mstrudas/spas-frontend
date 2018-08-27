<template>
  <v-form ref="cardForm" lazy-validation>
    <v-layout row>
      <v-flex>
        <v-card>
          <v-card-title><h3>Card Information</h3></v-card-title>
          <v-card-text>
            <v-layout row>
              <v-flex xs8 md6>
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
            </v-layout>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
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
      hideCardNumber: true
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
    reset() {
      this.$refs.cardForm.reset()
    },
    resetData() {
      this.card = this.copyObject(blankCard)
      this.$refs.cardForm.resetValidation()
      this.$forceUpdate()
    },
    fetchData() {
      this.fetchCard().then(() => {
        this.copyObject(this.$store.state.customer.card, this.card)
        this.$forceUpdate()
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
          this.$nextTick(function() {
            this.resetData()
          })
        }
      },
      immediate: true
    }
  }
}
</script>

<style scoped>

</style>