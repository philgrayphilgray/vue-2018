<template lang="pug">
v-app
  v-navigation-drawer.hidden-sm-and-up(v-model="sideNav" fixed app)
    v-list
      v-list-tile(v-for="item in menuItems" :key="item.title" @click="" :to="item.link")
        v-list-tile-action
          v-icon {{item.icon}}
        v-list-tile-content {{item.title}}
  v-toolbar(dark)
    v-toolbar-side-icon.hidden-sm-and-up(@click="sideNav=!sideNav")
    router-link(to="/" tag="span" style="cursor:pointer")
      v-toolbar-title DevMeetup
    v-spacer
    v-toolbar-items.hidden-xs-only(v-for="item in menuItems" :key="item.title" )
      v-btn(flat :to="item.link") 
        v-icon(left) {{item.icon}}
        | {{item.title}}
  v-content
    main
      router-view
</template>

<script>
export default {
  data() {
    return {
      sideNav: false,
      menuItems: [
        { icon: 'supervisor_account', title: 'View Meetups', link: '/meetups' },
        { icon: 'room', title: 'Organize Meetup', link: '/meetup/new' },
        { icon: 'person', title: 'Profile', link: '/profile' },
        { icon: 'face', title: 'Sign up', link: '/signup' },
        { icon: 'lock_open', title: 'Sign in', link: '/signin' }
      ]
    };
  }
};
</script>
