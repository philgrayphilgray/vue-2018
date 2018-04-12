<template lang="pug">
.overlay
    h2 Overlay
</template>

<style lang="scss">
@import '../theme';
.overlay {
  position: absolute;
  height: 100%;
  width: 100%;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  background: $secondary-dark;
  color: $secondary-text;
}
</style>
