<template>
<v-container grid-list-lg>
  <v-form>
    <v-layout row>
      <v-flex>
        <h2>Edit Customer</h2>
      </v-flex>
    </v-layout>
    <v-container>
      <v-layout row>
        <v-flex>
          <h3>Customer Information</h3>
        </v-flex>
      </v-layout>
      <v-container>
        <v-layout row wrap>
          <v-flex xs8 md6>
            <v-text-field
              v-model="customer.firstName"
              label="First Name"
            ></v-text-field>
          </v-flex>
          <v-flex xs8 md6>
            <v-text-field
              v-model="customer.lastName"
              label="Last Name"
            ></v-text-field>
          </v-flex>
        </v-layout>
        <v-layout row wrap>
          <v-flex xs8 md6>
            <v-text-field
              v-model="customer.spouse"
              label="Spouse's Name"
            ></v-text-field>
          </v-flex>
        </v-layout>
      </v-container>
    </v-container>
    <v-flex xs12>
      <v-divider></v-divider>
    </v-flex>
    <v-container>
      <v-layout row>
        <v-flex>
          <h3>Address</h3>
        </v-flex>
      </v-layout>
      <v-container>
        <v-layout row wrap>
          <v-flex xs8 md6>
            <v-text-field
              v-model="customer.address"
              label="Street Address"
            ></v-text-field>
          </v-flex>
          <v-flex xs2 md2>
            <v-radio-group>
              <v-radio value="none">None</v-radio>
              <v-radio value="apt">Apt</v-radio>
              <v-radio value="suite">Suite</v-radio>
              <v-radio value="lot">Lot</v-radio>
              <v-radio value="other">Other</v-radio>
            </v-radio-group>
          </v-flex>
          <v-flex xs6 md4>
            <v-text-field
              v-model="customer.address2"
              label="Apt/Suite/Lot/Etc"
            ></v-text-field>
          </v-flex>
        </v-layout>
      </v-container>
    </v-container>
  </v-form>
</v-container>
</template>

<script>
export default {
  data() {
    return {
      customer: {
        firstName: '',
        lastName: ''
      }
    }
  },
  computed: {
    action() {
      switch (this.$route.params.action.toLowerCase()) {
        case 'edit':
          return 'Edit'
        case 'new':
          return 'New'
        default:
          return ''
      }
    },
    customerNo() {
      return this.$route.params.id
    }
  }
}
</script>

<style scoped>

</style>