<template>
  <v-toolbar
      app
    >
      <v-toolbar-side-icon @click.stop="toggleMenu"></v-toolbar-side-icon>
      <v-toolbar-title v-text="title"></v-toolbar-title>
      <v-spacer></v-spacer>
      <v-icon @click="logout">remove_circle</v-icon>
    </v-toolbar>
</template>

<script>
  import { mapState, mapMutations } from 'vuex'

  export default {
    data () {
      return {
        title: 'Sensational Spas'
      }
    },
    computed: {
      ...mapState([
        'isAuth'
      ])
    },
    methods: {
      ...mapMutations([
        'logout'
      ]),
      ...mapMutations([
        'toggleMenu'
      ])
    }
  }
</script>