import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import lng_lat from './filters/lng_lat'

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import 'element-ui/lib/theme-chalk/display.css';
import animated from 'animate.css'
// import "leaflet/dist/leaflet.css"
import L from "leaflet";
import axios from 'axios'
import VueAxios from 'vue-axios'

Vue.config.productionTip = false

Vue.use(ElementUI);
Vue.use(animated);
Vue.use(L);
Vue.use(VueAxios, axios)

Vue.filter('lng_lat', lng_lat);
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
