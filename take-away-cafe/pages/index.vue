<template lang="pug">
.container
  header(role="navigation").appHeader
    .appHeader__container
      nuxt-link(to="/").appHeader__link
        h1.appHeader__title Take Away Café
  main.appMain
    Stepper(v-bind="{steps, stepperNextHandler, currentIndex}")
</template>
<script>
import { mapGetters } from 'vuex';

import Stepper from '../containers/Stepper';

export default {
  components: {
    Stepper
  },

  computed: {
    ...mapGetters({
      currentIndex: 'currentStep',
      steps: 'getSteps'
    })
  },
  methods: {
    stepperNextHandler() {
      return this.$store.dispatch('nextStep', 'next');
    }
  }
};
</script>

<style lang="scss">
@import '../theme';
.appHeader {
  background: $primary-dark;
  padding: $spacing-unit 0;
}
.appHeader__container {
  background: $primary;
  color: $primary-text;
  text-align: center;
  padding: $spacing-unit/2;
}

.appHeader__link {
  text-decoration: none;
  color: $primary-text;
}

.appHeader__title {
  font-weight: 900;
}
</style>
