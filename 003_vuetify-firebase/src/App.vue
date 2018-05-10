<template lang="pug">
v-app
  v-navigation-drawer.hidden-sm-and-up(v-model="sideNav" fixed app)
    v-list
      v-list-tile(v-for="item in menuItems" :key="item.title" @click="" :to="item.link")
        v-list-tile-action
          v-icon {{item.icon}}
        v-list-tile-content {{item.title}}
      v-list-tile(v-if="userIsAuthenticated" @click="onLogout")
        v-list-tile-action
          v-icon exit_to_app
        v-list-tile-content Logout
  v-toolbar(dark)
    v-toolbar-side-icon.hidden-sm-and-up(@click="sideNav=!sideNav")
    router-link(to="/" tag="span" style="cursor:pointer")
      v-toolbar-title DevMeetup
    v-spacer
    v-toolbar-items.hidden-xs-only(v-for="item in menuItems" :key="item.title" )
      v-btn(flat :to="item.link") 
        v-icon(left) {{item.icon}}
        | {{item.title}}
    v-toolbar-items.hidden-xs-only(v-if="userIsAuthenticated")
      v-btn(flat @click="onLogout") 
        v-icon(left) exit_to_app
        | Logout
  v-content
    main
      router-view
</template>

<script>
export default {
  data() {
    return {
      sideNav: false
    };
  },
  computed: {
    menuItems() {
      let menuItems = [
        { icon: 'face', title: 'Sign up', link: '/signup' },
        { icon: 'lock_open', title: 'Sign in', link: '/signin' }
      ];

      if (this.userIsAuthenticated) {
        menuItems = [
          {
            icon: 'supervisor_account',
            title: 'View Meetups',
            link: '/meetups'
          },
          { icon: 'room', title: 'Organize Meetup', link: '/meetup/new' },
          { icon: 'person', title: 'Profile', link: '/profile' }
        ];
      }
      return menuItems;
    },
    userIsAuthenticated() {
      return (
        this.$store.getters.user !== null &&
        this.$store.getters.user !== undefined
      );
    }
  },
  methods: {
    onLogout() {
      this.$store.dispatch('logout');
    }
  }
};
</script>
