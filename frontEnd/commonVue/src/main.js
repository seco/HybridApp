
import Vue from 'vue'
import App from './App'
import router from './router'
import './css/reset.scss'
import store from './store/index'
import 'config_axios'
 

Vue.config.productionTip = false
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
