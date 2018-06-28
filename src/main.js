import Vue from 'vue'
import Vuex from 'vuex'
import App from './App'
import router from './router'
import store from '@/vuex/store'
import Notifications from 'vue-notification'
import velocity from 'velocity-animate'

// CSS dependencies
import '@/assets/css/Roboto-font.css'
import '@/assets/icons/fuse-icon-font/style.css'
import 'animate.css/animate.min.css'
import 'perfect-scrollbar/css/perfect-scrollbar.css'
import '@/assets/vendor/fuse-html/fuse-html.min.css'
import '@/assets/css/main.css'

// JS dependencies
import '@/assets/vendor/jquery/dist/jquery.min.js'
import 'bootstrap/dist/js/bootstrap.min.js'
import '@/assets/vendor/fuse-html/fuse-html.min.js'

Vue.config.productionTip = false

Vue.use(Vuex)
Vue.use(Notifications, { velocity })

/* eslint-disable no-new */
new Vue({
  el: '#wrapper',
  router,
  components: { App },
  template: '<App/>',
  store
})
