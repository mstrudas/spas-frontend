<template>
    <v-container>
      <v-layout row>
        <v-flex xs12>
          <v-card>
            <v-card-title>
              <h2>Customers</h2>&nbsp;&nbsp;&nbsp;
              <v-icon @click="$router.push('/customers/new')">fa-plus-square</v-icon>
              <v-spacer></v-spacer>
              <v-text-field
                v-model="search"
                append-icon="search"
                label="Search"
                single-line
                hide-details
              ></v-text-field>
            </v-card-title>
          </v-card>
          <v-data-table
            :headers="headers"
            :items="dataTable"
            :search="search"
            class="elevation-1"
          >
            <v-alert slot="no-results" :value="true" color="error" icon="warning">
              Your search for "{{ search }}" found no results.
              <v-spacer></v-spacer>
                <v-btn @click="$router.push('/customers/new')">New Customer</v-btn>
            </v-alert>
            <template slot="items" slot-scope="props">
              <tr @click="props.expanded = !props.expanded">
                <td>{{ props.item.firstName + ' ' + props.item.lastName }}</td>
                <td></td>
                <td>{{ props.item.spouse }}</td>
                <td>{{ props.item.phone[0].number }}</td>
                <td>{{ props.item.address }} </td>
                <td>
                  <v-icon v-if="props.item.spa_bool" color="green">fa-check-circle</v-icon>
                  <v-icon v-else color="red">fa-times-circle</v-icon>
                </td>
                <td>
                  <v-icon v-if="props.item.pool_bool" color="green">fa-check-circle</v-icon>
                  <v-icon v-else color="red">fa-times-circle</v-icon>
                </td>
                <td>
                  <v-icon @click="$router.push('/customers/' + props.item.id + '/edit')">edit</v-icon>
                  <v-icon @click="$router.push('customers/' + props.item.id + '/print')">local_printshop</v-icon>
                </td>
              </tr>
            </template>
            <template slot="expand" slot-scope="props">
              <v-card flat>
                <v-card-text>
                  <v-layout row>
                    <v-flex xs4>
                      <b>Address:</b> {{ props.item.address }}
                    </v-flex>
                  </v-layout>
                  <v-layout row>
                    <v-flex xs3>
                      <b>City: </b> {{ props.item.city }}
                    </v-flex>
                    <v-flex xs2>
                      <b>State: </b> {{ props.item.state }}
                    </v-flex>
                    <v-flex xs4>
                      <b>Zip: </b> {{ props.item.zip }}
                    </v-flex>
                  </v-layout>
                </v-card-text>
              </v-card>
            </template>
          </v-data-table>
        </v-flex>
      </v-layout>
    </v-container>
</template>

<script>
import Axios from 'axios'


// Axios: https://next.json-generator.com/api/json/get/V1iWQJNIr
export default {
  name: 'CustomerList',
  components: {
  },
  data() {
    return {
      search: '',
      headers: [
          {
            text: 'Name',
            align: 'left',
            sortable: true,
            value: 'lastName'
          },
          { text: '', sortable: false, value: 'firstName', width: '0%' },
          { text: 'Spouse', value: 'spouse' },
          { text: 'Phone Number', value: 'phone[0].number' },
          { text: 'Street Address', value: 'address' },
          { text: 'Spas', value: 'spa_bool' },
          { text: 'Pools', value: 'pool_bool' },
          { text: 'Actions', sortable: false}
      ],
      dataTable: []
    }
  },
  methods: {
    getData() {
      const self = this
      Axios.get('https://next.json-generator.com/api/json/get/V1iWQJNIr')
        .then(function(response) {
          self.dataTable = response.data
        })
    }
  },
  mounted() {
    this.getData()
  }
}
</script>

<style scoped>

</style>