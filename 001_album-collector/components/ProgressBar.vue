<template lang="pug">
.progressBar(v-if="upload")
    .progressBar__inner(:style="{width: percentage + '%'}")
</template>
<script>
export default {
  props: ["percentage", "upload"]
};
</script>

<style>
.progressBar {
  position: relative;
  margin: 1em 0;
  width: 100%;
  height: 20px;
  border: 1px solid #555;
  background: #fff;
  overflow: hidden;
}
.progressBar__inner {
  position: absolute;
  background: rgb(46, 140, 88);
  width: 0%;
  height: 20px;
  transition: all 1s ease-in;
}
</style>

