import Vue from 'vue';
import Router from 'vue-router';
import Home from '@/components/Home';
import Boards from '@/components/Boards';
import AuthGuard from './auth-guard';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
    },
    {
      path: '/boards/',
      name: 'Boards',
      component: Boards,
      beforeEnter: AuthGuard,
    },
  ],
  mode: 'history',
});
