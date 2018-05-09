import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    items: [
      { title: "First title", order: 1 },
      { title: "Second title", order: 2 }
    ]
  },
  mutations: {
    addItem: function(state, title = "") {
      state.items.push({ title });
    },
    updateItems: function(state, value) {
      state.items = value;
    },
    editTitle: function(state, itemIndex, newTitle) {
      state.items[itemIndex].title = newTitle;
    }
  },
  getters: {
    getItems: function(state) {
      return state.items;
    }
  },
  actions: {}
});
