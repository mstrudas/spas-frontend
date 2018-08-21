<template>
  <v-form ref="spasForm">
    <v-layout row v-for="(spa, i) in spas" :key="i" v-if="spas.length > 0">
      <v-flex xs12>
        <v-card>
          <v-card-title>
            <h3>{{ spa.description ? spa.description : "Spa"}}</h3>
            <v-spacer></v-spacer>
            <v-icon color="red" @click="deleteSpa(i)" v-if="!viewonly">delete</v-icon>
          </v-card-title>
          <v-card-text>
            <v-layout row>
              <v-flex xs12>
                <v-text-field
                  label="Description"
                  v-model="spa.description"
                  :readonly="viewonly"
                ></v-text-field>
              </v-flex>
            </v-layout>
            <v-layout row>
              <v-flex xs12>
                <v-text-field
                  label="Brand"
                  v-model="spa.brand"
                  :readonly="viewonly"
                ></v-text-field>
              </v-flex>
            </v-layout>
            <v-layout row>
              <v-flex xs12>
                <v-text-field
                  label="Model"
                  v-model="spa.model"
                  :readonly="viewonly"
                ></v-text-field>
              </v-flex>
            </v-layout>
            <v-layout row>
              <v-flex xs12>
                <v-text-field
                  label="Year"
                  v-model="spa.year"
                  :readonly="viewonly"
                ></v-text-field>
              </v-flex>
            </v-layout>
            <v-layout row>
              <v-flex xs6>
                <v-text-field
                  label="Purchased From"
                  v-model="spa.purchasedFrom"
                  :readonly="viewonly"
                ></v-text-field>
              </v-flex>
              <v-flex xs6>
                <v-menu
                  ref="menu"
                  :close-on-content-click="false"
                  :value="openDatePicker(i)"
                  :nudge-right="40"
                  :return-value.sync="date"
                  lazy
                  transition="scale-transition"
                  offset-y
                  full-width
                  min-width="290px"
                >
                  <v-text-field
                    slot="activator"
                    v-model="spa.purchaseDate"
                    label="Purchase Date"
                    readonly
                  ></v-text-field>
                  <v-date-picker v-model="spa.purchaseDate" no-title scrollable>
                    <v-spacer></v-spacer>
                    <v-btn flat color="primary" @click="menu = -1">Cancel</v-btn>
                    <v-btn flat color="primary" @click="$refs.menu[i].save(date), menu = -1">OK</v-btn>
                  </v-date-picker>
                </v-menu>
              </v-flex>
            </v-layout>
            <v-layout row>
              <v-flex xs12>
                  <h4>Location</h4>
                  <v-spacer></v-spacer>
                  <v-checkbox
                    label="Same as Billing Address"
                    v-model="spa.useBillingAddress"
                    :readonly="viewonly"
                  ></v-checkbox>
              </v-flex>
            </v-layout>
            <v-layout row v-if="!spa.useBillingAddress">
              <v-flex xs8 md6>
                  <v-text-field
                    label="Address"
                    v-model="spa.address.street"
                    :readonly="viewonly"
                  ></v-text-field>
              </v-flex>
              <v-flex xs2 md2>
                <v-select
                  label="Type"
                  :items="['None', 'Apt', 'Suite', 'Lot', 'Other']"
                  v-model="spa.address.type"
                  :readonly="viewonly"
                ></v-select>
              </v-flex>
              <v-flex xs6 md4 v-if="spa.address.type && spa.address.type != 'None'">
                <v-text-field
                  :label="spa.address.type + '#'"
                  v-model="spa.address.suite"
                  :readonly="viewonly"
                ></v-text-field>
              </v-flex>
            </v-layout>
            <v-layout row v-if="!spa.useBillingAddress">
              <v-flex xs8 md6>
                <v-text-field
                  label="City"
                  v-model="spa.address.city"
                  :readonly="viewonly"
                ></v-text-field>
              </v-flex>
              <v-flex xs2 md2>
                <v-select
                  label="State"
                  v-model="spa.address.state"
                  :items="states"
                  :readonly="viewonly"
                ></v-select>
              </v-flex>
              <v-flex xs4 md4>
                <v-text-field
                  label="Zip Code"
                  v-model="spa.address.zip"
                  :readonly="viewonly"
                ></v-text-field>
              </v-flex>
            </v-layout>
            <v-layout row>
              <v-flex xs12>
                <h4>Notes</h4>
              </v-flex>
            </v-layout>
            <v-layout row v-for="(note, index) in spa.generalNotes" :key="index" v-if="spa.generalNotes.length > 0">
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
                :readonly="viewonly"
              ></v-textarea>
            </v-layout>
            <v-layout row>
              <v-flex xs2 offset-xs10 v-if="!viewonly">
                <v-btn color="primary" v-if="newNote !== i" @click="addNote(i)">Add Note</v-btn>
                <v-btn color="primary" v-else @click="saveNote(i)">Save Note</v-btn>
              </v-flex>
            </v-layout>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
    <v-layout v-if="spas.length == 0">
      <v-flex>
        <v-card>
          <v-card-title><h3>No Spas Here</h3></v-card-title>
        </v-card>
      </v-flex>
    </v-layout>
    <v-layout>
      <v-flex xs12 class="text-xs-right" v-if="!viewonly">
        <v-btn color="primary" @click="addSpa()">Add Spa</v-btn>
      </v-flex>
    </v-layout>
  </v-form>
</template>

<script>
import { stateAbbrList } from '@/static/states'

  export default {
    props: ['spas', 'viewonly'],
    data() {
      return {
        states: stateAbbrList,
        newNote: -1,
        newNoteTxt: '',
        datePicker: -1,
        menu: false,
        date: ''
      }
    },
    methods: {
      addNote (val) {
        this.newNoteTxt = ''
        this.newNote = val
      },
      saveNote(key) {
        this.spas[key].generalNotes.push({
          date: "Today",
          noteTxt: this.newNoteTxt
        })
        this.newNoteTxt = ''
        this.newNote = -1
      },
      deleteSpa(key) {
        let dialog = "Are you sure you want to delete " + (this.spas[key].description ? this.spas[key].description : "this spa") + "?"
        let confirmation = confirm(dialog)
        if (confirmation)
          this.spas.splice(key, 1);
      },
      addSpa() {
        this.spas.push({
          id: '',
          description: '',
          brand: '',
          model: '',
          year: '',
          purchaseDate: '',
          purchaseFrom: '',
          generalNotes: [],
          useBillingAddress: false,
          address: {
            street: '',
            type: '',
            suite: '',
            city: '',
            state: '',
            zip: ''
          }
        })
      },
      openDatePicker(val) {
        if (!this.viewonly && this.datePicker == val) {
          return true
        }

        return false
      }
    }
  }
</script>

<style scoped>

</style>