<template lang="pug">
v-container(v-if="loadedBoard !== null" )
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
                    v-menu.ma-0.list__menu(bottom offset-y)
                      v-btn.ma-0(flat slot="activator")
                        v-icon more_horiz
                      v-list
                        v-btn(@click="onDeleteList(list.id)")
                          v-icon delete
                          | Delete
                v-container
                    v-layout(row wrap)
                        Card(v-for="card in listCards(list.id)" :key="card.id" :card="card" )
                        v-card-actions.pa-0
                        v-btn(flat block @click.stop="onOpenNewCardDialog") Add a card...
                        v-dialog(v-model="newCardDialog" max-width="300px")
                          v-card
                            v-card-text
                              v-layout.mb-3(row wrap v-if="selectedRepo")
                                v-flex
                                  v-card
                                    v-card-text
                                      v-flex.text-xs-center
                                        v-avatar
                                          img(:src="selectedRepo.owner.avatar_url")
                                        h3 {{selectedRepo.name}}
                                        h4 {{selectedRepo.owner.login}}
                                      v-flex                                   
                                        p {{selectedRepo.description}}
                                  
                              v-select.input-group--focused(:items="userStarredRepos" v-model="selectedRepo" item-text="name" label="Select Starred Repo" autocomplete)
                              v-text-field(name="newCardNotes" label="Notes" v-model="newCardNotes" multi-line)
                              v-card-actions
                                v-btn.red( @click="onCancelNewCardDialog" flat) Cancel
                                v-btn.green( @click="onCreateNewCard(list.id)" flat) Save
        v-flex.ma-3
            v-btn(flat @click.stop="onOpenNewListDialog") Add a list...
        v-dialog(v-model="newListDialog" max-width="300px")
            v-card
                v-card-text
                    v-text-field(
                      name="newListName"
                      label="New List Name"
                      id="newListName"
                      v-model="newListName"
                      ref="newListName"
                      @keyup.enter="onCreateNewList"
                      @keyup.esc="onCancelNewListDialog"
                      )
                v-card-actions
                    v-btn.red( @click="onCancelNewListDialog" flat) Cancel
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
      newListDialog: false,
      newCardDialog: false,
      selectedRepo: null,
      editingBoardName: false,
      newBoardName: '',
      newCardNotes: '',
    };
  },
  methods: {
    onOpenNewListDialog() {
      this.newListDialog = true;
      this.$nextTick(() => {
        this.$refs.newListName.focus();
      });
    },
    onOpenNewCardDialog() {
      this.newCardDialog = true;
    },
    onCreateNewList() {
      this.newListDialog = false;
      this.$store.dispatch('createNewList', {
        name: this.newListName,
        idBoard: this.loadedBoard.id,
      });
      this.newListName = '';
    },
    onCreateNewCard(idList) {
      const newCard = {
        ...this.selectedRepo,
        idBoard: this.loadedBoard.id,
        idList,
        notes: this.newCardNotes,
      };
      this.$store.dispatch('createNewCard', newCard);
      this.onCancelNewCardDialog();
    },
    onDeleteList(idList) {
      this.$store.dispatch('deleteList', { idList });
    },
    onCancelNewListDialog() {
      this.newListDialog = false;

      this.newListName = '';
    },
    onCancelNewCardDialog() {
      this.newCardDialog = false;
      this.newCardNotes = '';
      this.selectedRepo = null;
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
    userStarredRepos() {
      return this.$store.getters.userStarredRepos;
    },
    listCards() {
      return listId => this.$store.getters.listCards(listId);
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

.list__menu {
  z-index: 101;
}
</style>
