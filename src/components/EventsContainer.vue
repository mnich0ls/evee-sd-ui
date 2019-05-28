<template>
  <v-container fluid grid-list-xl>
    <v-layout row wrap>
      <!-- <v-flex class="lg12 md12 sm12 xs12"> -->
        <template v-for="(event,index) in events">
          <v-flex v-if="event.type === 'header'" class="mt-4 xs12" :key="index">
            <p class="title">{{event.date | formatDateHeading}}</p>
            <hr>
          </v-flex>
          <v-flex v-else class="lg3 md4 sm6 xs12" :key="index">
            <event-card :event="event"></event-card>
          </v-flex>
        </template>  
      <!-- </v-flex> -->
    </v-layout>
  </v-container>
</template>

<script>

import moment from 'moment'

import EventCard from './EventCard.vue'

export default {
  name: 'EventsContainer',
  data: () => ({
    events: []
  }),
  components: {
    EventCard
  },
  created(){
    var axios = window.axios; // Stops ESlint warning - I defined on window via main.js
    axios.get('https://ec2-18-144-1-16.us-west-1.compute.amazonaws.com/api/v1/events').then(payload=>{

      const today = moment().format('YYYY-MM-DD');

      let events = payload.data.response;
      let current_date = events[0].start_date.split('T')[0];

      if (this.events.length < 1) {
        let event = {
          type: 'header'
        }
        if (moment(current_date).isBefore(today)) {
          event.date = today
        } else {
          event.date = current_date
        }
        this.events.push(event)
      }
      events.forEach(event=>{
        let start_date = event.start_date.split('T')[0];
        let next_date = start_date;
        if (moment(current_date).isBefore(next_date)) {
          this.events.push({
            type: 'header',
            date: next_date
          })
          current_date = next_date;
        }
        if(moment(start_date).isBefore(today)){
          event.start_date = today;
        }
        this.events.push(event);
      });
    });

  }
}
</script>

<style scoped>
</style>
