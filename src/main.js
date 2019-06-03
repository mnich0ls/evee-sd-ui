import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import VueAnalytics from 'vue-analytics'
import Vuex from 'vuex'

Vue.use(VueAnalytics, {
  id: 'UA-126242187-3'
})

Vue.use(Vuex)
let store = new Vuex.Store({
  state: {
    search: null,
    price: 'either',
    date: null,
    categories: [],
    locations: []
  },
  mutations: { 
    setSearch(state, search) {
      state.search = search
    },
    setPrice(state, price) {
      state.price = price
    },
    setDate(state, date) {
      state.date = date
    },
    setCategories(state, categories) {
      state.categories = categories
    },
    setLocations(state, locations) {
      state.locations = locations
    }
  }
})

// Load UI icon pack extras
import '@fortawesome/fontawesome-free/css/all.min.css'

// Load XHR client tools
import axios from 'axios'
window.axios = axios

import moment from 'moment'

Vue.mixin({
  filters:{
    formatDateHeading(eventsHeadingDate){
      return moment(eventsHeadingDate.split('T')[0]).format('dddd, MMMM D, YYYY')
    },
    formatEventCardDate(eventCardDate){
      return moment(eventCardDate.split('T')[0]).format('ddd, MMMM D')
    }
  }
});

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  store
}).$mount('#app')