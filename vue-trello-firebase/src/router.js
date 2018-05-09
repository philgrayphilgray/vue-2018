import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import Decks from "./views/Decks.vue";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "/decks",
      name: "decks",
      component: Decks
    }
  ]
});
