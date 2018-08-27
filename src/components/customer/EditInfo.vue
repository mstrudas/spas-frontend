<template>
  <v-form ref="custInfoForm" lazy-validation>
    <v-progress-linear v-if="loading" class="ma-0" :indeterminate="true"></v-progress-linear>
    <v-container v-if="!loading" class="ma-0 pa-0">
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
            :rules="[required]"
            :readonly="viewonly"
          ></v-text-field>
        </v-flex>
        <v-flex xs8 md6>
          <v-text-field
            v-model="customer.lastName"
            label="Last Name"
            :rules="[required]"
            :readonly="viewonly"
          ></v-text-field>
        </v-flex>
      </v-layout>
      <v-layout row wrap>
        <v-flex xs8 md6>
          <v-text-field
            v-model="customer.spouse"
            label="Spouse's Name"
            :readonly="viewonly"
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
            <v-layout row>
              <v-flex xs6>
                <v-text-field
                  label="Email Address"
                  v-model="customer.email"
                  :readonly="viewonly"
                ></v-text-field>
              </v-flex>
            </v-layout>
            <v-layout row wrap v-for="(phone, i) in customer.phone" :key="i">
              <v-flex xs4 md4>
                <v-text-field
                  label="Phone Number"
                  v-model="phone.number"
                  mask="phone"
                  :rules="[required, phoneNumber]"
                  required
                  :readonly="viewonly"
                ></v-text-field>
              </v-flex>
              <v-flex xs2 md2>
                <v-select
                  :items="['Home', 'Work', 'Cell', 'Fax', 'Other']"
                  label="Type"
                  v-model="phone.type"
                  :rules="[required]"
                  :readonly="viewonly"
                ></v-select>
              </v-flex>
              <v-flex xs2 hidden-md-and-up>
                <v-switch
                  label=""
                  @change="changePrimaryPhone(i)"
                  :color="isPrimaryColor(i)"
                  :input-value="isPrimary(i)"
                  :readonly="viewonly || customer.phone.length == 1 || customer.primaryPhone == i"
                ></v-switch>
              </v-flex>
              <v-flex md2 hidden-xs-only>
                <v-switch
                  label="Primary"
                  @change="changePrimaryPhone(i)"
                  :color="isPrimaryColor(i)"
                  :input-value="isPrimary(i)"
                  :readonly="viewonly || customer.phone.length == 1 || customer.primaryPhone == i"
                ></v-switch>
              </v-flex>
              <v-flex xs1 md1 class="pt-4"
                  v-if="i != customer.primaryPhone">
                <v-icon medium v-show="!viewonly"
                  @click="removePhone(i)"
                >remove</v-icon>
              </v-flex>
            </v-layout>
            <v-layout row>
              <v-flex xs8>
                <v-btn v-show="!viewonly"
                  @click="addPhone()"
                  color="primary"
                >Add Phone Number</v-btn>
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
            :rules="[required]"
            :readonly="viewonly"
          ></v-text-field>
        </v-flex>
        <v-flex xs2 md2>
          <v-select
            label="Type"
            :items="['None', 'Apt', 'Suite', 'Lot', 'Other']"
            v-model="customer.addressType"
            :rules="[required]"
            :readonly="viewonly"
          ></v-select>
        </v-flex>
        <v-flex xs6 md4 v-if="customer.addressType && customer.addressType != 'None'">
          <v-text-field
            v-model="customer.address2"
            :label="customer.addressType + ' #'"
            :rules="[required]"
            :readonly="viewonly"
          ></v-text-field>
        </v-flex>
      </v-layout>
      <v-layout row>
        <v-flex xs8 md6>
          <v-text-field
            v-model="customer.city"
            label="City"
            :rules="[required]"
            :readonly="viewonly"
          ></v-text-field>
        </v-flex>
        <v-flex xs2 md2>
          <v-autocomplete
            v-model="customer.state"
            :items="states"
            label="State"
            :rules="[required]"
            :readonly="viewonly"
          ></v-autocomplete>
        </v-flex>
        <v-flex xs4 md4>
          <v-text-field
            label="Zip Code"
            v-model="customer.zip"
            :rules="[required]"
            :readonly="viewonly"
          ></v-text-field>
        </v-flex>
      </v-layout>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
    <v-layout justify-space-between row wrap v-if="!viewonly">
      <v-flex class="text-xs-right">
        <v-btn color="success" @click="save()">Save</v-btn>
        <v-btn color="error" @click="test()">Test</v-btn>
      </v-flex>
    </v-layout>
    </v-container>
  </v-form>
</template>

<script>
import { mapActions } from 'vuex'
import { stateAbbrList } from '@/static/states'
import { blankCustomer } from '@/static/customer'
import Util from './utility'

export default {
  data() {
    return {
      customer: {},
      states: stateAbbrList,
      loading: false
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
    ...mapActions('customer', ['fetchCustomer']),
    copyObject: Util.copyObject,
    compareChanges: Util.compareChanges,
    addPhone() {
      this.customer.phone.push({number: '', type: ''})
    },
    removePhone(index) {
      if (index < this.customer.primaryPhone) {
        this.customer.primaryPhone--
      }
      this.customer.phone.splice(index, 1);
    },
    changePrimaryPhone(newVal) {
      this.customer.primaryPhone = newVal
    },
    isPrimary(val) {
      if (val == this.customer.primaryPhone) {
        return true
      }
      return false
    },
    isPrimaryColor(val) {
      if (val == this.customer.primaryPhone) {
        return "primary"
      }
    },
    resetData() {
      this.customer = this.copyObject(blankCustomer)
      this.$refs.custInfoForm.resetValidation()
      this.$forceUpdate()
    },
    fetchData() {
      this.fetchCustomer().then(() => {
        this.copyObject(this.$store.state.customer.info, this.customer)
        this.$refs.custInfoForm.resetValidation()
        this.$forceUpdate()
      })
    }
  },
  mounted() {
  },
  watch: {
    '$route': {
      handler: function (to)  {
        const regex = /customers\/\d+\/(edit|view)/
        if (regex.test(to.path)) {
          this.fetchData()
        } else {
          this.$nextTick(function () {
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