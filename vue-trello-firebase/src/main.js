import Vue from "vue";
import Vuetify from "vuetify"; // 1. vuetify js
import "vuetify/dist/vuetify.min.css"; // 2. vuetify css
import App from "./App.vue";
import router from "./router";
import store from "./store";

Vue.config.productionTip = false;
Vue.use(Vuetify); // 3. use vuetify

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
