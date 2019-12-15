import Vue from 'vue'
import App from './App.vue'
import Axios from 'axios'

const axios = Axios.create({
  baseURL: 'https://cristarra-registration.000webhostapp.com/',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
  }
})

Vue.config.productionTip = false
Vue.prototype.$http = axios

new Vue({
  render: h => h(App),
}).$mount('#app')