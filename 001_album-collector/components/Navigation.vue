<template lang="pug">
.navigation
  .navigation__branding
    img.navigation__logo(src="~/assets/svg/logo-menu.svg" alt="Album Collector")   
  FocusLock
    nav.navigation__menu(role="navigation")
      ul.navigation__list
          li.navigation__item
              nuxt-link(tag="a" to="/" ) Home
          li.navigation__item
              nuxt-link(tag="a" to="/new" ) Add
</template>

<script>
import FocusLock from "vue-focus-lock";
export default {
  components: {
    FocusLock
  }
};
</script>
<style scoped>
.navigation {
  justify-self: flex-start;
}
.navigation__menu {
  text-align: center;
  font-size: 2em;
}
.navigation__list {
  list-style: none;
  padding: 0;
}

.navigation__item a {
  color: #fff;
  text-decoration: none;
}
</style>
