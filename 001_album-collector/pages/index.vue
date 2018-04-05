<template lang="pug">
div 
  UserControls(@queryChange="filterBySearchQuery" @sortRatingChange="sortByRating" @sortTitleChange="sortByTitle")
  CardGrid(:albums="getAlbums")
</template>


<script>
import UserControls from '../components/UserControls';
import CardGrid from '../components/CardGrid';
export default {
  components: {
    UserControls,
    CardGrid
  },
  data() {
    return {
      filter: '',
      options: null
    };
  },
  computed: {
    getAlbums() {
      switch (this.filter) {
        case 'search':
          return this.$store.getters.filterBySearchQuery(this.options);
        case 'rating':
          return this.$store.getters.sortByRating(this.options);
        case 'title':
          return this.$store.getters.sortByTitle(this.options);
        default:
          return this.$store.getters.getAllAlbums;
      }
    }
  },
  methods: {
    filterBySearchQuery: function({ query }) {
      if (query !== '') {
        this.filter = 'search';
        this.options = query;
      } else {
        this.filter = '';
        this.options = null;
      }
    },
    sortByRating: function({ asc }) {
      this.filter = 'rating';
      this.options = asc;
    },
    sortByTitle: function({ asc }) {
      this.filter = 'title';
      this.options = asc;
    }
  }
};
</script>

