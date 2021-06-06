import Vue from 'vue'
import App from './App.vue'
import "@/assets/styles/main.css";
import store from './store'
import router from './router'
import VueFormulate from '@braid/vue-formulate'

Vue.config.productionTip = false
Vue.use(VueFormulate);

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')
