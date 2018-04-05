<template lang="pug">
.starRating(:class="editable ? '--editable' : null")
    span.starRating__starIcon(v-for="star, index in stars" :class="star === true ? '--star-full' : '--star-empty'" :key="index" @click="clickHandler(index)")
</template>

<script>
export default {
  props: ['rating', 'editable'],
  data() {
    return {
      stars: []
    };
  },
  beforeMount() {
    this.setStars();
  },
  watch: {
    rating: function() {
      this.setStars();
    }
  },
  methods: {
    setStars() {
      this.stars = [];
      for (let i = 1; i <= 5; i++) {
        if (i <= this.rating) {
          this.stars.push(true);
        } else {
          this.stars.push(false);
        }
      }
    },
    clickHandler(index) {
      const newRating = index + 1;
      this.$emit('rated', { newRating });
    }
  }
};
</script>
<style lang="scss">
.starRating {
  padding: 0.5em;
  display: flex;
  justify-content: center;
}
.starRating + button {
  margin: 1em 0;
}

.starRating__starIcon {
  height: 2em;
  width: 2em;
  display: inline-block;
}

.--star-empty {
  background-image: url('~/assets/svg/star-empty.svg');
}

.--star-full {
  background-image: url('~/assets/svg/star-full.svg');
}

.starRating.--editable .starRating__starIcon {
  cursor: pointer;
}
</style>
