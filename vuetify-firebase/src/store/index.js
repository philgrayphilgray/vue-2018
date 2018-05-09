import Vue from 'vue';
import Vuex from 'vuex';
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
        date: new Date(),
        location: 'Manhattan, NY',
        description:
          'Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia deleniti unde soluta quam, facilis praesentium tempore aut tenetur error earum exercitationem excepturi voluptatibus ducimus magni officiis illum quasi perferendis incidunt.'
      },
      {
        imageUrl:
          'https://upload.wikimedia.org/wikipedia/commons/2/22/The_Mus%C3%A9e_dOrsay_at_sunset%2C_Paris_July_2013.jpg',
        id: 'paris',
        title: 'Paris',
        date: new Date(),
        location: 'Paris, France',
        description:
          'Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia deleniti unde soluta quam, facilis praesentium tempore aut tenetur error earum exercitationem excepturi voluptatibus ducimus magni officiis illum quasi perferendis incidunt.'
      }
    ],
    user: {
      id: 'sdfdsfdsfkj',
      registeredMeetups: ['paris']
    }
  },
  mutations: {
    createMeetup(state, payload) {
      state.loadedMeetups.push(payload);
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
    }
  }
});
