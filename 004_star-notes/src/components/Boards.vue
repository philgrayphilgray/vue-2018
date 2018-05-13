<template lang="pug">
v-container
    v-layout(row wrap v-if="loading")
        v-flex.text-xs-center(xs12)
            v-progress-circular.primary--text(indeterminate :width="7" :size="70")
    v-layout(row wrap v-else)
        v-flex(xs12)
            h2 User Boards
            v-btn(fab dark)
                v-icon(dark) add
</template>

<script>
export default {
  computed: {
    loading() {
      return this.$store.getters.loading;
    },
  },
};
</script>
