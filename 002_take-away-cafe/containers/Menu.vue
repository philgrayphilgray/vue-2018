<template lang="pug">
.menu
    //- .menu__message
    //-     p   Choose a menu item below to view more details and make a selection.
    .menu__item(v-for="(item, i) in menu" :key="item.image" @click="selectItem(i)")
        //- background image
        //- .menu__image(:style="{backgroundImage: `url(${require('~/assets/images/' + item + '.jpg')})`}")
        //- inline image
        img.menu__image(:src="require(`~/assets/images/${item.image}.jpg`)" :alt="item.label")

</template>
<script>
import { mapGetters, mapMutations, mapActions } from 'vuex';
export default {
  data() {
    return {
      menu: null
    };
  },
  methods: {
    ...mapMutations(['toggleOverlay']),
    ...mapActions(['selectItem'])
  },
  computed: {
    ...mapGetters({
      getMenu: 'getMenu'
    })
  },
  beforeMount() {
    this.menu = this.getMenu;
  }
};
</script>

<style lang="scss">
@import '../theme.scss';
.menu {
  display: grid;
  grid-template-rows: auto;
  grid-template-columns: repeat(2, 1fr);
  grid-template-areas: 'message message';
  background: $primary-dark;
  grid-gap: $spacing-unit;
  margin: $spacing-unit $spacing-unit/2;
}

.menu__message {
  grid-area: message;
  background: $primary;
  padding: $spacing-unit;
  text-align: center;
  margin-bottom: $spacing-unit/2;
}

.menu__item {
  cursor: pointer;
}

// inline image
.menu__image {
  object-fit: cover; // needs a polyfill for older browsers
  height: 170px;
  width: 170px;
  margin: 0;
  &:hover {
    box-shadow: 1px 2px 4px 1px $secondary-light;
  }
}
// background image
// .menu__image {
//   height: 170px;
//   background-size: cover;
//   background-repeat: no-repeat;
//   background-position: center center;
// }
</style>

