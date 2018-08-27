<template>

  <v-form ref="notesForm">
    <v-layout row  v-if="!newNote" v-show="!viewonly">
      <v-flex xs2>
        <v-btn color="primary" @click="newNote = true">Add Note</v-btn>
      </v-flex>
    </v-layout>
    <v-layout row v-else>
      <v-flex xs12>
        <v-textarea
          solo
          auto-focus
          v-model="noteText"
        ></v-textarea>
        <div class="text-xs-right">
          <v-btn color="success" @click="saveNote">Save Note</v-btn>
        </div>
      </v-flex>
    </v-layout>
    <v-layout row v-for="(note, i) in notes" :key="i">
      <v-flex xs12>
        <v-card>
          <v-card-text>
            <v-layout row>
              <v-flex xs3 md2 class="bold">
                {{ moment(note.time).format("MMM DD, YYYY") }}
              </v-flex>
              <v-flex xs9 md10 v-html="formatString(note.note)">
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
import Moment from 'moment'
import Util from './utility'

export default {
  data() {
    return {
      notes: [],
      newNote: false,
      noteText: ''
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
    ...mapActions('customer', ['fetchNotes']),
    compareChanges: Util.compareChanges,
    copyObject: Util.copyObject,
    moment: Moment,
    saveNote() {
      //Push note to array if Axios call succeeds
      if (this.noteText != '') {
        this.notes.push({
          time: new Date(),
          note: JSON.stringify(this.noteText)
        })
      }
      this.noteText = ''
      this.newNote = false
    },
    formatString(string) {
      const regex = /\\n/g
      return string.replace(regex, "<br/>").slice(1, -1)
    },
    resetData() {
      this.notes = []
      this.$forceUpdate()
    },
    fetchData() {
      this.fetchNotes().then(() => {
        this.copyObject(this.$store.state.customer.notes, this.notes)
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
          this.resetData()
        }
      },
      immediate: true
    }
  }
}
</script>

<style scoped>
.bold {
  font-weight: bold;
}
</style>