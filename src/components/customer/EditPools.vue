<template>
  <v-form ref="poolsForm">
    <v-layout row v-for="(pool, i) in pools" :key="i" v-if="pools.length > 0">
      <v-flex xs12>
        <v-card>
          <v-card-title>
            <h3>{{ pool.description ? pool.description : "Pool"}}</h3>
            <v-spacer></v-spacer>
            <v-icon v-if="!viewonly" color="red" @click="deletePool(i)">delete</v-icon>
          </v-card-title>
          <v-card-text>
            <v-layout row>
              <v-flex xs12>
                <v-text-field
                  label="Description"
                  v-model="pool.description"
                  :readonly="viewonly"
                ></v-text-field>
              </v-flex>
            </v-layout>
            <v-layout row>
              <v-flex xs12>
                <v-text-field
                  label="Size"
                  v-model="pool.size"
                  :readonly="viewonly"
                ></v-text-field>
              </v-flex>
            </v-layout>
            <v-layout row>
              <v-flex xs12>
                <v-text-field
                  label="Pump"
                  v-model="pool.pump"
                  :readonly="viewonly"
                ></v-text-field>
              </v-flex>
            </v-layout>
            <v-layout row>
              <v-flex xs12>
                <v-text-field
                  label="Equipment"
                  v-model="pool.equip"
                  :readonly="viewonly"
                ></v-text-field>
              </v-flex>
            </v-layout>
            <v-layout row>
              <v-flex xs12>
                  <h4>Location</h4>
                  <v-spacer></v-spacer>
                  <v-checkbox
                    label="Same as Billing Address"
                    v-model="pool.useBillingAddress"
                    :readonly="viewonly"
                  ></v-checkbox>
              </v-flex>
            </v-layout>
            <v-layout row v-if="!pool.useBillingAddress">
              <v-flex xs8 md6>
                  <v-text-field
                    label="Address"
                    v-model="pool.address.street"
                    :readonly="viewonly"
                  ></v-text-field>
              </v-flex>
              <v-flex xs2 md2>
                <v-select
                  label="Type"
                  :items="['None', 'Apt', 'Suite', 'Lot', 'Other']"
                  v-model="pool.address.type"
                  :readonly="viewonly"
                ></v-select>
              </v-flex>
              <v-flex xs6 md4 v-if="pool.address.type && pool.address.type != 'None'">
                <v-text-field
                  :label="pool.address.type + '#'"
                  v-model="pool.address.suite"
                  :readonly="viewonly"
                ></v-text-field>
              </v-flex>
            </v-layout>
            <v-layout row v-if="!pool.useBillingAddress">
              <v-flex xs8 md6>
                <v-text-field
                  label="City"
                  v-model="pool.address.city"
                  :readonly="viewonly"
                ></v-text-field>
              </v-flex>
              <v-flex xs2 md2>
                <v-select
                  label="State"
                  v-model="pool.address.state"
                  :items="states"
                  :readonly="viewonly"
                ></v-select>
              </v-flex>
              <v-flex xs4 md4>
                <v-text-field
                  label="Zip Code"
                  v-model="pool.address.zip"
                  :readonly="viewonly"
                ></v-text-field>
              </v-flex>
            </v-layout>
            <v-layout row>
              <v-flex xs4>
                <v-text-field
                  label="Gate Code"
                  v-model="pool.address.gateCode"
                  :readonly="viewonly"
                ></v-text-field>
              </v-flex>
            </v-layout>
            <v-layout row>
              <v-flex xs12>
                <h4>Notes</h4>
              </v-flex>
            </v-layout>
            <v-layout row v-for="(note, index) in pool.generalNotes" :key="index" v-if="pool.generalNotes.length > 0">
              <v-flex xs3>
                {{ note.date }}
              </v-flex>
              <v-flex xs9>
                {{ note.noteTxt }}
              </v-flex>
            </v-layout>
            <v-layout v-else>
              <v-flex xs12>
                No notes yet.
              </v-flex>
            </v-layout>
            <v-layout row v-if="newNote == i">
              <v-textarea
                solo
                auto-focus
                v-model="newNoteTxt"
              ></v-textarea>
            </v-layout>
            <v-layout row v-if="!viewonly">
              <v-flex xs2 offset-xs10>
                <v-btn color="primary" v-if="newNote !== i" @click="addNote(i)">Add Note</v-btn>
                <v-btn color="primary" v-else @click="saveNote(i)">Save Note</v-btn>
              </v-flex>
            </v-layout>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
    <v-layout v-if="pools.length == 0">
      <v-flex>
        <v-card>
          <v-card-title><h3>No Pools Here</h3></v-card-title>
        </v-card>
      </v-flex>
    </v-layout>
    <v-layout>
      <v-flex xs12 class="text-xs-right">
        <v-btn color="primary" @click="addPool()">Add Pool</v-btn>
      </v-flex>
    </v-layout>
  </v-form>
</template>

<script>
import { mapActions } from 'vuex'
import { stateAbbrList } from '@/static/states'
import { blankPool } from '@/static/customer'
import Util from './utility'

export default {
  data() {
    return {
      pools: [],
      states: stateAbbrList,
      newNote: -1,
      newNoteTxt: ''
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
    ...mapActions('customer', ['fetchPools']),
    copyObject: Util.copyObject,
    compareChanges: Util.compareChanges,
    addNote (val) {
      this.newNoteTxt = ''
      this.newNote = val
    },
    resetData() {
      this.pools = []
      this.$forceUpdate()
    },
    fetchData() {
      this.fetchPools().then(() => {
        this.copyObject(this.$store.state.customer.pools, this.pools)
        this.$forceUpdate()
      })
    },
    saveNote(key) {
      this.pools[key].generalNotes.push({
        date: "Today",
        noteTxt: this.newNoteTxt
      })
      this.newNoteTxt = ''
      this.newNote = -1
    },
    deletePool(key) {
      let dialog = "Are you sure you want to delete " + (this.pools[key].description ? this.pools[key].description : "this pool") + " and all of its details and history?"
      let confirmation = confirm(dialog)
      if (confirmation)
        this.pools.splice(key, 1);
    },
    addPool() {
      this.pools.push(blankPool)
    },
    reset() {
      this.$refs.poolsForm.reset()
    }
  },
  watch: {
    '$route': {
      handler: function (to)  {
        const regex = /customers\/\d+\/(edit|view)/
        if (regex.test(to.path)) {
          this.fetchData()
        } else {
          this.resetData()
        }
      },
      immediate: true
    }
  }
}
</script>

<style scoped>

</style>