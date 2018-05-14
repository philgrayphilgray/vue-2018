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
    userCards: [], // list of all user cards; each also has an idList and idBoard
    userLists: [],
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
    loadDemoStarredRepos(state, payload) {
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
    createNewList(state, payload) {
      state.userLists.push(payload);
    },
    deleteList(state, payload) {
      state.userLists = state.userLists.filter(list => list.id !== payload);
    },
    createNewBoard(state, payload) {
      state.userBoards.push(payload);
    },
    deleteBoard(state, payload) {
      state.userBoards = state.userBoards.filter(board => board.id !== payload);
    },
    loadUserBoards(state, payload) {
      state.userBoards = payload;
    },
    setUserLoadedBoard(state, payload) {
      state.userLoadedBoard = payload;
    },
    loadUserLists(state, payload) {
      state.userLists = payload;
    },
    loadUserCards(state, payload) {
      state.userCards = payload;
    },
    createNewCard(state, payload) {
      state.userCards.push(payload);
    },
    deleteCard(state, payload) {
      state.userCards = state.userCards.filter(card => card.id !== payload);
    },
    loadUserStarredRepos(state, payload) {
      state.userStarredRepos = payload;
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
      dispatch('loadUserStarredRepos');
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
          commit('loadDemoStarredRepos', data);
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
          commit('setError', error);
          commit('setLoading', false);
        });
    },
    signUserIn({ commit, dispatch }) {
      commit('setLoading', true);
      const provider = new firebase.auth.GithubAuthProvider();
      firebase
        .auth()
        .signInWithPopup(provider)
        .then(({ user }) => {
          commit('setUser', user);
          dispatch('loadUserBoards');
          dispatch('loadUserStarredRepos');
          commit('setLoading', false);
          router.push('/boards');
        })
        .catch((error) => {
          commit('setError', error);
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
          commit('loadUserLists', []);
        })
        .catch((error) => {
          commit('setError', error);
        });
    },
    createNewBoard({ commit, getters }, payload) {
      commit('setLoading', true);
      const user = getters.user.uid;

      const newBoard = { name: payload };
      firebase
        .database()
        .ref(`/users/${user}`)
        .child('/boards')
        .push(newBoard)
        .then((data) => {
          commit('setLoading', false);
          commit('createNewBoard', { name: payload, id: data.key });
        })
        .catch((error) => {
          commit('setError', error);
          commit('setLoading', false);
        });
    },
    deleteBoard({ commit, getters, dispatch }, payload) {
      const user = getters.user.uid;
      firebase
        .database()
        .ref(`users/${user}`)
        .child(`/boards/${payload.idBoard}`)
        .remove()
        .then(() => {
          commit('deleteBoard', payload.idBoard);
          getters.loadedBoardLists(payload.idBoard).forEach((list) => {
            dispatch('deleteList', { idList: list.id });
          });
          commit('setUserLoadedBoard', null);
        });
    },
    createNewList({ commit, getters }, payload) {
      commit('setLoading', true);
      const user = getters.user.uid;

      const newList = { name: payload.name, idBoard: payload.idBoard };
      firebase
        .database()
        .ref(`/users/${user}`)
        .child('/lists')
        .push(newList)
        .then((data) => {
          commit('setLoading', false);
          commit('createNewList', {
            ...newList,
            id: data.key,
          });
        })
        .catch((error) => {
          commit('setError', error);
          commit('setLoading', false);
        });
    },

    createNewCard({ commit, getters }, payload) {
      const user = getters.user.uid;
      const newCard = {
        clone_url: payload.clone_url,
        name: payload.name,
        stargazers_count: payload.stargazers_count,
        description: payload.description,
        owner: {
          avatar_url: payload.owner.avatar_url,
          login: payload.owner.login,
          url: payload.owner.url,
        },
        idBoard: payload.idBoard,
        idList: payload.idList,
        notes: payload.notes,
      };
      firebase
        .database()
        .ref(`/users/${user}`)
        .child('/cards')
        .push(newCard)
        .then((data) => {
          commit('createNewCard', {
            ...newCard,
            id: data.key,
          });
        });
    },
    deleteCard({ commit, getters }, payload) {
      const user = getters.user.uid;
      firebase
        .database()
        .ref(`users/${user}`)
        .child(`/cards/${payload.cardId}`)
        .remove()
        .then(() => {
          commit('deleteCard', payload.cardId);
        });
    },
    deleteList({ commit, getters, dispatch }, payload) {
      const user = getters.user.uid;
      firebase
        .database()
        .ref(`users/${user}`)
        .child(`/lists/${payload.idList}`)
        .remove()
        .then(() => {
          commit('deleteList', payload.idList);
          getters.listCards(payload.idList).forEach((card) => {
            dispatch('deleteCard', { cardId: card.id });
          });
        });
    },
    loadUserLists({ commit, getters, dispatch }) {
      const user = getters.user.uid;
      firebase
        .database()
        .ref(`users/${user}`)
        .child('/lists')
        .once('value')
        .then((data) => {
          if (data.val() !== null && data.val() !== undefined) {
            const userLists = Object.entries(data.val()).map(list => ({
              id: list[0],
              name: list[1].name,
              idBoard: list[1].idBoard,
            }));
            commit('loadUserLists', userLists);
            dispatch('loadUserCards');
          }
        })
        .catch((error) => {
          commit('setError', error);
        });
    },

    loadUserBoards({ commit, getters, dispatch }) {
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
            dispatch('loadUserLists');
          }
        })
        .catch((error) => {
          commit('setError', error);
        });
    },

    loadUserCards({ commit, getters }) {
      const user = getters.user.uid;
      firebase
        .database()
        .ref(`users/${user}`)
        .child('/cards')
        .once('value')
        .then((data) => {
          if (data.val() === null || data.val() === undefined) {
            return;
          }
          const userCards = Object.entries(data.val()).map(card => ({
            id: card[0],
            ...card[1],
          }));
          commit('loadUserCards', userCards);
        })
        .catch((error) => {
          commit('setError', error);
        });
    },
    loadUserStarredRepos({ commit, getters }) {
      if (getters.userStarredRepos.length > 0) {
        return;
      }
      const user = getters.user.providerData[0].uid;
      axios.get(`https://api.github.com/user/${user}`).then(({ data }) => {
        const username = data.login;
        return axios
          .get(`https://api.github.com/users/${username}/starred?per_page=100&type=owner`)
          .then((response) => {
            const userRepos = response.data.map(repo => ({
              clone_url: repo.clone_url,
              name: repo.name,
              stargazers_count: repo.stargazers_count,
              description: repo.description,
              owner: {
                avatar_url: repo.owner.avatar_url,
                login: repo.owner.login,
                url: repo.owner.url,
              },
            }));
            commit('loadUserStarredRepos', userRepos);
          });
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
    userLists(state) {
      return state.userLists;
    },
    userStarredRepos(state) {
      return state.userStarredRepos;
    },

    loadedBoardLists: state => boardId => state.userLists.filter(list => list.idBoard === boardId),
    listCards: state => listId => state.userCards.filter(card => card.idList === listId),
  },
});

export default store;
