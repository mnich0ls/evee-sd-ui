<template>
  <v-container fluid grid-list-xl>
    <v-layout row wrap>
        <template v-for="(event,index) in events">
          <v-flex v-if="event.type === 'header'" class="mt-4 xs12" :key="index">
            <p class="title">{{event.date | formatDateHeading}}</p>
            <hr>
          </v-flex>
          <v-flex v-else class="lg3 md4 sm6 xs12" :key="index">
            <event-card :event="event"></event-card>
          </v-flex>
        </template>  
    </v-layout>
    <infinite-loading :identifier="filterId" @infinite="infiniteHandler">
      <div slot="no-more"><a href="mailto:mike@evee-sd.com?subject=Events I'm looking for">Looking for something specific? Let us know.</a></div>
      <div slot="no-results">Sorry, we couldn't find anything for you :( <br><a href="mailto:mike@evee-sd.com?subject=Events I'm looking for">Let us know what you're looking for.</a></div>
    </infinite-loading>
  </v-container>
</template>

<script>

import InfiniteLoading from 'vue-infinite-loading';
import moment from 'moment'
import EventCard from './EventCard.vue'
import EventBus from '../plugins/event-bus.js'

export default {
  name: 'EventsContainer',
  data: () => ({
    eventsApiBaseUrl: '',
    events: [],
    page: 1,
    filterId: 1
  }),
  components: {
    EventCard,
    InfiniteLoading
  },
  created() {
    EventBus.$on('filter', this.applyFilter)
    this.eventsApiBaseUrl = process.env.VUE_APP_EVENTS_API_BASE_URL
    // console.log('configured events API URL', this.eventsApiBaseUrl)
  },
  methods: {
    infiniteHandler($state) {
      // console.log('fetching events...')
        var axios = window.axios; // Stops ESlint warning - I defined on window via main.js
        axios.get(this.eventsApiBaseUrl, {
          params: {
            page: this.page++,
            search: this.$store.state.search,
            price: this.$store.state.price,
            date: this.$store.state.date,
            categories: this.$store.state.categories,
            locations: this.$store.state.locations
          }
        }).then(payload=>{
          // console.log('received events..')
          let date = moment().format('YYYY-MM-DD')
          let filterDate = this.$store.state.date
          if (filterDate && moment(filterDate).isAfter(date)) {
            date = filterDate
          }

          let events = payload.data.response;
          if (!events.length) {
            $state.complete()
          } else {
            let current_date = events[0].start_date.split('T')[0];
            if (moment(current_date).isBefore(date)) {
                current_date = date
            }
            if (this.events.length < 1) {
              // set the first date header if this is the first page of events
              this.events.push({
                type: 'header',
                date: current_date
              })
            }
            events.forEach(event=>{
              let next_date = event.start_date.split('T')[0];
              if (moment(next_date).isAfter(current_date)) {
                this.events.push({
                  type: 'header',
                  date: next_date
                })
                current_date = next_date;
              } else if (moment(next_date).isBefore(current_date)) {
                event.start_date = current_date
              }
              this.events.push(event);
            });
            $state.loaded(); 
          }
        });
    },
    applyFilter() {
      this.page = 1
      this.events = []
      this.filterId++
    }
  }
}
</script>

<style scoped>
</style>
