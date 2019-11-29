import Vue from 'vue'
import App from './App.vue'
import FastClick from 'fastclick'
import VueScroller from 'vue-scroller'
import router from './router/'
import Vant from 'vant'
import {Toast} from 'vant'
import './assets/style/reset.css'
import './assets/style/common.scss'
import 'vant/lib/index.css';
import '@vant/touch-emulator' // 在桌面端touch适配
import './rem'
import Vuex from 'vuex'

FastClick.attach(document.body)

Vue.config.productionTip = false
Vue.prototype.$toast = Toast
Vue.use(VueScroller)
Vue.use(Vant)
Vue.use(Vuex)
new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
