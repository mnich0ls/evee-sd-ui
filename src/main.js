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
    search: null
  },
  mutations: { 
    setSearch(state, search) {
      state.search = search
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
      return moment(eventsHeadingDate.split('T')[0]).format('MMMM D, YYYY')
    }
  }
});

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  store
}).$mount('#app')
