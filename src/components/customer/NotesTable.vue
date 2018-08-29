<template>
  <v-card>
    <v-card-text>
    <div>
      <v-toolbar class="elevation-1" color="white">
        <v-toolbar-title>Notes</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-dialog v-model="dialog" max-width="500px">
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
      <v-data-table
        :headers="headers"
        :items="data"
        :pagination.sync="pagination"
        :custom-sort="sortByDate"
        must-sort
      >
        <template slot="items" slot-scope="props">
          <tr  @click="props.expanded = !props.expanded">
          <td>{{ props.item.date | formatDate }}</td>
          <td>{{ props.item.modified | formatDate }}</td>
          <td>{{ props.item.note.substr(0, 40).trim() + '...'}}</td>
          <td class="justify-center layout px-0">
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
          </tr>
        </template>
        <template slot="expand" slot-scope="props">
          <div class="pa-4">
            {{ props.item.note }}
          </div>
        </template>
        <template slot="no-data">
          <v-btn color="primary" @click="initialize">Reset</v-btn>
        </template>
      </v-data-table>
    </div>
  </v-card-text>
</v-card>
</template>

<script>
import Axios from 'axios'
import Moment from 'moment'
// Notes: https://next.json-generator.com/api/json/get/Nyyz65kwB

export default {
  props: ['inputData'],
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
      { text: 'Note', value: 'note', sortable: false, width: '50%' },
      { text: 'Actions', value: 'name', sortable: false, width: '10%' }
    ],
    lastID: 0,
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
    },
    data: []
  }),

  computed: {
    formTitle () {
      return this.editedIndex === -1 ? 'New Note' : 'Edit Note'
    }
  },

  watch: {
    dialog (val) {
      val || this.close()
    }
  },

  created () {
    this.initialize()
  },
  filters: {
    formatDate(date = false) {
      if (!date) {
        return ""
      }
      return Moment(date).format("MMM DD, YYYY")
    }
  },
  methods: {
    initialize () {

      this.data = this.inputData || JSON.parse(`[
        {
          "id": 223,
          "note": "fugiat nulla veniam occaecat sit ut esse do in aliqua veniam culpa excepteur laboris excepteur ullamco officia cillum commodo magna excepteur dolore fugiat sit excepteur quis Lorem",
          "date": "Wed Jun 18 2003 02:55:43 GMT+0000 (UTC)",
          "modified": "Tue Jun 19 2018 20:23:06 GMT+0000 (UTC)"
        },
        {
          "id": 529,
          "note": "sint veniam dolor esse eiusmod ipsum qui sunt elit occaecat veniam voluptate minim id veniam et commodo duis ex ut voluptate veniam",
          "date": "Thu Nov 15 2001 14:27:11 GMT+0000 (UTC)",
          "modified": ""
        },
        {
          "id": 490,
          "note": "cupidatat nisi aliquip cupidatat aute adipisicing in nisi consectetur pariatur",
          "date": "Mon Jun 13 2005 02:02:33 GMT+0000 (UTC)",
          "modified": "Tue May 20 2008 10:32:13 GMT+0000 (UTC)"
        },
        {
          "id": 612,
          "note": "magna esse ullamco nulla esse deserunt veniam officia in ut est irure ullamco aliquip sit exercitation consectetur ut elit esse ipsum excepteur quis cupidatat reprehenderit ut magna et voluptate sunt",
          "date": "Mon Aug 04 2008 08:30:06 GMT+0000 (UTC)",
          "modified": "Wed Dec 21 2016 12:18:35 GMT+0000 (UTC)"
        },
        {
          "id": 398,
          "note": "incididunt est sit fugiat voluptate sunt magna qui et enim mollit excepteur sit culpa",
          "date": "Sat Apr 28 2018 05:22:08 GMT+0000 (UTC)",
          "modified": "Wed Jun 20 2018 03:15:16 GMT+0000 (UTC)"
        },
        {
          "id": 488,
          "note": "quis excepteur pariatur ut commodo pariatur occaecat non cupidatat exercitation fugiat irure ipsum aliquip culpa do ad aliqua id non quis id et mollit incididunt pariatur ad aliqua",
          "date": "Tue Mar 08 2005 13:00:32 GMT+0000 (UTC)",
          "modified": "Mon Sep 12 2016 12:03:51 GMT+0000 (UTC)"
        },
        {
          "id": 669,
          "note": "id id ut aliqua do consequat dolor elit duis ipsum magna velit consectetur in",
          "date": "Tue Jan 23 2001 02:58:35 GMT+0000 (UTC)",
          "modified": ""
        },
        {
          "id": 965,
          "note": "reprehenderit et reprehenderit et quis tempor magna amet mollit magna tempor",
          "date": "Mon Mar 29 2004 06:54:35 GMT+0000 (UTC)",
          "modified": ""
        },
        {
          "id": 249,
          "note": "ex qui consectetur qui commodo do cupidatat laboris excepteur esse Lorem officia nostrud nisi duis nulla ex incididunt Lorem eiusmod incididunt id laboris sunt velit dolore commodo incididunt fugiat laboris",
          "date": "Sun May 11 2003 12:11:21 GMT+0000 (UTC)",
          "modified": ""
        },
        {
          "id": 450,
          "note": "sunt quis velit occaecat culpa duis eu sunt sunt in do mollit",
          "date": "Mon Nov 03 2008 02:24:08 GMT+0000 (UTC)",
          "modified": ""
        }
      ]`)
      this.lastID = this.data.reduce((max, p) => p.id > max ? p.id : max)
    },
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