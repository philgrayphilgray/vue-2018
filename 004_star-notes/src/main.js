import 'vuetify/dist/vuetify.min.css';
import Vue from 'vue';
import Vuetify from 'vuetify';
import * as firebase from 'firebase';
import App from './App';
import store from './store';
import router from './router';
import Board from './components/Board';
import '../node_modules/@icon/font-awesome/font-awesome.css';

Vue.use(Vuetify);

Vue.component('app-board', Board);

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  created() {
    this.$store.dispatch('loadDemo');
    firebase.initializeApp({
      apiKey: process.env.VUE_APP_FIREBASE_API_KEY,
      authDomain: process.env.VUE_APP_FIREBASE_AUTH_DOMAIN,
      databaseURL: process.env.VUE_APP_FIREBASE_DB_URL,
      projectId: process.env.VUE_APP_FIREBASE_PROJECT_ID,
      storageBucket: process.env.VUE_APP_FIREBASE_STORAGE_BUCKET,
    });
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.$store.dispatch('autoSignIn', user);
      }
    });
  },
  render: h => h(App),
});
