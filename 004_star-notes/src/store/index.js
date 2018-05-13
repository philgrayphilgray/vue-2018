import Vue from 'vue';
import Vuex from 'vuex';
import * as firebase from 'firebase';
import axios from 'axios';
import Chance from 'chance';
import router from '../router/';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    demoStarredRepos: [], // all repos starred by demo user
    demoLoadedBoard: {}, // the board to display on the homepage
    userLoadedBoard: null, // the current board the user is viewing
    userStarredRepos: [], // all repos starred by user, all data
    userBoards: [], // list of board ids
    user: null,
    loading: false,
    error: null,
  },
  mutations: {
    setLoading(state, payload) {
      state.loading = payload;
    },
    setError(state, payload) {
      state.error = payload;
    },
    clearError(state) {
      state.error = null;
    },
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

    createNewBoard(state, payload) {
      state.userBoards.push(payload);
    },
    loadUserBoards(state, payload) {
      state.userBoards = payload;
    },
    setUserLoadedBoard(state, payload) {
      state.userLoadedBoard = payload;
    },
    setUser(state, payload) {
      state.user = payload;
    },
  },
  actions: {
    autoSignIn({ commit, dispatch }, payload) {
      commit('setLoading', true);
      commit('setUser', payload);
      dispatch('loadUserBoards');
      commit('setLoading', false);
    },
    clearError({ commit }) {
      commit('clearError');
    },
    loadDemo({ commit }) {
      commit('setLoading', true);
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

          commit('setLoading', false);
          commit('loadDemoBoard', newBoard);
          commit('createNewDemoList', 'repos to remember');
        })
        .catch((error) => {
          console.log(error);
          commit('setLoading', false);
        });
    },
    // eslint-disable-next-line
    signUserIn({ commit, dispatch }, payload) {
      commit('setLoading', true);
      // eslint-disable-next-line
      const provider = new firebase.auth.GithubAuthProvider();

      firebase
        .auth()
        .signInWithPopup(provider)
        .then(({ user }) => {
          console.log(user);
          commit('setUser', user);
          dispatch('loadUserBoards');
          commit('setLoading', false);
          router.push('/boards');
        })
        .catch((error) => {
          console.log(error);
          commit('setLoading', false);
        });
    },
    logout({ commit }) {
      firebase
        .auth()
        .signOut()
        .then(() => {
          commit('setUser', null);
          commit('setUserLoadedBoard', null);
          commit('loadUserBoards', []);

          console.log('logout success');
        })
        .catch((error) => {
          console.log(`logout error: ${error}`);
        });
    },
    createNewBoard({ commit, getters }, payload) {
      commit('setLoading', true);
      const user = getters.user.uid;
      // eslint-disable-next-line
      console.log(user);
      const newBoard = { name: payload };
      firebase
        .database()
        .ref(`/users/${user}`)
        .child('/boards')
        .push(newBoard)
        .then((data) => {
          commit('setLoading', false);
          commit('createNewBoard', { name: payload, id: data.key });
          // set the userLoadedBoard to the new board and push the router to the new board
        })
        .catch((error) => {
          console.log(error);
          commit('setLoading', false);
        });
    },
    // eslint-disable-next-line
    loadUserBoards({ commit, getters }) {
      const user = getters.user.uid;
      firebase
        .database()
        .ref(`users/${user}`)
        .child('/boards')
        .once('value')
        .then((data) => {
          if (data.val() !== null && data.val() !== undefined) {
            const userBoards = Object.entries(data.val()).map(board => ({
              id: board[0],
              name: board[1].name,
            }));
            commit('loadUserBoards', userBoards);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    setUserLoadedBoard({ commit, dispatch, getters }, payload) {
      const selectedBoard = getters.getLoadedBoard(payload);
      commit('setUserLoadedBoard', selectedBoard);
    },
  },
  getters: {
    loading(state) {
      return state.loading;
    },
    error(state) {
      return state.error;
    },
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
    userBoards(state) {
      return state.userBoards;
    },
    getLoadedBoard: state => boardId => state.userBoards.filter(board => board.id === boardId)[0],
    loadedBoard(state) {
      return state.userLoadedBoard;
    },
  },
});

export default store;
