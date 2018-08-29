<template>

  <v-form ref="notesForm">
    <v-layout row v-if="notes.length == 0">
      <v-flex xs12>
        <v-card>
          <v-card-title><h3>No Notes Here</h3></v-card-title>
        </v-card>
      </v-flex>
    </v-layout>
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
    <v-layout row v-for="note in notes" :key="note.id">
      <v-flex xs12>
        <v-card v-if="noteForEdit != note.id">
          <v-card-text>
            <v-layout row>
              <v-flex xs3 md2 class="bold">
                {{ moment(note.time).format("MMM DD, YYYY") }}
              </v-flex>
              <v-flex xs8 md9 v-html="formatString(note.note)">
              </v-flex>
              <v-flex xs1 v-if="!viewonly">
                <v-icon @click="editNote(note.id)">edit</v-icon>
                <v-icon @click="deleteNote(note.id)">delete</v-icon>
              </v-flex>
            </v-layout>
          </v-card-text>
        </v-card>
        <v-textarea
          v-if="noteForEdit == note.id"
          solo
          auto-focus
          v-model="editText"
        ></v-textarea>
        <v-btn color="error" v-if="noteForEdit == note.id" @click="cancelEditedNote(note.id)">Cancel</v-btn>
        <v-btn color="success" v-if="noteForEdit == note.id" @click="saveEditedNote(note.id)">Save</v-btn>
      </v-flex>
    </v-layout>
  </v-form>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import Moment from 'moment'
import Util from './utility'

export default {
  data() {
    return {
      notes: [],
      newNote: false,
      noteText: '',
      noteForEdit: -1,
      editText: '',
      oldNote: ''
    }
  },
  computed: {
    ...mapGetters('customer', ['viewonly'])
  },
  methods: {
    ...mapActions('customer', ['fetchNotes']),
    compareChanges: Util.compareChanges,
    copyObject: Util.copyObject,
    sortedNotes: Util.sortedNotes,
    moment: Moment,
    saveNote() {
      //Push note to array if Axios call succeeds
      if (this.noteText != '') {
        this.notes.unshift({
          time: new Date(),
          note: JSON.stringify(this.noteText)
        })
      }
      this.noteText = ''
      this.newNote = false
    },
    formatString(string) {
      const regex = /\\n/g
      return string.replace(regex, "<br/>")
    },
    resetData() {
      this.notes = []
      this.$forceUpdate()
    },
    fetchData() {
      this.fetchNotes().then(() => {
        this.notes = this.sortedNotes(this.copyObject(this.$store.state.customer.notes), 'time')
      })
    },
    editNote(key) {
      let index = this.notes.findIndex(function (el) {
        return el.id == key
      })
      this.oldNote = this.notes[index].note
      this.editText = this.notes[index].note
      this.noteForEdit = key
    },
    saveEditedNote(key) {
      this.noteForEdit = -1
      let index = this.notes.findIndex(function (el) {
        return el.id == key
      })
      this.notes[index].note = JSON.stringify(this.editText)
      this.editText = ''
      this.oldNote = ''
    },
    cancelEditedNote(key) {
      this.notes[key].note = this.oldNote
      this.noteForEdit = -1
      this.oldNote = ''
    },
    deleteNote(key) {

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