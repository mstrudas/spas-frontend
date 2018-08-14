<template>
  <div v-if="isAuth">
    <v-navigation-drawer
      temporary
      :value="drawer"
      @input="toggleMenu"
      app
    >
      <v-list>
        <v-list-tile
          value="true"
          v-for="(item, i) in items"
          :key="i"
          :to="item.path"
        >
          <v-list-tile-action>
            <v-icon v-html="item.icon"></v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title v-text="item.title"></v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <top-bar></top-bar>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import TopBar from '@/components/TopBar.vue'

export default {
  data () {
    return {
      clipped: false,
      fixed: false
    }
  },
  computed: {
    ...mapState({
      isAuth: state => state.isAuth,
      drawer: state => state.menu.drawer,
      items: state => state.menu.items
    })
  },
  methods: {
    ...mapMutations([
      'toggleMenu'
    ])
  },
  components: {
    TopBar
  }
}
</script>