<template lang="pug">
v-container(v-if="loadedBoard !== null")
    v-layout(row wrap)
        v-flex(xs12)
            h2 {{loadedBoard.name}}
</template>
<script>
export default {
  computed: {
    loadedBoard() {
      return this.$store.getters.loadedBoard;
    },
    userBoards() {
      return this.$store.getters.userBoards.length > 0;
    },
  },
  watch: {
    userBoards(state, prevState) {
      if (state && state !== prevState) {
        this.$store.dispatch('setUserLoadedBoard', this.$route.params.boardId);
      }
    },
  },
};
</script>
