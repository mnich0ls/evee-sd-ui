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
    filterId: 1,
    stockImages: [
      'https://cdn.pixabay.com/photo/2017/09/23/10/45/usa-2778354__480.jpg',
      'https://cdn.pixabay.com/photo/2018/06/15/10/35/map-3476638__480.jpg',
      'https://cdn.pixabay.com/photo/2014/03/22/14/05/balboa-park-292588__480.jpg',
      'https://cdn.pixabay.com/photo/2017/09/22/21/23/usa-2777092__480.jpg',
      'https://cdn.pixabay.com/photo/2016/07/11/06/00/sunset-1509132__480.jpg',
      'https://cdn.pixabay.com/photo/2010/12/17/10/46/skyline-3731__480.jpg',
      'https://cdn.pixabay.com/photo/2015/05/29/21/35/city-789822__480.jpg',
      'https://cdn.pixabay.com/photo/2010/12/17/10/45/evening-3726__480.jpg',
      'https://cdn.pixabay.com/photo/2016/09/30/14/55/sunset-1705524__480.jpg',
      'https://cdn.pixabay.com/photo/2015/04/28/02/01/san-diego-bay-742904__480.jpg',
      'https://cdn.pixabay.com/photo/2013/02/25/16/15/san-diego-86036__480.jpg',
      'https://cdn.pixabay.com/photo/2016/07/02/00/38/sunset-1492219__480.jpg',
      'https://cdn.pixabay.com/photo/2014/07/27/17/21/balboa-park-403067__480.jpg',
      'https://cdn.pixabay.com/photo/2017/02/24/18/04/san-diego-2095778__480.jpg',
      'https://cdn.pixabay.com/photo/2016/07/23/20/13/panorama-1537475__480.jpg'
  ]
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
            if (!this.events.length && this.$store.state.search) {
              this.$ga.event({
                eventCategory: 'No results',
                eventAction: this.$store.state.search
              })
              // console.log('no results...', this.$store.state.search)
            }
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
              if (event.thumbnail_url === "https://i.imgur.com/yIPRLMg.jpg") {
                event.thumbnail_url = this.stockImages[Math.floor(Math.random() * this.stockImages.length)]
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
