import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
// import Prism from './assets/js/prism'
// import prismcss from './assets/css/prism.css'
// import hljs from 'highlight.js'
import axios from "axios";
import myButton from "./components/my-button/index.vue";
import message from "./components/my-messagetip/index";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
// import BootStrap from 'bootstrap'
// import 'jquery/src/jquery'
// import 'jquery-validation'
// import 'bootstrap/dist/js/bootstrap.min.js'
// import 'bootstrap/dist/css/bootstrap.min.css'
Vue.config.productionTip = false;
axios.interceptors.request.use(config => {
  const token = window.localStorage.getItem("token");
  config.headers["token"] = token;
  // config.timeout = 8000;
  return config;
});
Vue.prototype.http = axios;
Vue.prototype.message = message;

// Vue.use(Prism)
// Vue.use(prismcss)
Vue.use(myButton);
Vue.use(ElementUI);
// Vue.use(hljs.vuePlugin)
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
