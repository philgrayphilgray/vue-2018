import * as firebase from 'firebase';
// import Chance from 'chance';

export default {
  state: {
    user: null
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

    setUser(state, payload) {
      state.user = payload;
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
    user(state) {
      return state.user;
    }
  }
};
