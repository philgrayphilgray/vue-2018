<template lang="pug">
  .card
    img.card__image(:src="album.art" :alt="'Album artwork for ' + album.title + ' by ' + album.artist")
    .card__body
      .card__details
        p {{album.title}}
        p {{album.artist}}
        p {{album.year}}
        StarRating(:rating="album.rating")
      .card__controls
        button.card__button(type="button" aria-label="Edit card" @click="updateHandler(album.id)")
          img.card__icon(src="~/assets/svg/pencil.svg" alt="Pencil")
        button.card__button(type="button" aria-label="Delete card" @click="removeHandler(album.id)")
          img.card__icon(src="~/assets/svg/bin.svg" alt="Bin")
    
</template>

<script>
import StarRating from './StarRating';
export default {
  props: ['album'],
  components: {
    StarRating
  },
  methods: {
    removeHandler(id) {
      this.$store.commit('remove', id);
    },
    updateHandler(id) {
      this.$router.push({ path: `/${id}/edit` });
    }
  }
};
</script>

<style lang="scss">
.card {
  position: relative;
  width: 310px;
  padding: 1em;
  box-shadow: 1px 4px 2px 1px #aaa;
}

.card__body {
  display: flex;
  flex-wrap: wrap;
}

.card__image {
  flex: 100%;
  width: 100%;
  height: auto;
  position: relative;
}

.card__details {
  flex: 60%;
  padding: 1em;
}

.card__controls {
  display: flex;
  flex-wrap: wrap;
  width: 2em;
  justify-content: center;
  align-items: center;
}

.card__button {
  padding: 0.25em;
  background: transparent;
  border-color: transparent;
  &:hover {
    cursor: pointer;
  }
}

.card__icon {
  width: 2em;
}
</style>
