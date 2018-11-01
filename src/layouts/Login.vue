<template>
  <v-app id="inspire">   
    <loading :active.sync="loading" :is-full-page="true">
    </loading>
    <v-content>
      <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md4>
            <v-card class="elevation-12">
              <v-card-text>
                <div class="text-xs-center">
                  <img src="@/assets/logo.jpg" />
                </div>
                <v-form>
                  <v-text-field prepend-icon="person" v-model="username" name="login" label="Login" type="text"></v-text-field>
                  <v-text-field id="password" prepend-icon="lock" v-model="password" name="password" label="Password" type="password"></v-text-field>
                </v-form>
                <v-alert
                  :value="error"
                  type="error"
                >
                  {{ errMessage }}
                </v-alert>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="primary" @click="login">Login</v-btn>
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content> 
  </v-app>
</template>

<script>
  import Loading from 'vue-loading-overlay'
  import 'vue-loading-overlay/dist/vue-loading.css'


  export default {
    data: () => ({
      loading: false,
      drawer: null,
      username: '',
      password: '',
      error: false,
      errMessage: ''
    }),
    methods: {
      login () {
        this.$store.dispatch('login', {username: this.username, password: this.password})
          .then(() => {
            this.$router.push(this.$store.state.nextPath)
          })
          .catch((err) => {
            this.errMessage = err
            this.error = true
          })
      }
    },
    components: {
      Loading
    }
  }
</script>

<style scoped>

</style>