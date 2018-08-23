<template>
  <v-app>
    <navigation-bar class="no-print"></navigation-bar>
    <v-content>
      <router-view></router-view>
    </v-content>
    <v-footer class="no-print">
      <span>&copy; 2018</span>
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

<style>
  @media print
    {
        .no-print, .no-print *
        {
            display: none !important;
        }
    }
</style>