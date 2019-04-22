import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '@/styles/icons/iconfont.css'
import './plugins/element.js'
import '@/styles/normalize.css'
//import '@/permission'
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
