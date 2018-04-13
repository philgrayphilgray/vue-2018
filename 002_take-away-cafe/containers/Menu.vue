<template lang="pug">
.menu
    .menu__message
        p   Choose a menu item below to view more details and make a selection.
    .menu__item(v-for="item in images")
        .menu__image(:style="{backgroundImage: `url(${require('~/assets/images/' + item + '.jpg')})`}")

</template>
<script>
export default {
  data() {
    return {
      // this will later get passed down with the menu object as a prop
      images: ['americano', 'coldbrew', 'herbaltea', 'icedlatte']
    };
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
  text-align: center;
  box-shadow: 1px 2px 4px 1px $secondary-light;
}

.menu__image {
  height: 170px;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
}
</style>

