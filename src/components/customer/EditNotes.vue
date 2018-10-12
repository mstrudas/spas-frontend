<template>
  <notes-table
    :data="notes"
    :readonly="viewonly"
    title="Customer Notes"
    class="ma-0 pa-0"
  ></notes-table>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import Util from './utility'
import NotesTable from '@/components/customer/NotesTable.vue'

export default {
  data() {
    return {
      notes: []
    }
  },
  computed: {
    ...mapGetters('customer', ['viewonly'])
  },
  methods: {
    ...mapActions('customer', ['fetchNotes']),
    compareChanges: Util.compareChanges,
    copyObject: Util.copyObject,
    sortedNotes: Util.sortedNotes,
    fetchData() {
      this.fetchNotes().then(() => {
        this.notes = this.copyObject(this.$store.state.customer.notes)
      })
    }
  },
  watch: {
    '$route': {
      handler: function (to)  {
        const regex = /customers\/\d+\/(edit|view)/
        if (regex.test(to.path)) {
          this.fetchData()
        } else {
          this.notes = []
        }
      },
      immediate: true
    }
  },
  components: {
    NotesTable
  }
}
</script>

<style scoped>
.bold {
  font-weight: bold;
}

.white-bg {
  background-color: white;
}
</style>