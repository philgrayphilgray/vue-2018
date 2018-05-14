<template lang="pug">
v-container(v-if="loadedBoard !== null")
    v-layout(row wrap)
        v-flex(xs12)
            h2 {{loadedBoard.name}}
            //- v-text-field(v-else v-model="newBoardName")
    v-layout.board__lists(row)
        v-flex.ma-3(v-for="list in loadedBoardLists" :key="list.id")
            v-card.mr-2(light color="grey lighten-3" width="400")
                v-toolbar.primary(flat dark)
                    v-toolbar-title {{list.name}}
                    v-spacer
                    v-menu.ma-0(bottom offset-y)
                      v-btn.ma-0(flat slot="activator")
                        v-icon more_horiz
                      v-list
                        v-btn(@click="onDeleteList(list.id)")
                          v-icon delete
                          | Delete
                v-container
                    v-layout(row wrap)
                        //- Card
                        v-card-actions.pa-0
                        v-btn(flat block) Add a card...
        v-flex.ma-3
            v-btn(flat @click.stop="onOpenDialog") Add a list...
        v-dialog(v-model="dialog" max-width="300px")
            v-card
                v-card-text
                    v-text-field(
                      name="newListName"
                      label="New List Name"
                      id="newListName"
                      v-model="newListName"
                      ref="newListName"
                      @keyup.enter="onCreateNewList"
                      @keyup.esc="onCancelDialog"
                      )
                v-card-actions
                    v-btn.red( @click="onCancelDialog" flat) Cancel
                    v-btn.green( @click="onCreateNewList" flat) Save
            
</template>
<script>
import Card from './Card';

export default {
  components: {
    Card,
  },
  data() {
    return {
      newListName: '',
      dialog: false,
      editingBoardName: false,
      newBoardName: '',
    };
  },
  methods: {
    onOpenDialog() {
      this.dialog = true;
      this.$nextTick(() => {
        this.$refs.newListName.focus();
      });
    },
    onCreateNewList() {
      this.dialog = false;
      this.$store.dispatch('createNewList', {
        name: this.newListName,
        idBoard: this.loadedBoard.id,
      });
      this.newListName = '';
    },
    onDeleteList(idList) {
      this.$store.dispatch('deleteList', { idList });
    },
    onCancelDialog() {
      this.dialog = false;
      this.newListName = '';
    },
  },
  computed: {
    loadedBoard() {
      return this.$store.getters.loadedBoard;
    },
    userBoards() {
      return this.$store.getters.userBoards.length > 0;
    },
    loadedBoardLists() {
      return this.$store.getters.loadedBoardLists(this.$route.params.boardId);
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
<style lang="scss" scoped>
.board {
  position: relative;
}

.board__lists {
  overflow-x: auto;
}
</style>
