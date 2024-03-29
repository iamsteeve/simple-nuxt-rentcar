import Vue from 'vue'
import '@/plugins/vuetify';
import '@/plugins/vee-validate';
import App from './App.vue'
import router from './router'
import store from './store/store'
import './registerServiceWorker'
import 'material-design-icons-iconfont/dist/material-design-icons.css';


Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
