<template>
  <v-app>
    <v-content>
      <v-layout>
        <v-flex xs12 class="pa-5 text-xs-center">
          <v-icon color="amber accent-2">fa-exclamation-triangle fa-10x</v-icon>
          <div class="text-lg">You're Drunk. <br /> Go <v-icon @click="$router.push('/')" color="light-green darken-4">fas fa-home fa-lg</v-icon></div>
          <div class="text-md">(This page doesn't exist)</div>
        </v-flex>
      </v-layout>
    </v-content>
  </v-app>
</template>

<style scoped>
  .text-lg {
     font-size:  3em;
  }
  .text-md {
    font-size: 2em;
  }
</style>