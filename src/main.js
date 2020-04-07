import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import Vuesax from 'vuesax'
import 'vuesax/dist/vuesax.css' // Vuesax
Vue.use(Vuesax)

import "./firebase"
import "./agora"

import VueWebsocket from "vue-websocket";
import { API_URL } from "./config";
Vue.use(VueWebsocket, API_URL, { reconnection: true });
// import io from 'socket.io-client'
// const socket = io(API_URL)
// Vue.prototype.$socket = socket

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
