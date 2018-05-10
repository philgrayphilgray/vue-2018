<template lang="pug">
  v-alert(dismissible @input="onClose" :value="true" type="error") {{text}}
</template>

<script>
export default {
  props: { text: { type: String, default: '' } },
  methods: {
    onClose() {
      this.$emit('dismissed');
    }
  }
};
</script>


