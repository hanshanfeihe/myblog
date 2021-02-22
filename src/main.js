import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// import Prism from './assets/js/prism'
// import prismcss from './assets/css/prism.css'
// import hljs from 'highlight.js'
import axios from 'axios'
import myButton from './components/my-button/index.vue'
import message from './components/my-messagetip/index'
// import BootStrap from 'bootstrap'
// import 'jquery/src/jquery'
// import 'jquery-validation'
// import 'bootstrap/dist/js/bootstrap.min.js'
// import 'bootstrap/dist/css/bootstrap.min.css'
Vue.config.productionTip = false
Vue.prototype.http = axios
Vue.prototype.message = message

// Vue.use(Prism)
// Vue.use(prismcss)
Vue.use(myButton)
// Vue.use(hljs.vuePlugin)
new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#app')
