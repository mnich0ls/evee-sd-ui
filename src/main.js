import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'

// Load UI icon pack extras
import '@fortawesome/fontawesome-free/css/all.min.css'

// Load XHR client tools
import axios from 'axios'
window.axios = axios


import moment from 'moment'

Vue.mixin({
  filters:{
    formatDateHeading(eventsHeadingDate){
      return moment(eventsHeadingDate).format('MMMM D, YYYY')
    }
  }
});

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
