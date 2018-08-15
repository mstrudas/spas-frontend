<template>
  <v-app>
    <navigation-bar></navigation-bar>
    <v-content>
      <router-view></router-view>
    </v-content>
    <v-footer>
      <span>&copy; 2017</span>
    </v-footer>
  </v-app>
</template>

<script>
import { mapState } from 'vuex'
import NavigationBar from '@/components/Navigation.vue'

export default {
  name: 'App',
  components: {
    NavigationBar
  },
  data () {
    return {

    }
  },
  computed: {
    ...mapState([
      'isAuth'
    ])
  },
}
</script>
