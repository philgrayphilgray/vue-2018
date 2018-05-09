<template lang="pug">
v-layout(row)
    v-flex(xs12 sm6 offset-sm3)
        v-card
            v-toolbar(color="cyan" dark)
                v-toolbar-side-icon
                v-toolbar-title Deck
                v-spacer
                v-btn(icon)
                    v-icon search
            v-list(two-line)
                draggable(v-model="list")
                    template(v-for='(item, index) in list')
                        v-list-tile( :key='item.title', @click='')
                            v-list-tile-content
                                v-list-tile-title {{item.title}}
                                v-edit-dialog(:return-value.sync="item.title"  lazy) {{item.title}}
                                    v-text-field(slot="input" @keyup.enter="$store.commit('updateItems')" v-model="item.title" label="Edit" single-line counter)
                v-list-tile
                    v-list-tile-content
                        v-btn(icon).mx-auto(@click="$store.commit('addItem')")
                            v-icon add
</template>
<script>
import draggable from "vuedraggable";
export default {
  components: {
    draggable
  },
  computed: {
    list: {
      get() {
        return this.$store.state.items;
      },
      set(value) {
        this.$store.commit("updateItems", value);
      }
    }
  }
};
</script>
