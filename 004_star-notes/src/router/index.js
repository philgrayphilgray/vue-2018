import Vue from 'vue';
import Router from 'vue-router';
import * as firebase from 'firebase';

import Home from '@/components/Home';
import Boards from '@/components/Boards';
import LoadedBoard from '@/components/LoadedBoard';

Vue.use(Router);

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
      meta: {
        requiresAuth: false,
      },
    },
    {
      path: '/boards/',
      name: 'Boards',
      component: Boards,
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: '/b/:boardId',
      name: 'LoadedBoard',
      component: LoadedBoard,
      meta: {
        requiresAuth: true,
      },
    },
  ],
  mode: 'history',
});

router.beforeEach((to, from, next) => {
  const currentUser = firebase.auth().currentUser;

  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);

  if (requiresAuth && !currentUser) {
    // eslint-disable-next-line
    console.log('requiresAuth && !currentUser');
    next('/');
  } else if (requiresAuth && currentUser) {
    // eslint-disable-next-line
    console.log('requiresAuth && currentUser');
    next();
  } else {
    // eslint-disable-next-line
    console.log('else');
    next();
  }
});

export default router;
