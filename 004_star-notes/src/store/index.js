import Vue from 'vue';
import Vuex from 'vuex';

import * as firebase from 'firebase';
import axios from 'axios';
import Chance from 'chance';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    demoStarredRepos: [], // all repos starred by demo user
    demoLoadedBoard: {}, // the board to display on the homepage
    userLoadedBoard: {}, // the current board the user is viewing
    userStarredRepos: [], // all repos starred by user, all data
    userBoards: [], // list of board ids
    user: null,
  },
  mutations: {
    loadStarredRepos(state, payload) {
      state.demoStarredRepos = payload;
    },
    loadDemoBoard(state, payload) {
      state.demoLoadedBoard = payload;
    },
    createNewDemoList(state, payload) {
      const chance = new Chance();
      const id = chance.guid();

      const newList = { id, idBoard: state.demoLoadedBoard.id, name: payload };

      state.demoLoadedBoard.lists.push(newList);
    },
    setUser(state, payload) {
      state.user = payload;
    },
  },
  actions: {
    autoSignIn({ commit }, payload) {
      commit('setUser', payload);
    },
    loadDemo({ commit }) {
      axios
        .get('https://api.github.com/users/octocat/starred')
        .then(({ data }) => {
          commit('loadStarredRepos', data);
          const id = 'demoBoard123';
          const name = 'Demo Board';
          const userDescription = '';
          const idBoard = id;
          const idList = 'demoList123';

          const cards = data.slice(1).map(card => ({ ...card, idBoard, idList, userDescription }));
          const lists = [{ id: idList, idBoard, name: 'repos to check out' }];

          const newBoard = { id, name, cards, lists };

          commit('loadDemoBoard', newBoard);
          commit('createNewDemoList', 'repos to remember');
        })
        .catch((error) => {
          // eslint-disable-next-line
          console.log(error);
        });
    },
    // eslint-disable-next-line
    signUserIn({ commit }, payload) {
      // eslint-disable-next-line
      const provider = new firebase.auth.GithubAuthProvider();

      firebase
        .auth()
        .signInWithPopup(provider)
        .then((result) => {
          // eslint-disable-next-line
          console.log(result);
          commit('setUser', result);
        })
        .catch((error) => {
          // eslint-disable-next-line
          console.log(error);
        });
    },
    logout({ commit }) {
      commit('setUser', null);
    },
  },
  getters: {
    user(state) {
      return state.user;
    },
    demoLoadedBoard(state) {
      return state.demoLoadedBoard;
    },
    getDemoCards(state) {
      return state.demoLoadedBoard.cards;
    },
    getDemoListCardsByListId: state => listId =>
      state.demoLoadedBoard.cards.filter(card => card.idList === listId),
  },
});

export default store;
