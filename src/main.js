import Vue from 'vue'
import App from './App.vue'
import router from './router/router'
import store from './store/main'

import './imports'

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
