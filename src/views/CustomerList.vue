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
            :loading="loading"
            :headers="headers"
            :items="dataTable"
            :pagination.sync="pagination"
            :total-items="pagination.totalItems"
            
            hide-actions
            item-key="clientID"
            class="elevation-1"
          >
            <v-alert slot="no-data" :value="true" color="warning" icon="warning">
              No data was found.
            </v-alert>
            <template slot="items" slot-scope="props">
              <tr @click="props.expanded = !props.expanded">
                <td>{{ props.item.firstName + ' ' + props.item.lastName }}</td>
                <td></td>
                <td>{{ props.item.spouse }}</td>
                <td>{{ Array.isArray(props.item.phone) ? props.item.phone[0].phone : "" | phoneNumber }}</td>
                <td>{{ props.item.streetAddress }} </td>
                <td>
                  <v-icon v-if="props.item.spa_bool == 1" color="green">fa-check-circle</v-icon>
                  <v-icon v-else color="red">fa-times-circle</v-icon>
                </td>
                <td>
                  <v-icon v-if="props.item.pool_bool == 1" color="green">fa-check-circle</v-icon>
                  <v-icon v-else color="red">fa-times-circle</v-icon>
                </td>
                <td>
                  <v-icon @click="$router.push('/customers/' + props.item.clientID + '/edit')">edit</v-icon>
                  <v-icon @click="$router.push('customers/' + props.item.clientID + '/print')">local_printshop</v-icon>
                </td>
              </tr>
            </template>
            <template slot="expand" slot-scope="props">
              <v-card flat >
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
          <v-pagination v-model="pagination.page" :length="pages"></v-pagination>
        </v-flex>
      </v-layout>
    </v-container>
</template>

<script>
import Axios from 'axios'

export default {
  name: 'CustomerList',
  components: {
  },
  data() {
    return {
      search: '',
      loading: true,
      pagination: {
        rowsPerPage: 25,
        page: 1,
        totalItems: 0
      },
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
      dataTable: [],
      pages: 0
    }
  },
  watch: {
    pagination: {
      handler() {
        this.fetch()
      },
      deep: true,
      immediate: true
    },
    search: {
      handler(criteria) {
        if (criteria.length > 2 || criteria.length === 0) 
          this.fetch()
      }
    }
  },
  methods: {
    fetch() {
        this.loading = true
        this.getData(this.pagination.page, this.search)
        .then(data => {
          this.loading = false
          this.dataTable = data.data
          this.total = data.total
          this.pages = data.last_page
        })
    },
    getData(pageNo, criteria = null) {
      return new Promise((resolve, reject) => {
        const config = {
          headers: {
            "bearer": this.$store.getters.getToken
          },
          params: {
            page: pageNo
          }
        }
        if (criteria !== "") {
          config.params.search = criteria
          this.pagination.page = 1
        }
        Axios.get('http://local.devel/sensational-api/api/v1/customers', config)
          .then(function(response) {
            resolve(response.data)
          }).catch(function(err) {
            reject(err)
          })
      })

    }
  }
}
</script>

<style scoped>

</style>