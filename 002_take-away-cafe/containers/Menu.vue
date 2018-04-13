<template lang="pug">
.menu
    .menu__message
        p   Choose a menu item below to view more details and make a selection.
    .menu__item(v-for="n in 4") {{n }}

</template>

<style lang="scss">
@import '../theme.scss';
.menu {
  display: grid;
  grid-template-rows: auto;
  grid-template-columns: repeat(2, 1fr);
  grid-template-areas: 'message message';
  background: $primary-dark;
  grid-gap: $spacing-unit;
  margin: $spacing-unit/2;
}

.menu__message {
  grid-area: message;
  background: $primary;
  padding: $spacing-unit;
  text-align: center;
}

.menu__item {
  text-align: center;
  box-shadow: 1px 2px 4px 1px $secondary-light;
}
</style>

