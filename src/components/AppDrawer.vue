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
                clearable
                append-icon="search"
                label="Search"
                @keyup.enter="toggleDrawer"
                autofocus>
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
              <v-btn block class="mt-3" color="primary" @click="toggleDrawer">Find Events</v-btn>
          </v-layout>
          <v-layout mt-3 row wrap>
            <v-flex xs12 class="text-xs-center">
                <a href="mailto:mike@evee-sd.com?subject=Feedback">Have feedback?</a>
            </v-flex>
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
                    title: 'Activities',
                    selected: false
                },
                {
                    title: 'Adventure',
                    selected: false
                },
                {
                    title: 'Art',
                    selected: false
                },
                {
                    title: 'Attractions',
                    selected: false
                },
                {
                    title: 'Business',
                    selected: false
                },
                {
                    title: 'Community',
                    selected: false
                },
                {
                    title: 'Drinks',
                    selected: false
                },
                {
                    title: 'Festivals',
                    selected: false
                },
                {
                    title: 'Fitness',
                    selected: false
                },
                {
                    title: 'Food',
                    selected: false
                },
                {
                    title: 'Health',
                    selected: false
                },
                {
                    title: 'Hobbies',
                    selected: false
                },
                {
                    title: 'Learning',
                    selected: false
                },
                {
                    title: 'Lifestyle',
                    selected: false
                },
                {
                    title: 'Music',
                    selected: false
                },
                {
                    title: 'Nightclubs',
                    selected: false
                },
                {
                    title: 'Skill Development',
                    selected: false
                },
                {
                    title: 'Socializing',
                    selected: false
                },
                {
                    title: 'Sports',
                    selected: false
                },
                {
                    title: 'Tech',
                    selected: false
                },
                {
                    title: 'Theater',
                    selected: false
                }
            ],
            selectedCategories: {},
            locations: [
                {
                    title: 'Balboa Park',
                    selected: false
                },
                {
                    title: 'Cardiff',
                    selected: false
                },
                {
                    title: 'Carlsbad',
                    selected: false
                },
                {
                    title: 'Chula Vista',
                    selected: false
                },
                {
                    title: 'Citywide',
                    selected: false
                },
                {
                    title: 'Coronado',
                    selected: false
                },
                {
                    title: 'Del Mar',
                    selected: false
                },
                {
                    title: 'Downtown',
                    selected: false
                },
                {
                    title: 'East County',
                    selected: false
                },
                {
                    title: 'El Cajon',
                    selected: false
                },
                {
                    title: 'Encinitas',
                    selected: false
                },
                {
                    title: 'Gaslamp Quarter',
                    selected: false
                },
                {
                    title: 'Hillcrest',
                    selected: false
                },
                {
                    title: 'Imperial Beach',
                    selected: false
                },
                {
                    title: 'La Jolla',
                    selected: false
                },
                {
                    title: 'La Mesa',
                    selected: false
                },
                {
                    title: 'Lemon Grove',
                    selected: false
                },
                {
                    title: 'Little Italy',
                    selected: false
                },
                {
                    title: 'Mira Mesa',
                    selected: false
                },
                {
                    title: 'Miramar',
                    selected: false
                },
                {
                    title: 'Mission Bay',
                    selected: false
                },
                {
                    title: 'Mission Valley',
                    selected: false
                },
                {
                    title: 'National City',
                    selected: false
                },
                {
                    title: 'North Coastal',
                    selected: false
                },
                {
                    title: 'North Inland',
                    selected: false
                },
                {
                    title: 'North Park',
                    selected: false
                },
                {
                    title: 'Oceanside',
                    selected: false
                },
                {
                    title: 'Pacific Beach',
                    selected: false
                },
                {
                    title: 'Point Loma',
                    selected: false
                },
                {
                    title: 'Poway',
                    selected: false
                },
                {
                    title: 'Rancho Santa Fe',
                    selected: false
                },
                {
                    title: 'Santee',
                    selected: false
                },
                {
                    title: 'Solana Beach',
                    selected: false
                },
                {
                    title: 'South Park',
                    selected: false
                },
                {
                    title: 'South Bay',
                    selected: false
                },
                {
                    title: 'Spring Valley',
                    selected: false
                },
                {
                    title: 'Tijuana',
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
                this.showDrawer = !this.showDrawer
            },
            findEvents() {
                this.$store.commit('setSearch', this.search)
                this.$store.commit('setPrice', this.price)
                // console.log('date:', this.date)
                this.$store.commit('setDate', this.date)
                // console.log('search:', this.search)
                // console.log('price:', this.price)
                // console.log('date:', this.date)
                let categories = [];
                this.categories.forEach((c)=>{
                    if (c.selected) {
                        categories.push(c.title)
                    }
                })
                this.$store.commit('setCategories', categories)
                // console.log('categories:', categories.join(', '));
                let locations = [];
                this.locations.forEach((l) => {
                    if (l.selected) {
                        locations.push(l.title)
                    }
                })
                this.$store.commit('setLocations', locations)
                // console.log('locations:', locations.join(', '));
                EventBus.$emit('filter')
                if (this.search) {
                    this.$ga.event('Events', 'Filter', 'Search', this.search)
                }
                if (this.price) {
                    this.$ga.event('Events', 'Filter', 'Price', this.price)
                }
                if (this.date) {
                    this.$ga.event('Events', 'Filter', 'Date', this.date)
                }
                if (categories.length) {
                    this.$ga.event('Events', 'Filter', 'Categories', categories.join(', '))
                }
                if (locations.length) {
                    this.$ga.event('Events', 'Filter', 'Locations', locations.join(', '))
                }
            }
        },
        watch : {
            showDrawer: function (val) {
                // if drawer is closing - trigger filter 
                // todo: ideally this is only triggered if filters were updated
                if (!val) {
                    this.findEvents();
                }
            }
        }
    }
</script>
<style>
.v-list__group__items--no-action .v-list__tile {
    padding: 0 16px !important /* remove extra padding for sub menus so that more of the text is visable */
}
</style>