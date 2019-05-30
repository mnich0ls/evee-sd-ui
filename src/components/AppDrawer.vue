<template>
    <v-navigation-drawer
      v-model="showDrawer"
      fixed
      temporary
      :width="340">
      <v-container>
        <v-layout row wrap>
          <v-flex xs12>
            <v-text-field
              label="Search">
            </v-text-field>
          </v-flex>
        </v-layout>
        <v-layout row wrap>
            <v-switch
              v-model="free"
              :label="'Free'">
            </v-switch>
            <br>  
            <v-switch
            v-model="paid"
            :label="'Paid'">
            </v-switch>
          </v-layout>
          <v-layout row wrap>
            <v-date-picker
              v-model="date">
            </v-date-picker>
          </v-layout>
          <v-layout row wrap>
            <v-flex xs12>
              <v-combobox
              :items="categories"
              label="Filter by category"
              :multiple="true"
              :clearable="true">
              </v-combobox>
            </v-flex>
          </v-layout><v-layout row wrap>
            <v-flex xs12>
              <v-combobox
              :items="locations"
              label="Filter by location"
              :multiple="true"
              :clearable="true">
              </v-combobox>
            </v-flex>
          </v-layout>
          <v-layout row wrap> 
              <v-btn block class="mt-3" color="primary" @click="toggleDrawer">Find Events</v-btn>
          </v-layout>
      </v-container>
    </v-navigation-drawer>
</template>

<script>
import moment from 'moment'
import EventBus from '../plugins/event-bus.js'

    export default {
        name: 'AppDrawer',
        data: () => ({
            showDrawer: false,
            free: true,
            paid: true,
            date: moment().format('YYYY-MM-DD'),
            categories: [
                'Music',
                'Meetup',
                'Beer',
                'Wine',
                'Food',
                'Boat',
                'Family',
                'Learning',
                'Community',
                'Science',
                'Trivia',
                'Volunteer'
            ],
            locations: [
                'Downtown',
                'Point Loma',
                'East Villiage',
                'Balboa Park',
                'Hillcrest',
                'North Park',
                'Nomral Heights',
                'North County - Inland',
                'North County - Coastal',
                'South County - Inland',
                'South County - Inland',
                'East County'
            ]
        }),
        created() {
            EventBus.$on('toggleDrawer', this.toggleDrawer);
        },
        methods: {
            toggleDrawer() {
                this.showDrawer = !this.showDrawer;
            }
        }
    }
</script>