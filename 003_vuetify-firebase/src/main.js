import Vue from 'vue';
import * as firebase from 'firebase';
import App from './App';
import '../node_modules/vuetify/src/stylus/app.styl';
import './main.css';
import router from './router';
import { store } from './store';
import {
  Vuetify,
  VApp,
  VNavigationDrawer,
  VFooter,
  VList,
  VBtn,
  VIcon,
  VGrid,
  VToolbar,
  VCarousel,
  VCard,
  VTextField,
  VDatePicker,
  VTimePicker,
  VAlert,
  VProgressCircular,
  VDialog,
  VDivider,
  transitions
} from 'vuetify';

// Helpers
import colors from 'vuetify/es5/util/colors';
import DateFilter from './filters/date';
import AlertComponent from './components/Shared/Alert';
import EditMeetupDetailsDialog from './components/Meetup/Edit/EditMeetupDetailsDialog';

Vue.use(Vuetify, {
  components: {
    VApp,
    VNavigationDrawer,
    VFooter,
    VList,
    VBtn,
    VIcon,
    VGrid,
    VToolbar,
    VCarousel,
    VCard,
    VTextField,
    VDatePicker,
    VTimePicker,
    VAlert,
    VProgressCircular,
    VDialog,
    VDivider,
    transitions
  },
  theme: {
    primary: colors.red.darken1, // #E53935
    secondary: colors.red.lighten4, // #FFCDD2
    accent: colors.indigo.base // #3F51B5
  }
});

Vue.filter('date', DateFilter);

// register alert component

Vue.component('app-alert', AlertComponent);
Vue.component('app-edit-meetup-details-dialog', EditMeetupDetailsDialog);

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  created() {
    firebase.initializeApp({
      apiKey: process.env.VUE_APP_FIREBASE_API_KEY,
      authDomain: process.env.VUE_APP_FIREBASE_AUTH_DOMAIN,
      databaseURL: process.env.VUE_APP_FIREBASE_DB_URL,
      projectId: process.env.VUE_APP_FIREBASE_PROJECT_ID,
      storageBucket: process.env.VUE_APP_FIREBASE_STORAGE_BUCKET
    });
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.$store.dispatch('autoSignIn', user);
      }
    });
    this.$store.dispatch('loadMeetups');
  },
  render: h => h(App)
});
