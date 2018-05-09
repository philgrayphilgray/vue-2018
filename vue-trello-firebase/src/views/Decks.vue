<template lang="pug">
h2 Decks
  CardList(:items="getItems")
</template>
<script>
import { mapGetters } from "vuex";
import CardList from "../components/CardList";
export default {
  computed: {
    ...mapGetters(["getItems"])
  },
  components: {
    CardList
  }
};
</script>
