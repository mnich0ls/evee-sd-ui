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
            v-model="search"
              label="Search">
            </v-text-field>
          </v-flex>
        </v-layout>
        <v-layout row wrap mb-3>
            <v-flex xs12>
                <v-btn-toggle v-model="price">
                    <v-btn value="either" flat>
                        Either
                    </v-btn>
                    <v-btn value="free" flat>
                        Free
                    </v-btn>
                    <v-btn value="paid" flat>
                        Paid
                    </v-btn>
                </v-btn-toggle>
            </v-flex>
          </v-layout>
          <v-layout mb-3 row wrap>
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
                          <v-list-tile-content>
                              <v-list-tile-title>Categories</v-list-tile-title>
                          </v-list-tile-content>
                      </v-list-tile>
                  </template>
                  <v-list-tile v-for="category in categories" :key="category.title" class="no-padding-menu-group">
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
                <v-list-group no-action>
                  <template v-slot:activator>
                      <v-list-tile>
                          <v-list-tile-content>
                              <v-list-tile-title>Locations</v-list-tile-title>
                          </v-list-tile-content>
                      </v-list-tile>
                  </template>
                  <v-list-tile v-for="location in locations" :key="location.title">
                      <v-list-tile-action>
                            <v-checkbox v-model="location.selected"></v-checkbox>
                        </v-list-tile-action>
                      <v-list-tile-content @click.prevent="location.selected = !location.selected">
                          <v-list-tile-title>{{ location.title }}</v-list-tile-title>
                      </v-list-tile-content>
                      <v-list-tile-action>
                          <v-icon>expand-more</v-icon>
                      </v-list-tile-action>
                  </v-list-tile>
                </v-list-group>
              </v-list>
            </v-flex>
          </v-layout>
          <v-layout row wrap> 
              <v-btn block class="mt-3" color="primary" @click="findEvents">Find Events</v-btn>
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
            search: null,
            price: 'either',
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
                {
                    title: 'Volunteering',
                    selected: false
                }
            ],
            selectedCategories: {},
            locations: [
                {
                    title: 'Downtown',
                    selected: false
                },
                {
                    title: 'Point Loma',
                    selected: false
                },
                {
                    title: 'East Villiage',
                    selected: false
                },
                {
                    title: 'Balboa Park',
                    selected: false
                },
                {
                    title: 'Hillcrest',
                    selected: false
                },
                {
                    title: 'Nort Park',
                    selected: false
                },
                {
                    title: 'Normal Heights',
                    selected: false
                },
                {
                    title: 'North - Coastal',
                    selected: false
                },
                {
                    title: 'North - Inland',
                    selected: false
                },
                {
                    title: 'South - Coastal',
                    selected: false
                },
                {
                    title: 'South - Inland',
                    selected: false
                },
                {
                    title: 'East County',
                    selected: false
                }
            ],
            selectedLocations: {}
        }),
        created() {
            EventBus.$on('toggleDrawer', this.toggleDrawer);
        },
        methods: {
            toggleDrawer() {
                this.showDrawer = !this.showDrawer;
            },
            findEvents() {
                // console.log('search:', this.search)
                // console.log('price:', this.price)
                // console.log('date:', this.date)
                let categories = [];
                this.categories.forEach((c)=>{
                    if (c.selected) {
                        categories.push(c.title)
                    }
                })
                // console.log('categories:', categories.join(', '));
                let locations = [];
                this.locations.forEach((l) => {
                    if (l.selected) {
                        locations.push(l.title)
                    }
                })
                // console.log('locations:', locations.join(', '));
                this.toggleDrawer()
            }
        }
    }
</script>
<style>
.v-list__group__items--no-action .v-list__tile {
    padding: 0 16px !important /* remove extra padding for sub menus so that more of the text is visable */
}
</style>