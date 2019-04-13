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
  components: {
    EventCard
  },
  filters:{
    formatDateHeading(eventsHeadingDate){
      return moment(eventsHeadingDate).format('MMMM D, YYYY')
    }
  },
  beforeCreate(){
    var axios = window.axios; // Stops ESlint warning - I defined on window via main.js
    axios.get('https://evee-sd.firebaseio.com/scraped_events.json', {
      params:{
        auth: "TMe7oNMbWHLHcN45t2uYcpltEQCAeHCrKeh8V7Xn"
      }
    }).then(events=>{
      let events_GroupedByDate_Obj = {}
      
      let mapDatesToObj = (e)=>{
        if(!events_GroupedByDate_Obj.hasOwnProperty(e.start_date)){
          events_GroupedByDate_Obj[e.start_date] = []
        }
        events_GroupedByDate_Obj[e.start_date].push(e)
      }
      
      events.data.forEach(e=>{
        if(!moment(e.start_date).isBefore(moment().format('YYYY-MM-DD'))){ // Don't show any start_dates that already have passed
          mapDatesToObj(e);
        }
        else {
          // Check if the events with start_dates that have already passed have active / on-going end_dates
          if(e.end_date !== 0){
            if(e.end_date === 'ongoing' || moment(e.end_date).isAfter(moment().format('YYYY-MM-DD'))){
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
    })

  },
  data: () => ({
    events: {},
  })
}
</script>

<style scoped>
</style>
