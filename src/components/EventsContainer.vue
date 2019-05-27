<template>
  <v-container fluid grid-list-xl>
    <v-layout row wrap>
      <v-flex class="lg12 md12 sm12 xs12" v-for="(event,key,index) in events" :key="index">
        <v-layout class="mt-4" row wrap>        
          <v-flex>
            <p class="title">{{key | formatDateHeading}}</p>
            <hr>
          </v-flex>
        </v-layout>
        <v-layout row wrap>
          <v-flex class="lg3 md4 sm6 xs12" v-for="(individualEvent,dailyIndex) in event" :key="dailyIndex">
            <event-card :event="individualEvent"></event-card>
          </v-flex>
        </v-layout>        
      </v-flex>    
    </v-layout>
  </v-container>
</template>

<script>

import moment from 'moment'

import EventCard from './EventCard.vue'

export default {
  name: 'EventsContainer',
  data: () => ({
    events: {}
  }),
  components: {
    EventCard
  },
  created(){
    var axios = window.axios; // Stops ESlint warning - I defined on window via main.js
    axios.get('https://ec2-18-144-1-16.us-west-1.compute.amazonaws.com/api/v1/events').then(payload=>{

      let events = payload.data.response;

      let events_GroupedByDate_Obj = {}
      
      let mapDatesToObj = (e)=>{
        if(!events_GroupedByDate_Obj.hasOwnProperty(e.start_date)){
          events_GroupedByDate_Obj[e.start_date] = []
        }
        events_GroupedByDate_Obj[e.start_date].push(e)
      }
      
      events.forEach(e=>{
        if(!moment(e.start_date).isBefore(moment().format('YYYY-MM-DD'))){ // Don't show any start_dates that already have passed
          mapDatesToObj(e);
        }
        else {
          // Check if the events with start_dates that have already passed have active / on-going end_dates
          if(e.end_date !== 0 || e.end_date !== e.start_date){
            if(moment(e.end_date).isAfter(moment().format('YYYY-MM-DD'))){
              e.start_date = moment().format('YYYY-MM-DD'); // Set the start_date for today
              mapDatesToObj(e);
            }
          }
        }
      });

      let events_OrderedByDate_Obj = {}
      Object.keys(events_GroupedByDate_Obj).sort().forEach(function(key) {
        events_OrderedByDate_Obj[key] = events_GroupedByDate_Obj[key]
      });

      this.events = events_OrderedByDate_Obj

    });

  }
}
</script>

<style scoped>
</style>
