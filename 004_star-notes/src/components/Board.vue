<template lang="pug">
v-container.board(fluid)
    v-layout(row)
        v-flex.ma-3(v-for="list in board.lists" :key="list.id")
            v-card.mr-2(light color="grey lighten-3" width="400")
                v-toolbar.primary(flat dark)
                    v-toolbar-title {{list.name}}
                    v-spacer
                    v-btn(flat)
                        v-icon more_horiz
                v-container
                    v-layout(row wrap)
                        DemoCard(v-for="card in listCards(list.id)" :card="card" :key="card.id")
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
                      @keyup.enter="onCreateNewDemoList"
                      @keyup.esc="onCancelDialog"
                      )
                v-card-actions
                    v-btn.red( @click="onCancelDialog" flat) Cancel
                    v-btn.green( @click="onCreateNewDemoList" flat) Save
                                                                             

</template>
<script>
import DemoCard from './DemoCard';

export default {
  // eslint-disable-next-line
  props: ['board'],
  components: {
    DemoCard,
  },
  data() {
    return {
      newListName: '',
      dialog: false,
    };
  },
  computed: {
    listCards() {
      return listId => this.$store.getters.getDemoListCardsByListId(listId);
    },
  },
  methods: {
    onOpenDialog() {
      this.dialog = true;
      this.$nextTick(() => {
        this.$refs.newListName.focus();
      });
    },
    onCreateNewDemoList() {
      this.dialog = false;
      this.$store.commit('createNewDemoList', this.newListName);
      this.newListName = '';
    },
    onCancelDialog() {
      this.dialog = false;
      this.newListName = '';
    },
  },
};
</script>
<style lang="scss" scoped>
.board {
  overflow-x: auto;
}
</style>
