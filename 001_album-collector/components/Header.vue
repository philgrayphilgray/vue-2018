<template lang="pug">
.header(@keyup.esc="toggleOverlay")
  transition(name="slideIn" mode="out-in")
    Overlay(v-if="$store.state.navToggled" :toggle="toggleOverlay")
      div(slot="navigation")
        Navigation
  header.header__navBar(role="banner")
      button.header__button(@click="toggleOverlay" type="button" aria-label="Toggle navigation on" :aria-expanded="$store.state.navToggled")
        span.header__buttonIconBar
        span.header__buttonIconBar
        span.header__buttonIconBar
      .header__logo
        nuxt-link(to="/")
          img(src="~/assets/svg/logo.svg" alt="Album Collector")

</template>


<script>
import Overlay from "../components/Overlay";
import Navigation from "../components/Navigation";

export default {
  components: { Overlay, Navigation },

  methods: {
    toggleOverlay() {
      this.$store.commit("toggleNav");
    }
  }
};
</script>

<style lang="scss" scoped>
.header__navBar {
  width: 100%;
  background: #403c3c;
  height: 56px;
  color: #fff;
  display: flex;
  align-items: center;

  justify-content: space-between;
}
.header__logo {
  margin: auto;
}

.header__button {
  margin-left: 1em;
  border-color: transparent;
  background-color: transparent;
  background-image: none;

  position: absolute;
  padding: 1em;
  justify-self: start;
  &:hover {
    cursor: pointer;
  }
}

.header__buttonIconBar {
  display: block;
  background: #fff;
  height: 3px;
  width: 22px;
  border-radius: 1px;
}

.header__buttonIconBar + .header__buttonIconBar {
  margin-top: 4px;
}

// Navigation SlideIn

.slideIn-enter-active,
.slideIn-leave-active {
  transition: all 0.15s ease-in-out;
}

.slideIn-enter,
.slideIn-leave-to {
  transform: translateX(-200px);
}
</style>