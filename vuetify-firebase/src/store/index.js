import Vue from 'vue';
import Vuex from 'vuex';
import * as firebase from 'firebase';
// import Chance from 'chance';

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    loadedMeetups: null,
    user: null,
    loading: false,
    authError: null
  },
  mutations: {
    setLoadedMeetups(state, payload) {
      state.loadedMeetups = payload;
    },
    createMeetup(state, payload) {
      state.loadedMeetups.push(payload);
    },
    setUser(state, payload) {
      state.user = payload;
    },
    setLoading(state, payload) {
      state.loading = payload;
    },
    setError(state, payload) {
      state.authError = payload;
    },
    clearError(state) {
      state.authError = null;
    }
  },
  actions: {
    autoSignIn({ commit }, payload) {
      commit('setUser', { id: payload.uid, registeredMeetups: [] });
    },
    logout({ commit }) {
      firebase.auth().signOut();
      commit('setUser', null);
    },
    loadMeetups({ commit }) {
      commit('setLoading', true);
      firebase
        .database()
        .ref('meetups')
        .once('value')
        .then(data => {
          const meetups = [];
          const obj = data.val();
          for (let key in obj) {
            meetups.push({
              id: key,
              title: obj[key].title,
              description: obj[key].description,
              imageUrl: obj[key].imageUrl,
              date: obj[key].date,
              creatorId: obj[key].creatorId
            });
          }
          commit('setLoading', false);
          commit('setLoadedMeetups', meetups);
        })
        .catch(error => {
          console.log(error);
          commit('setLoading', false);
        });
    },
    createMeetup(
      { commit, getters },
      { title, location, imageUrl, description, date }
    ) {
      // const chance = new Chance();

      const meetup = {
        title,
        location,
        imageUrl,
        description,
        date,
        creatorId: getters.user.id
        // id: chance.guid()
      };
      // Reach out to firebase and store it
      firebase
        .database()
        .ref('meetups')
        .push(meetup)
        .then(data => {
          console.log(data);
          commit('createMeetup', { ...meetup, id: data.key });
        })
        .catch(error => {
          console.log(error);
        });
    },
    signUserUp({ commit }, payload) {
      commit('setLoading', true);
      commit('clearError');
      firebase
        .auth()
        .createUserWithEmailAndPassword(payload.email, payload.password)
        .then(({ user }) => {
          commit('setLoading', false);
          const newUser = {
            id: user.uid,
            registeredMeetups: []
          };
          commit('setLoading', false);
          commit('setUser', newUser);
        })
        .catch(error => {
          commit('setLoading', false);
          commit('setError', error);
        });
    },
    signUserIn({ commit }, payload) {
      commit('setLoading', true);
      commit('clearError');
      firebase
        .auth()
        .signInWithEmailAndPassword(payload.email, payload.password)
        .then(({ user }) => {
          const newUser = {
            id: user.uid,
            registeredMeetups: []
          };
          commit('setLoading', false);
          commit('setUser', newUser);
        })
        .catch(error => {
          commit('setLoading', false);
          commit('setError', error);
        });
    },
    clearError({ commit }) {
      commit('clearError');
    }
  },
  getters: {
    loadedMeetups(state) {
      return state.loadedMeetups.sort((a, b) => {
        return a.date > b.date;
      });
    },
    loadedMeetup(state) {
      return meetupId => {
        return state.loadedMeetups.find(meetup => meetup.id === meetupId);
      };
    },
    featuredMeetups(state, getters) {
      return getters.loadedMeetups.slice(0, 5);
    },
    user(state) {
      return state.user;
    },
    loading(state) {
      return state.loading;
    },
    error(state) {
      return state.authError;
    }
  }
});
