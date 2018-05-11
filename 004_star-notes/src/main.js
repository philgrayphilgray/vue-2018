import 'vuetify/dist/vuetify.min.css';
import Vue from 'vue';
import Vuetify from 'vuetify';
import draggable from 'vuedraggable';
import App from './App';
import store from './store';
import router from './router';
import Board from './components/Board';
import '../node_modules/@icon/font-awesome/font-awesome.css';

Vue.use(Vuetify);

Vue.component('app-board', Board);
Vue.component('app-draggable', draggable);

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  created() {
    this.$store.dispatch('loadDemo');
  },
  render: h => h(App),
});
