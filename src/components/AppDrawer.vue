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
                label="Search by event name"
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
          <v-layout row wrap mb-3>
               <v-autocomplete
                    v-model="selectedCategories"
                    :items="categories"
                    item-text="title"
                    :multiple="true"
                    cache-items
                    xs12
                    flat
                    hide-no-data
                    hide-details
                    clearable
                    label="Categories"
                ></v-autocomplete>
            </v-layout>
            <v-layout row wrap mb-3>
                <v-autocomplete
                    v-model="selectedLocations"
                    :items="locations"
                    :multiple="true"
                    item-text="title"
                    cache-items
                    xs12
                    flat
                    hide-no-data
                    hide-details
                    clearable
                    label="Location"
                ></v-autocomplete>
            </v-layout>
            <!-- <v-flex xs12>
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
            </v-flex> -->
          <v-layout mb-3 row wrap>
            <v-date-picker
              v-model="date">
            </v-date-picker>
          </v-layout>
          <!-- <v-layout row wrap> 
              <v-btn block class="mt-3" color="primary" @click="toggleDrawer">Find Events</v-btn>
          </v-layout> -->
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
import _ from 'lodash'

    export default {
        name: 'AppDrawer',
        data: () => ({
            showDrawer: false,
            search: null,
            price: 'either',
            date: moment().format('YYYY-MM-DD'),
            categories: [ { title: 'Activities', selected: false },
                { title: 'Animals', selected: false },
                { title: 'Art', selected: false },
                { title: 'Associations & Organizations', selected: false },
                { title: 'Attractions', selected: false },
                { title: 'Bars', selected: false },
                { title: 'Beer', selected: false },
                { title: 'Biking', selected: false },
                { title: 'Boating & Sailing', selected: false },
                { title: 'Book Clubs', selected: false },
                { title: 'Book Signings', selected: false },
                { title: 'Business', selected: false },
                { title: 'Cars & Motorcycles', selected: false },
                { title: 'Charity & Causes', selected: false },
                { title: 'Classes & Workshops', selected: false },
                { title: 'Comedy', selected: false },
                { title: 'Community', selected: false },
                { title: 'Dancing', selected: false },
                { title: 'Discussion Groups', selected: false },
                { title: 'Education & Learning', selected: false },
                { title: 'Farmers\' Markets', selected: false },
                { title: 'Fashion', selected: false },
                { title: 'Festivals', selected: false },
                { title: 'Film', selected: false },
                { title: 'Fishing', selected: false },
                { title: 'Fitness', selected: false },
                { title: 'Food & Drink', selected: false },
                { title: 'For Kids', selected: false },
                { title: 'Fundraisers', selected: false },
                { title: 'Funk', selected: false },
                { title: 'Galleries & Museums', selected: false },
                { title: 'Games', selected: false },
                { title: 'Golf', selected: false },
                { title: 'Government', selected: false },
                { title: 'Health', selected: false },
                { title: 'History & Heritage', selected: false },
                { title: 'Hobbies', selected: false },
                { title: 'Holidays', selected: false },
                { title: 'Home & Lifestyle', selected: false },
                { title: 'Hotels & Resorts', selected: false },
                { title: 'Language & Ethnic Identity', selected: false },
                { title: 'Lectures', selected: false },
                { title: 'Lifestyle', selected: false },
                { title: 'Movements & Politics', selected: false },
                { title: 'Music', selected: false },
                { title: 'Nature', selected: false },
                { title: 'Nightclubs', selected: false },
                { title: 'Outdoors & Adventure', selected: false },
                { title: 'Parents & Family', selected: false },
                { title: 'Parks & Gardens', selected: false },
                { title: 'Photography', selected: false },
                { title: 'Religion & Beliefs', selected: false },
                { title: 'Science & Tech', selected: false },
                { title: 'Spirituality', selected: false },
                { title: 'Sports', selected: false },
                { title: 'Support', selected: false },
                { title: 'Surfing', selected: false },
                { title: 'Team Building', selected: false },
                { title: 'Theater', selected: false },
                { title: 'Tours & Sightseeing', selected: false },
                { title: 'Travel Guides', selected: false },
                { title: 'Trivia & Games', selected: false },
                { title: 'Uncategorized', selected: false },
                { title: 'Wellness', selected: false },
                { title: 'Wine', selected: false },
                { title: 'Writing', selected: false } ],
            selectedCategories: null,
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
            selectedLocations: null
        }),
        created() {
            EventBus.$on('toggleDrawer', this.toggleDrawer);
        },
        watch : {
            showDrawer: function (val) {
                // if drawer is closing - trigger filter 
                // todo: ideally this is only triggered if filters were updated
                if (!val) {
                    // console.log('close menu')
                       this.$ga.event({
                        eventCategory: 'Filter Menu',
                        eventAction: 'Close Menu'
                    })
                } else {
                    // console.log('open menu')
                       this.$ga.event({
                        eventCategory: 'Filter Menu',
                        eventAction: 'Open Menu'
                    })
                }
            },
            search: _.debounce(function(val) {
                // console.log('searh term typed', val)
                this.$store.commit('setSearch', val)
                   this.$ga.event({
                        eventCategory: 'Filter Menu',
                        eventAction: 'Search Term Typed'
                    })
                    this.findEvents();
            }, 1000),
            price: function(val) {
                this.$store.commit('setPrice', val)
                // console.log('price updated', val)
                this.$ga.event({
                    eventCategory: 'Filter Menu',
                    eventAction: 'Price Selected: ' + val
                })
                this.findEvents();
            },
            date: function(val) {
                this.$store.commit('setDate', val)
                // console.log('date selected', val)
                this.$ga.event({
                    eventCategory: 'Filter Menu',
                    eventAction: 'Date Selected'
                })
                this.findEvents();
            },
            selectedCategories: function(val) {
                this.$store.commit('setCategories', val)
                // console.log('categories selected', val)
                this.$ga.event({
                    eventCategory: 'Filter Menu',
                    eventAction: 'Categories Selected',
                    eventValue: val.length
                })
                this.findEvents();
            },
            selectedLocations: function(val) {
                this.$store.commit('setLocations', val)
                // console.log('selected locations', val)
                   this.$ga.event({
                        eventCategory: 'Filter Menu',
                        eventAction: 'Locations Selected',
                        eventValue: val.length
                    })
                    this.findEvents();
            }
        },
        methods: {
            toggleDrawer() {
                this.showDrawer = !this.showDrawer
            },
            findEvents() {
                EventBus.$emit('filter')
            }
        }
    }
</script>
<style>
.v-list__group__items--no-action .v-list__tile {
    padding: 0 16px !important /* remove extra padding for sub menus so that more of the text is visable */
}
</style>