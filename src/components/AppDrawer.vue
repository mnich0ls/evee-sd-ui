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
                }
/*La Jolla
La Mesa
Lemon Grove
Little Italy
Mira Mesa
Miramar
Mission Bay
Mission Valley
National City
North Coastal
North Inland
North Park
Oceanside
Pacific Beach
Point Loma
Poway
Rancho Santa Fe
San Diego
Santee
Solana Beach 
South Park
South Bay
Spring Valley
Tijuana */
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
                this.$store.commit('setCategories', categories)
                // console.log('categories:', categories.join(', '));
                let locations = [];
                this.locations.forEach((l) => {
                    if (l.selected) {
                        locations.push(l.title)
                    }
                })
                // console.log('locations:', locations.join(', '));
                this.$store.commit('setSearch', this.search)
                EventBus.$emit('filter')
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