<template>

  <v-form ref="notesForm">
    <v-layout row v-for="(note, i) in notes" :key="i">
      <v-flex xs12>
        <v-card>
          <v-card-text>
            <v-layout row>
              <v-flex xs3 md2 class="bold">
                {{ note.time }}
              </v-flex>
              <v-flex xs9 md10 v-html="formatString(note.note)">
              </v-flex>
            </v-layout>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
    <v-layout row  v-if="!newNote" v-show="!viewonly">
      <v-flex xs2>
        <v-btn @click="newNote = true">Add Note</v-btn>
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
          <v-btn @click="saveNote">Save Note</v-btn>
        </div>
      </v-flex>
    </v-layout>
  </v-form>
</template>

<script>
  export default {
    props: ['notes', 'viewonly'],
    data() {
      return {
        newNote: false,
        noteText: ''
      }
    },
    methods: {
      saveNote() {
        //Push note to array if Axios call succeeds
        this.notes.push({
          time: new Date(),
          note: JSON.stringify(this.noteText)
        })
        this.noteText = ''
        this.newNote = false
      },
      formatString(string) {
        const regex = /\\n/g
        return string.replace(regex, "<br/>").slice(1, -1)
      }
    }
  }
</script>

<style scoped>
.bold {
  font-weight: bold;
}
</style>