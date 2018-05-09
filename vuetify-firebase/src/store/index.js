import Vue from 'vue';
import Vuex from 'vuex';
import * as firebase from 'firebase';
import Chance from 'chance';

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    loadedMeetups: [
      {
        imageUrl:
          'https://upload.wikimedia.org/wikipedia/commons/c/c9/Broadway_Crowds_%285896264776%29_crop.jpg',
        id: 'nyc',
        title: 'NYC',
        date: '2018-05-05T20:00:00.000-04:00',
        location: 'Manhattan, NY',
        description:
          'Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia deleniti unde soluta quam, facilis praesentium tempore aut tenetur error earum exercitationem excepturi voluptatibus ducimus magni officiis illum quasi perferendis incidunt.'
      },
      {
        imageUrl:
          'https://upload.wikimedia.org/wikipedia/commons/2/22/The_Mus%C3%A9e_dOrsay_at_sunset%2C_Paris_July_2013.jpg',
        id: 'paris',
        title: 'Paris',
        date: '2018-05-20T18:30:00.000-04:00',
        location: 'Paris, France',
        description:
          'Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia deleniti unde soluta quam, facilis praesentium tempore aut tenetur error earum exercitationem excepturi voluptatibus ducimus magni officiis illum quasi perferendis incidunt.'
      }
    ],
    user: null
  },
  mutations: {
    createMeetup(state, payload) {
      state.loadedMeetups.push(payload);
    },
    setUser(state, payload) {
      state.user = payload;
    }
  },
  actions: {
    createMeetup({ commit }, { title, location, imageUrl, description, date }) {
      const chance = new Chance();

      const meetup = {
        title,
        location,
        imageUrl,
        description,
        date,
        id: chance.guid()
      };
      // Reach out to firebase and store it
      commit('createMeetup', meetup);
    },
    signUserUp({ commit }, payload) {
      firebase
        .auth()
        .createUserWithEmailAndPassword(payload.email, payload.password)
        .then(({ user }) => {
          const newUser = {
            id: user.uid,
            registeredMeetups: []
          };
          commit('setUser', newUser);
        })
        .catch(error => {
          console.log(error);
        });
    },
    signUserIn({ commit }, payload) {
      firebase
        .auth()
        .signInWithEmailAndPassword(payload.email, payload.password)
        .then(({ user }) => {
          const newUser = {
            id: user.uid,
            registeredMeetups: []
          };
          commit('setUser', newUser);
        })
        .catch(error => {
          console.log(error);
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
    }
  }
});
