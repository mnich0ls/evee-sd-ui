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
              <v-list>
                  <v-list-group no-action>
                  <template v-slot:activator>
                      <v-list-tile>
                          <v-list-content>
                              <v-list-tile-title>Categories</v-list-tile-title>
                          </v-list-content>
                      </v-list-tile>
                  </template>
                  <v-list-tile v-for="category in categories" :key="category">
                      <v-list-tile-action>
                            <v-checkbox v-model="category.selected"></v-checkbox>
                        </v-list-tile-action>
                      <v-list-tile-content @click.prevent="category.selected = !category.selected">
                          <v-list-tile-title>{{ category.title }}</v-list-tile-title>
                      </v-list-tile-content>
                      <v-list-tile-action>
                          <v-icon>expand-more</v-icon>
                      </v-list-tile-action>
                  </v-list-tile>
                </v-list-group>
                <!-- <v-list-group no-action>
                  <template v-slot:activator>
                      <v-list-tile>
                          <v-list-content>
                              <v-list-tile-title>Locations</v-list-tile-title>
                          </v-list-content>
                      </v-list-tile>
                  </template>
                  <v-list-tile v-for="location in locations" :key="location">
                      <v-list-tile-content>
                          <v-list-tile-title>{{ location }}</v-list-tile-title>
                      </v-list-tile-content>
                      <v-list-tile-action>
                          <v-icon>expand-more</v-icon>
                      </v-list-tile-action>
                  </v-list-tile>
                </v-list-group> -->
              </v-list>
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
                {
                    title: 'Music',
                    selected: false
                },
                {
                    title: 'Meetup',
                    selected: false
                },
                {
                    title: 'Food',
                    selected: false
                },
                {
                    title: 'Drinks',
                    selected: false
                },
                {
                    title: 'Science',
                    selected: false
                },
                {
                    title: 'Tech',
                    selected: false
                },
                // 'Meetup',
                // 'Beer',
                // 'Wine',
                // 'Food',
                // 'Boat',
                // 'Family',
                // 'Learning',
                // 'Community',
                // 'Science',
                // 'Trivia',
                // 'Volunteer'
            ],
            selectedCategories: {},
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
            ],
            selectedLocations: {}
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