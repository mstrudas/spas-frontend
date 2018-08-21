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
                ></v-text-field>
              </v-flex>
              <v-flex xs3 md2>
                <v-text-field
                  v-model="card.expiration"
                  label="Expiration"
                  mask="##/##"
                ></v-text-field>
              </v-flex>
              <v-flex xs3 md2>
                <v-text-field
                  v-model="card.ccv"
                  label="CCV"
                  mask="####"
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
  export default {
    props: ['card', 'viewonly'],
    data() {
      return {
        hideCardNumber: true
      }
    },
    computed: {
    }
  }
</script>

<style scoped>

</style>