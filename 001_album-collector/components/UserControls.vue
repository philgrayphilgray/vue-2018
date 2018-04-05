<template lang="pug">
.userControls
    input.userControls__search(:class="search.active ? '--active' : null" type="text" role="search" placeholder="search" aria-label="Search field" ref="searchInput" v-model="search.query" @keyup="searchHandler" @keyup.esc="clearSearch")
    button.userControls__button(aria-label="Search button" @click="searchButtonHandler" ref="searchButton")
        img.userControls__icon(:src="search.active ? require('~/assets/svg/cancel-circle.svg') : require('~/assets/svg/search.svg')" alt="Magnifying glass")
    button.userControls__button(aria-label="Sort by title" @click="sortAlphaHandler")
        img.userControls__icon(:src="sort.alpha.asc ? require('~/assets/svg/sort-alpha-asc.svg') : require('~/assets/svg/sort-alpha-desc.svg')" alt="Alphabetical sort")
    button.userControls__button(aria-label="Sort by rating" @click="sortRatingHandler")
        img.userControls__icon(:src="sort.rating.asc ? require('~/assets/svg/sort-amount-asc.svg') : require('~/assets/svg/sort-amount-desc.svg')" alt="Rating sort")
</template>
<script>
export default {
  data() {
    return {
      search: { active: false, query: '' },
      sort: {
        alpha: { active: false, asc: true },
        rating: { active: false, asc: false }
      }
    };
  },
  methods: {
    searchButtonHandler() {
      if (this.search.active) {
        this.search.query = '';
      }
      this.search.active = !this.search.active;
      this.$refs.searchInput.focus();
    },
    clearSearch() {
      this.search.active = false;
      this.search.query = '';
      this.$emit('queryChange', { query: this.search.query });
      this.$refs.searchButton.focus();
    },
    searchHandler() {
      this.$emit('queryChange', { query: this.search.query });
    },
    sortAlphaHandler() {
      this.$emit('sortTitleChange', { asc: this.sort.alpha.asc });
      this.search.active = false;
      this.sort.alpha.active = true;
      this.sort.alpha.asc = !this.sort.alpha.asc;
    },
    sortRatingHandler() {
      this.$emit('sortRatingChange', { asc: this.sort.rating.asc });
      this.search.active = false;
      this.sort.rating.active = true;
      this.sort.rating.asc = !this.sort.rating.asc;
    }
  }
};
</script>
<style lang="scss">
.userControls {
  display: flex;
  flex-wrap: wrap;
  min-width: 310px;

  margin: 0 auto;
  justify-content: center;
  background: #c4c4c4;
  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
  height: 3em;
}

.userControls__icon {
  height: 2em;
  width: 2em;
}
.userControls__button {
  cursor: pointer;
  background: transparent;
  border: transparent;
}
.userControls__search {
  font-size: 1.5em;
  width: 0;
  padding: 0;
  margin: 0;
  border: none;
  transition: all 0.5s ease-in-out;
}
.userControls__search.--active {
  padding: 0.5em;

  flex: 3 0 50%;
}
</style>
