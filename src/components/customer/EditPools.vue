<template>
  <v-form ref="poolsForm">
    <v-layout row v-for="(pool, i) in pools" :key="i">
      <v-flex xs12>
        <v-card>
          <v-card-title><h3>{{ pool.description ? pool.description : "Pool"}}</h3></v-card-title>
          <v-card-text>
            <v-layout row>
              <v-flex xs12>
                <v-text-field
                  label="Description"
                  v-model="pool.description"
                ></v-text-field>
              </v-flex>
            </v-layout>
            <v-layout row>
              <v-flex xs12>
                <v-text-field
                  label="Size"
                  v-model="pool.size"
                ></v-text-field>
              </v-flex>
            </v-layout>
            <v-layout row>
              <v-flex xs12>
                <v-text-field
                  label="Pump"
                  v-model="pool.pump"
                ></v-text-field>
              </v-flex>
            </v-layout>
            <v-layout row>
              <v-flex xs12>
                <v-text-field
                  label="Equipment"
                  v-model="pool.equip"
                ></v-text-field>
              </v-flex>
            </v-layout>
            <v-layout row>
              <v-flex xs12>
                  <h4>Location</h4>
              </v-flex>
            </v-layout>
            <v-layout row>
              <v-flex xs8 md6>
                  <v-text-field
                    label="Address"
                    v-model="pool.address.street"
                  ></v-text-field>
              </v-flex>
              <v-flex xs2 md2>
                <v-select
                  label="Type"
                  :items="['None', 'Apt', 'Suite', 'Lot', 'Other']"
                  v-model="pool.address.type"
                ></v-select>
              </v-flex>
              <v-flex xs6 md4 v-if="pool.address.type && pool.address.type != 'None'">
                <v-text-field
                  :label="pool.address.type + '#'"
                  v-model="pool.address.suite"
                ></v-text-field>
              </v-flex>
            </v-layout>
            <v-layout row>
              <v-flex xs8 md6>
                <v-text-field
                  label="City"
                  v-model="pool.address.city"
                ></v-text-field>
              </v-flex>
              <v-flex xs2 md2>
                <v-select
                  label="State"
                  v-model="pool.address.state"
                  :items="states"
                ></v-select>
              </v-flex>
              <v-flex xs4 md4>
                <v-text-field
                  label="Zip Code"
                  v-model="pool.address.zip"
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
            <v-layout row>
              <v-flex xs2 offset-xs10>
                <v-btn color="primary" v-if="newNote !== i" @click="addNote(i)">Add Note</v-btn>
                <v-btn color="primary" v-else @click="saveNote()">Save Note</v-btn>
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
    props: ['pools'],
    data() {
      return {
        states: [
          'MI', 'IN', 'OH', 'IL'
        ],
        newNote: -1,
        newNoteTxt: ''
      }
    },
    methods: {
      addNote (val) {
        this.newNoteTxt = ''
        this.newNote = val
      },
      saveNote() {

      }
    }
  }
</script>

<style scoped>

</style>