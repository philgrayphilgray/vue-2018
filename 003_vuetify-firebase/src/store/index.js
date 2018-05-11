import Vue from 'vue';
import Vuex from 'vuex';
import * as firebase from 'firebase';
// import Chance from 'chance';

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    loadedMeetups: [],
    user: null,
    loading: false,
    authError: null
  },
  mutations: {
    registerUserForMeetup(state, payload) {
      const id = payload.id;
      if (
        state.user.registeredMeetups.findIndex(meetup => meetup.id === id) >= 0
      ) {
        return;
      }
      state.user.registeredMeetups.push(id);
      state.user.fbKeys[id] = payload.fbKey;
    },
    unregisterUserFromMeetup(state, payload) {
      const registeredMeetups = state.user.registeredMeetups;
      registeredMeetups.splice(
        registeredMeetups.findIndex(meetup => meetup.id === payload),
        1
      );
      Reflect.deleteProperty(state.user.fbKeys, payload);
    },
    setLoadedMeetups(state, payload) {
      state.loadedMeetups = payload;
    },
    createMeetup(state, payload) {
      state.loadedMeetups.push(payload);
    },
    updateMeetupData(state, payload) {
      const meetup = state.loadedMeetups.find(meetup => {
        return meetup.id === payload.id;
      });
      if (payload.title) {
        meetup.title = payload.title;
      }
      if (payload.description) {
        meetup.description = payload.description;
      }
      if (payload.location) {
        meetup.location = payload.location;
      }
      if (payload.date) {
        meetup.date = payload.date;
      }
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
      commit('setUser', { id: payload.uid, registeredMeetups: [], fbKeys: {} });
    },
    fetchUserData({ commit, getters }) {
      commit('setLoading', true);
      firebase
        .database()
        .ref('/users/' + getters.user.id + '/registration/')
        .once('value')
        .then(data => {
          const pairs = data.val();
          let registeredMeetups = [];
          let swappedPairs = {};
          for (let key in pairs) {
            registeredMeetups.push(pairs[key]);
            swappedPairs[pairs[key]] = key;
          }
          const updatedUser = {
            id: getters.user.id,
            registeredMeetups: registeredMeetups,
            fbKeys: swappedPairs
          };
          commit('setLoading', false);
          commit('setUser', updatedUser);
        })
        .catch(error => {
          commit('setLoading', false);
          console.log(error);
        });
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
              location: obj[key].location,
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
      { title, location, image, description, date }
    ) {
      // const chance = new Chance();

      const meetup = {
        title,
        location,
        description,
        date,
        creatorId: getters.user.id
      };
      let imageUrl;
      let key;
      firebase
        .database()
        .ref('meetups')
        .push(meetup)
        .then(data => {
          key = data.key;
          return key;
        })
        .then(key => {
          const filename = image.name;
          const ext = filename.slice(filename.lastIndexOf('.'));
          return firebase
            .storage()
            .ref('meetups/' + key + '.' + ext)
            .put(image);
        })
        .then(fileData => {
          // need to user getDownloadURL, update from the tutorial
          return fileData.ref.getDownloadURL();
        })
        .then(downloadUrl => {
          imageUrl = downloadUrl;
          return firebase
            .database()
            .ref('meetups')
            .child(key)
            .update({ imageUrl: imageUrl });
        })
        .then(() => {
          commit('createMeetup', {
            ...meetup,
            imageUrl: imageUrl,
            id: key
          });
        })
        .catch(error => {
          console.log(error);
        });
    },
    updateMeetupData({ commit }, payload) {
      commit('setLoading', true);
      const updateObj = {};
      if (payload.title) {
        updateObj.title = payload.title;
      }
      if (payload.description) {
        updateObj.description = payload.description;
      }
      if (payload.date) {
        updateObj.date = payload.date;
      }
      firebase
        .database()
        .ref('meetups')
        .child(payload.id)
        .update(updateObj)
        .then(() => {
          commit('setLoading', false);
          commit('updateMeetupData', payload);
        })
        .catch(error => {
          console.log(error);
          commit('setLoading', false);
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
            registeredMeetups: [],
            fbKeys: {}
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
        // need to destructure user, update from the tutorial
        .then(({ user }) => {
          const newUser = {
            id: user.uid,
            registeredMeetups: [],
            fbKeys: {}
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
    },
    registerUserForMeetup({ commit, getters }, payload) {
      commit('setLoading', true);
      const user = getters.user;
      firebase
        .database()
        .ref('/users/' + user.id)
        .child('/registration/')
        .push(payload)
        .then(data => {
          commit('setLoading', false);
          commit('registerUserForMeetup', { id: payload, fbKey: data.key });
        })
        .catch(error => {
          console.log(error);
          commit('setLoading', false);
        });
    },
    unregisterUserFromMeetup({ commit, getters }, payload) {
      commit('setLoading', true);
      const user = getters.user;
      if (!user.fbKeys) {
        console.log('not user.fbKeys');
        return;
      }
      console.log(payload);

      const fbKey = user.fbKeys[payload];
      console.log(fbKey);
      firebase
        .database()
        .ref('/users/' + user.id + '/registration/')
        .child(fbKey)
        .remove()
        .then(() => {
          commit('setLoading', false);
          commit('unregisterUserFromMeetup', payload);
        })
        .catch(error => {
          console.log('error from firebase:' + error);
          commit('setLoading', false);
        });
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
