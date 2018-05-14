<template lang="pug">
  v-app
    v-navigation-drawer(v-model="sideNav" fixed app v-if="userIsAuthenticated" @click.native.stop="sideNav = !sideNav")
        v-list
            v-list-tile
                v-list-tile-content
                  v-list-tile-title
                    h2 {{user.displayName}}
                v-list-tile-action
                    v-icon fa-github
            v-divider
            v-list-tile(to="/boards")
                v-list-tile-content
                  v-list-tile-title Dashboard
                v-list-tile-action
                    v-icon dashboard
            v-list-tile(@click="onSignUserOut")
                v-list-tile-content
                  v-list-tile-title Sign Out
                v-list-tile-action
                    v-icon exit_to_app
    v-toolbar
        v-toolbar-side-icon(@click.native.stop="sideNav = !sideNav" v-if="userIsAuthenticated")
        router-link.header__branding(to="/" tag="v-toolbar-title") StarNotes
        v-spacer
        v-toolbar-items
            v-menu(bottom offset-y)
              v-btn(flat slot="activator" v-if="!userIsAuthenticated")
                v-icon(right ) fa-github
              v-avatar.ma-3(v-if="userIsAuthenticated" slot="activator" size="36px")
                img(:src="user.photoURL")
              v-list
                v-btn(v-if="!userIsAuthenticated" @click="onSignUserIn")
                  v-list-tile-title Sign in
                v-btn(v-if="userIsAuthenticated" @click="onSignUserOut")  
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
    user() {
      return this.$store.getters.user;
    },
    loading() {
      return this.$store.getters.loading;
    },
  },
  methods: {
    onSignUserIn() {
      this.$store.dispatch('signUserIn');
    },
    onSignUserOut() {
      this.$store.dispatch('logout');
      this.$router.replace('/');
    },
  },
};
</script>
<style lang="scss" scoped>
.header__branding {
  cursor: pointer;
}
</style>
