<template>
    <router-view></router-view>
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
