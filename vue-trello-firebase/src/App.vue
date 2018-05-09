<template lang="pug">
v-app
  v-navigation-drawer(app='')
    v-toolbar(flat='')
      v-list
        v-list-tile
          v-list-tile-title.title
            | Vue Trello
    v-divider
    v-list.pt-0(dense)
      router-link(v-for='route in routes', :key='route.title' tag="v-list-tile" :to='route.url')
        v-list-tile-content
          v-list-tile-title {{route.title}}
  v-toolbar(app)
  v-content
    v-container(fluid)
      router-view
  v-footer(app)
    span.px-3 &copy; 2018 thephilgray
</template>

<script>
export default {
  data() {
    return {
      routes: [{ url: '/', title: 'Home' }, { url: '/decks', title: 'Decks' }]
    };
  }
};
</script>


<style lang="scss">

</style>
