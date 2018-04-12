<template lang="pug">
svg(:fill="color" :height="size" :width="size")
    use(:xlink:href="link")
</template>
<script>
// Use: Icon(color="#fff" link="#plus" size="24")
// Import Icon component and icon to use:
import plus from '~/assets/icons/plus.svg';
export default {
  props: {
    size: {
      type: String,
      default: '24'
    },
    color: {
      type: String,
      default: '#000'
    },
    link: {
      type: String,
      default: '#plus'
    }
  }
};
</script>
