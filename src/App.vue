<template>
  <div id="app">
    <v-app id="inspire">
      <v-toolbar color="blue darken-2" dark fixed app>
        <v-toolbar-side-icon @click="toggleDrawer"></v-toolbar-side-icon>
        <v-toolbar-title class="app-title">
          <v-icon color="white" class="far fa-calendar-alt mb-1"></v-icon> EveeSD
        </v-toolbar-title>
      </v-toolbar>
      <v-content>
        <app-drawer></app-drawer>
        <events-container></events-container>
      </v-content>
    </v-app>
  </div>
</template>

<script>
import AppDrawer from './components/AppDrawer.vue'
import EventsContainer from './components/EventsContainer.vue'
import EventBus from './plugins/event-bus.js'
import { page } from 'vue-analytics'

export default {
  name: 'app',
  components: {
    AppDrawer,
    EventsContainer
  },
  data: () => ({
      showDrawer: false,
  }),
  mounted() {
    this.track()
  },
  methods: {
    track() {
      page('/')
    },
    toggleDrawer() {
      EventBus.$emit('toggleDrawer');
    }
  }
}
</script>

<style>
#app {
  font-family: 'Roboto', sans-serif;
}

.app-title{
  font-family: 'Fontdiner Swanky', cursive;
}
</style>
