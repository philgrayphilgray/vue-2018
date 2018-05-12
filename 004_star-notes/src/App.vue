<template lang="pug">
  v-app
    v-navigation-drawer(v-model="sideNav" fixed app v-if="userIsAuthenticated")
        v-list
            v-list-tile
                v-list-tile-action
                    v-icon fa-github
    v-toolbar
        v-toolbar-side-icon(@click.native.stop="sideNav = !sideNav" v-if="userIsAuthenticated")
        v-toolbar-title StarNotes
        v-spacer
        v-toolbar-items
            v-menu(bottom offset-y)
              v-btn(flat slot="activator")
                  v-icon(right) fa-github
              v-list
                v-btn(v-if="!userIsAuthenticated" @click="onSignUserIn")
                  v-list-tile-title Sign in
                v-btn(v-if="userIsAuthenticated")  
                  v-list-tile-title Sign out
    v-content
        main(@click="sideNav = false")
            router-view
    v-footer.grey.darken-3(height="auto" )
        v-layout(row wrap )
            v-flex(xs12 py-3 text-xs-center)
                a.white--text(href="https://github.com/philgrayphilgray/vue-2018") View the source code.
</template>
<script>
export default {
  data() {
    return {
      sideNav: false,
      dialog: false,
    };
  },
  computed: {
    userIsAuthenticated() {
      return (
        this.$store.getters.user !== null &&
        this.$store.getters.user !== undefined
      );
    },
  },
  methods: {
    onSignUserIn() {
      this.$store.dispatch('signUserIn');
    },
  },
};
</script>
