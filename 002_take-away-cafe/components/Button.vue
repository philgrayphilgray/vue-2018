<template lang="pug">
button.button--default(role="button" @click="clickHandler()") {{buttonText}}
</template>
<script>
export default {
  props: ['buttonText', 'clickHandler']
};
</script>
<style lang="scss">
@import '../theme';
.button--default {
  width: 100%;
  font-size: 1em;
  font-weight: bold;
  padding: $spacing-unit $spacing-unit * 2;
  background: $secondary;
  color: $secondary-text;
  cursor: pointer;
}
</style>
