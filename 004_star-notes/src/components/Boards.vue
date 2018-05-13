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
        v-flex(xs12  md3 v-for="board in userBoards" :key="board.id" @click.stop="onClickUserBoard(board.id)").ma-1
            v-card.userBoards__board(dark).primary
                v-container
                    v-card-title
                        h3 {{ board.name }}
        v-flex(xs12  md3).ma-3
            v-btn.primary.lighten-1(fab dark @click.stop="onOpenDialog")
                v-icon(dark) add
    v-dialog(v-model="dialog" max-width="300px")
        v-card
            v-card-text
                v-text-field(
                    name="newBoardName"
                    label="New Board Name"
                    id="newBoardName"
                    v-model="newBoardName"
                    ref="newBoardName"
                    @keyup.enter="onCreateNewBoard"
                    @keyup.esc="onCancelDialog"
                    )
            v-card-actions
                v-btn.red( @click="onCancelDialog" flat) Cancel
                v-btn.green( @click="onCreateNewBoard" flat) Save                
</template>

<script>
export default {
  // created() {
  //   this.$store.dispatch('loadUserBoards');
  // },
  data() {
    return {
      newBoardName: '',
      dialog: false,
    };
  },
  computed: {
    loading() {
      return this.$store.getters.loading;
    },
    userBoards() {
      return this.$store.getters.userBoards;
    },
  },
  methods: {
    onOpenDialog() {
      this.dialog = true;
      this.$nextTick(() => {
        this.$refs.newBoardName.focus();
      });
    },
    onCreateNewBoard() {
      this.dialog = false;
      this.$store.dispatch('createNewBoard', this.newBoardName);
      this.newBoardName = '';
    },
    onCancelDialog() {
      this.dialog = false;
      this.newBoardName = '';
    },
    onClickUserBoard(boardId) {
      this.$store.dispatch('setUserLoadedBoard', boardId);
      this.$router.push(`/b/${boardId}`);
    },
  },
};
</script>

<style lang="scss" scoped>
.userBoards__title {
  display: flex;
}
.userBoards__board {
  cursor: pointer;
}
</style>
