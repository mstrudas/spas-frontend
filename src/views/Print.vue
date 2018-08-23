<template>
  <div>
    <h1>Printer Friendly View</h1>
    <v-btn color="primary" @click="print" class="no-print">Print</v-btn>
  </div>
</template>

<script>
  export default {
    data() {
      return {

      }
    },
    methods: {
      print() {
        window.print()
      }
    }
  }
</script>