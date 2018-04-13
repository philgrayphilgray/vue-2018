<template lang="pug">
.overlay(@keyup.esc="toggleOverlay")
    header.overlay__controls
      button.overlay__closeButton(role="button" aria-labelledby="close overlay" @click="toggleOverlay" ref="close")
        Icon(color="#fff" link="cross")
    section.overlay__content
      component(:is="getOverlay.component")
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';

import Icon from './Icon';
import cross from '../assets/icons/cross.svg';
import AddToOrder from '../containers/AddToOrder';

export default {
  mounted() {
    this.$refs.close.focus();
  },

  computed: {
    ...mapGetters(['getOverlay'])
  },
  methods: {
    ...mapMutations(['toggleOverlay'])
  },

  components: {
    Icon,
    AddToOrder
  }
};
</script>


<style lang="scss">
@import '../theme';
.overlay {
  position: absolute;
  height: 100%;
  width: 100%;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  background: rgba($secondary-dark, 0.9);
  color: $secondary-text;
}

.overlay__closeButton {
  position: absolute;
  background: transparent;
  border: none;
  margin: $spacing-unit/2;
  cursor: pointer;
  z-index: 100;
  svg {
    filter: drop-shadow(-1px -1px 1px $secondary-dark);
  }
}
</style>
