<template>
<v-container grid-list-md>
  <v-form>
    <v-toolbar>
      <v-toolbar-title>Edit Customer</v-toolbar-title>
    </v-toolbar>
      <v-layout row>
        <v-flex>
          <v-card>
            <v-card-title><h3>Customer Information</h3></v-card-title>
            <v-card-text>
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
            </v-card-text>
          </v-card>
        </v-flex>
      </v-layout>
      <v-layout row>
        <v-flex>
          <v-card>
            <v-card-title><h3>Contact Information</h3></v-card-title>
            <v-card-text>
              <v-layout row wrap v-for="(phone, i) in customer.phone" :key="i">
                <v-flex xs6 md6>
                  <v-text-field
                    label="Phone Number"
                    v-model="phone.number"
                  ></v-text-field>
                </v-flex>
                <v-flex xs2 md2>
                  <v-select
                    :items="['Home', 'Work', 'Cell', 'Other']"
                    label="Type"
                    v-model="phone.type"
                  ></v-select>
                </v-flex>
                <v-flex xs2 hidden-md-and-up>
                  <v-switch
                    label=""
                    @change="changePrimaryPhone(i)"
                    :input-value="customer.primaryPhone == i ? 1 : 0"
                    :disabled="customer.phone.length == 1 || customer.primaryPhone == i"
                  ></v-switch>
                </v-flex>
                <v-flex md2 hidden-xs-only>
                  <v-switch
                    label="Primary"
                    @change="changePrimaryPhone(i)"
                    :input-value="customer.primaryPhone == i ? 1 : 0"
                    :disabled="customer.phone.length == 1 || customer.primaryPhone == i"
                  ></v-switch>
                </v-flex>
                <v-flex xs2 md2 class="pt-4" v-if="i + 1 == customer.phone.length">
                  <v-icon medium
                    @click="addPhone()"
                  >add_square</v-icon>
                </v-flex>
                <v-flex xs2 md2 class="pt-4" v-else>
                  <v-icon medium
                    v-if="i != customer.primaryPhone"
                    @click="removePhone(i)"
                  >remove</v-icon>
                </v-flex>
              </v-layout>
            </v-card-text>
          </v-card>
        </v-flex>
      </v-layout>

      <v-layout row>
        <v-flex>
          <v-card>
            <v-card-title><h3>Billing Address</h3></v-card-title>
            <v-card-text>
        <v-layout row wrap>
          <v-flex xs8 md6>
            <v-text-field
              v-model="customer.address"
              label="Street Address"
            ></v-text-field>
          </v-flex>
          <v-flex xs2 md2>
            <v-select
              label="Type"
              :items="['None', 'Apt', 'Suite', 'Lot', 'Other']"
              v-model="customer.addressType"
            ></v-select>
          </v-flex>
          <v-flex xs6 md4 v-if="customer.addressType != 'None'">
            <v-text-field
              v-model="customer.address2"
              :label="customer.addressType + ' #'"
            ></v-text-field>
          </v-flex>
        </v-layout>
        <v-layout row>
          <v-flex xs8 md6>
            <v-text-field
              v-model="customer.city"
              label="City"
            ></v-text-field>
          </v-flex>
          <v-flex xs2 md2>
            <v-select
              v-model="customer.state"
              :items="states"
              label="State"
            ></v-select>
          </v-flex>
          <v-flex xs4 md4>
            <v-text-field
              label="Zip Code"
              v-model="customer.zip"
            ></v-text-field>
          </v-flex>
        </v-layout>
            </v-card-text>
          </v-card>
        </v-flex>
      </v-layout>
      <v-layout justify-space-between row wrap>
        <v-flex >
          <v-btn color="error">Cancel</v-btn>
        </v-flex>
        <v-flex class="text-xs-right">
          <v-btn color="primary">Save</v-btn>
        </v-flex>
      </v-layout>
  </v-form>
</v-container>
</template>

<script>
export default {
  data() {
    return {
      customer: {
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
      states: [
        'MI', 'IN', 'OH', 'IL'
      ]
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
  },
  methods: {
    addPhone() {
      this.customer.phone.push({number: '', type: ''})
    },
    removePhone(index) {
      this.customer.phone.splice(index, 1);
    },
    changePrimaryPhone(newVal) {
      this.customer.primaryPhone = newVal
    }
  }
}
</script>

<style scoped>

</style>