<template lang="pug">
.addToOrder
    //- img.addToOrder__image(:src="require(`~/assets/images/${selectedItem.image}.jpg`)" :alt="selectedItem.label")
    header.addToOrder__header(:style="{backgroundImage: `url(${require('~/assets/images/' + selectedItem.image + '.jpg')})`}")
    .addToOrder__content
        .addToOrder__heading
            h2 {{selectedItem.label}}
            p Our signature...
        form.addToOrder__form(@submit.prevent)
            .addToOrderForm__input
                label(for="size") Size
                select#size(v-model="size")
                    option(value ="small") Small
                    option(value ="medium") Medium
                    option(value ="large") Large
            .addToOrderForm__input
                label(for="quantity") Quantity
                input#quantity(type="number" min="1" v-model="quantity")
                .addToOrderForm__buttonGroup
                    button(@click="decreaseQuantity")
                        Icon(link="minus" color="#fff")
                    button(@click="increaseQuantity")
                        Icon(link="plus" color="#fff")
            .addToOrderForm__input
                label(for="room") Room for cream or sugar?
                input#room(type="checkbox" v-model="room")
            Button Add to Order



</template>
<script>
import { mapGetters } from 'vuex';
import Button from '../components/Button';
import Icon from '../components/Icon';
import plus from '../assets/icons/plus.svg';
import minus from '../assets/icons/minus.svg';
export default {
  components: {
    Button,
    Icon
  },
  data() {
    return {
      size: 'medium',
      quantity: 1,
      room: false
    };
  },
  computed: {
    ...mapGetters(['getMenu', 'getSelectedIndex']),
    selectedItem: function() {
      return this.getMenu[this.getSelectedIndex];
    }
  },
  methods: {
    increaseQuantity: function() {
      this.quantity += 1;
    },
    decreaseQuantity: function() {
      if (this.quantity === 1) return;
      this.quantity -= 1;
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

.addToOrder__form {
  background-color: $primary-dark;
  color: $primary-text;
  padding: $spacing-unit 0;
}

.addToOrderForm__input {
  padding: $spacing-unit;
  text-align: center;
  [type='number'] {
    width: $spacing-unit * 2;
  }

  label {
    margin-right: $spacing-unit;
  }
}
.addToOrderForm__buttonGroup {
  margin-left: $spacing-unit;
  display: inline-block;
}
</style>
