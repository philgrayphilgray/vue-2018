<template lang="pug">
transitionGroup.cardGrid(name="cardTransition" mode="out-in" tag="div")
  Card(v-for="(album, index) in albums" :album="album" :key="index")
</template>

<script>
import Card from "../components/Card";
export default {
  components: {
    Card
  },
  props: ["albums"]
};
</script>

<style>
.cardGrid {
  width: 100%;
  margin: 0 auto;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

.cardGrid .card {
  margin: 0.5em;
}

/* Card transition */
.cardTransition-enter-active,
.cardTransition-leave-active {
  transition: all 0.25s ease-in-out;
}

.cardTransition-enter,
.cardTransition-leave-to {
  transform: translateX(200px);
}
</style>


