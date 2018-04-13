<template lang="pug">
.addToOrder
    //- img.addToOrder__image(:src="require(`~/assets/images/${selectedItem.image}.jpg`)" :alt="selectedItem.label")
    header.addToOrder__header(:style="{backgroundImage: `url(${require('~/assets/images/' + selectedItem.image + '.jpg')})`}")
    .addToOrder__content
        .addToOrder__heading
            h2 {{selectedItem.label}}
            p Our signature...

</template>
<script>
import { mapGetters } from 'vuex';
export default {
  computed: {
    ...mapGetters(['getMenu', 'getSelectedIndex']),
    selectedItem: function() {
      return this.getMenu[this.getSelectedIndex];
    }
  }
};
</script>
<style lang="scss">
@import '../theme.scss';
.addToOrder {
  position: absolute;
  width: 100%;
}
.addToOrder__content {
  position: relative;
}

.addToOrder__header {
  width: 100%;
  height: 376px;
  background-position: center center;
  top: 0;
  z-index: 10;
}

.addToOrder__heading {
  background-color: $primary;
  color: $secondary;
  padding: $spacing-unit;
  width: 100%;
  text-align: center;
}
</style>
