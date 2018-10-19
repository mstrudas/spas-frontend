<template>
  <v-app id="inspire">
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
  import Cookies from 'browser-cookies'

  export default {
    created () {
      if (Cookies.get('token')) {
        const token = Cookies.get('token')
        this.$store.dispatch('login', {token})
      }
    },
    data: () => ({
      drawer: null,
      username: '',
      password: '',
      error: false,
      errMessage: ''
    }),
    methods: {
      login () {
        this.$store.dispatch('login', {username: this.username, password: this.password})
          .catch((err) => {
            this.errMessage = err
            this.error = true
          })
      }
    }
  }
</script>

<style scoped>

</style>