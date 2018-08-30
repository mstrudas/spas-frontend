<template>
  <v-container class="pa-0 ma-0">
    <v-layout row>
      <v-flex xs12 class="pa-0 ma-0">
        <v-toolbar card color="white">
          <h2>{{ title }}</h2>
          <v-spacer></v-spacer>
          <v-dialog v-model="dialog" max-width="500px" v-if="!readonly">
            <v-btn slot="activator" color="primary" dark class="mb-2">New Note</v-btn>
            <v-card>
              <v-card-title>
                <span class="headline">{{ formTitle }}</span>
              </v-card-title>
              <v-card-text>
                <v-container grid-list-md>
                  <v-layout row>
                    <v-flex xs12>
                      <v-textarea
                        solo
                        auto-focus
                        label="Message"
                        v-model="editedItem.note"
                      ></v-textarea>
                    </v-flex>
                  </v-layout>
                </v-container>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" flat @click.native="close">Cancel</v-btn>
                <v-btn color="blue darken-1" flat @click.native="save">Save</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </v-flex>
    </v-layout>
    <v-layout row>
      <v-flex xs12 class="ma-0 pa-0">
        <v-data-table
          :headers="headers"
          :items="data"
          :pagination.sync="pagination"
          :custom-sort="sortByDate"
          must-sort
        >
          <template slot="items" slot-scope="props">
            <tr @click="props.expanded = !props.expanded">
            <td>{{ props.item.date | formatDate }}</td>
            <td>{{ props.item.modified | formatDate }}</td>
            <td>{{ props.item.note | truncate}}</td>
            <td class="justify-center layout px-0" v-if="!readonly">
              <v-icon
                small
                class="mr-2"
                @click="editItem(props.item)"
              >
                edit
              </v-icon>
              <v-icon
                small
                @click="deleteItem(props.item)"
              >
                delete
              </v-icon>
            </td>
            <td class="justify-center layout px-0" v-else>
              <v-icon
                small
              >not_interested</v-icon>
            </td>
            </tr>
          </template>
          <template slot="expand" slot-scope="props">
            <div class="ma-0 pa-4">
              {{ props.item.note }}
            </div>
          </template>
          <template slot="no-data">
            <v-alert :value="true" icon="warning" color="warning">No Notes Here</v-alert>
          </template>
        </v-data-table>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import Moment from 'moment'
// Notes: https://next.json-generator.com/api/json/get/Nyyz65kwB

export default {
  props: {
    data: {
      type: Array,
      default: []
    },
    readonly: {
      type: Boolean,
      default: true
    },
    title: {
      type: String,
      default: 'Notes'
    }
  },
  data: () => ({
    dialog: false,
    pagination: {
      descending: true,
      rowsPerPage: 10,
      sortBy: 'date',
      page: 1,
      totalItems: 0
    },
    headers: [
      {
        text: 'Created',
        value: 'date',
        width: '20%'
      },
      { text: 'Modified', value: 'modified', width: '20%' },
      { text: 'Note', value: 'note', sortable: false },
      { text: 'Actions', value: 'name', sortable: false, width: '15%' }
    ],
    lastID: -100,
    editedIndex: -1,
    editedItem: {
      id: '',
      date: '',
      note: ''
    },
    defaultItem: {
      id: '',
      date: '',
      note: ''
    }
  }),

  computed: {
    formTitle () {
      return this.editedIndex === -1 ? 'New Note' : 'Edit Note'
    }
  },
  filters: {
    formatDate(date = false) {
      if (!date) {
        return ""
      }
      return Moment(date).format("MMM DD, YYYY")
    },
    truncate(str) {
      if (str.length > 40) {
        return str.substr(0, 40).trim() + '...'
      }
      return str
    }
  },
  methods: {
    editItem (item) {
      this.editedIndex = this.data.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialog = true
    },
    deleteItem (item) {
      const index = this.data.indexOf(item)
      confirm('Are you sure you want to delete this note?') && this.data.splice(index, 1)
    },
    close () {
      this.dialog = false
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      }, 300)
    },
    save () {
      if (this.editedItem.note == '') {
        this.close()
        return
      }
      if (this.editedIndex > -1) {
        this.editedItem.modified = '' + new Date()
        Object.assign(this.data[this.editedIndex], this.editedItem)
      } else {
        this.editedItem.date = '' + new Date()
        this.editedItem.id = this.lastID + 5
        this.data.push(this.editedItem)
      }
      this.close()
    },
    sortByDate(items, index, isDescending) {
      let order = isDescending ? -1 : 1
      return items.sort(function(a, b) {
        if (isNaN(Date.parse(a[index])) && isNaN(Date.parse(b[index]))) {
          return 0
        } else if (isNaN(Date.parse(a[index]))) {
          return order * -1
        } else if (isNaN(Date.parse(b[index]))) {
          return order
        } else {
          return (Date.parse(a[index]) - Date.parse(b[index])) * order
        }
      })
    }
  }
}

</script>

<style>

</style>