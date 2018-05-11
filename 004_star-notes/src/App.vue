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
            v-btn(flat)
                v-icon(right) fa-github
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
    };
  },
  computed: {
    userIsAuthenticated() {
      return false;
    },
  },
};
</script>
