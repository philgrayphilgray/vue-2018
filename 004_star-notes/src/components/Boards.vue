<template lang="pug">
v-container
    v-layout(row wrap v-if="loading")
        v-flex.text-xs-center(xs12)
            v-progress-circular.primary--text(indeterminate :width="7" :size="70")
    v-layout(row wrap v-else).mb-3
        v-flex(xs12)
            .userBoards__title
                v-icon(right) dashboard
                h2.ml-2 User Boards
    v-layout(row wrap)
        v-flex(xs12  md3).ma-1
            v-card(dark).primary
                v-container
                    v-card-title
                        h3 board 1
        v-flex(xs12  md3).ma-1
            v-card(dark).primary
                v-container
                    v-card-title
                        h3 board 2
        v-flex(xs12  md3).ma-3
            v-btn.primary.lighten-1(fab dark)
                v-icon(dark) add
</template>

<script>
export default {
  data() {
    return {
      userBoards: [],
    };
  },
  computed: {
    loading() {
      return this.$store.getters.loading;
    },
  },
};
</script>

<style lang="scss" scoped>
.userBoards__title {
  display: flex;
}
</style>
