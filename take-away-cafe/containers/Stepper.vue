<template lang="pug">
  .stepper
      .stepper__wrapper
        .stepper__steps
          span.stepper__step(v-for="(step, n) in steps" :class="n <= currentIndex ? '--active' : null")
            hr.stepper__line(v-if="n !== 0")
            svg(viewbox="0 0 24 24" height="24" width="24").stepper__circle
              circle(cx="12" cy="12" r="10")
              text(x="12" y="16" text-anchor="middle" font-size="12" fill="#fff") {{n + 1}}
        .stepper__link
          a(href="#" @click="$store.commit('resetSteps')") Start over?
      component(:is="steps[currentIndex].component")            
      Button(:buttonText="steps[currentIndex].nextLabel" :clickHandler="stepperNextHandler")
      
</template>

<script>
import Menu from '../containers/Menu';
import Order from '../containers/Order';
import Pickup from '../containers/Pickup';
import Button from '../components/Button';
export default {
  components: {
    Menu,
    Order,
    Pickup,
    Button
  },
  props: {
    steps: {
      type: Array,
      default: function(){
        return [ {
          label: '',
          active: false,
          nextLabel: '',
          component: ''
        }];
      }
    },
    stepperNextHandler: {
      type: Function, 
      default: function(){
        console.log('`stepperNextHandler` not received.')
      }
    },
    currentIndex: {
      type: Number,
      default: 0
    }
  },


};
</script>
<style lang="scss" scoped>
@import '../theme';


.stepper__nextButton {

}

.stepper__wrapper{
    background: $primary;
    padding: $spacing-unit 0;
}

.stepper__steps {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

.stepper__step {
  display: flex;
  justify-content: center;
  align-items: center;

  .stepper__circle {
    circle {
      fill: $primary;
      stroke: $secondary;
      transition: fill 0.2s ease;
    }

    text {
      fill: $primary-text;
    }
  }
  .stepper__line {
    background: $primary;
    transition: background 0.2s ease;
  }

  &.--active >  {
    .stepper__circle {
      text {
        fill: $secondary-text;
      }
      circle {
        fill: $secondary;
      }
      .stepper__line {
        background: $secondary;
      }
    }
    .stepper__line {
      background: $secondary;
    }
  }
}
.stepper__line {
  align-self: center;
  height: $spacing-unit/2;
  justify-self: center;
  width: $spacing-unit * 3;
}

.stepper__link{
  display: block;
  width: 100%;
  text-align: center;

  a{
    color: $secondary-light;
  }
}
</style>
