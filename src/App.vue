<template>
  <div id="app">
    <!-- <img alt="Vue logo" src="./assets/logo.png">
    <EventsContainer msg="Extra prop data"/> -->
    <v-app id="inspire">
      <!-- <v-navigation-drawer
        v-model="drawer"
        fixed
        app
      >
        <v-list dense>
          <v-list-tile @click="null">
            <v-list-tile-action>
              <v-icon>home</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>Home</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
          <v-list-tile @click="null">
            <v-list-tile-action>
              <v-icon>contact_mail</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>Contact</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
      </v-navigation-drawer> -->
      <v-toolbar color="gray" dark fixed app>
        <!-- <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon> -->
        <v-toolbar-title class="app-title">
          <v-icon color="green" class="far fa-calendar-alt mb-1"></v-icon> EveeSD
        </v-toolbar-title>
      </v-toolbar>
      <v-content>
        <events-container></events-container>
      </v-content>
      <!-- <v-footer color="black" app>
        <span class="ml-3 white--text">&copy; 2019</span>
      </v-footer> -->
    </v-app>
  </div>
</template>

<script>
import EventsContainer from './components/EventsContainer.vue'

export default {
  name: 'app',
  components: {
    EventsContainer
  },
  data: () => ({
      drawer: false
  })
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
