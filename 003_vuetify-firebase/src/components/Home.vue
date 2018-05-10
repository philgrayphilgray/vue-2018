<template lang="pug">
v-container
  v-layout.mb-2(row wrap)
    v-flex.text-sm-right(xs12 sm6)
      v-btn.primary(large to="/meetups") Explore meetups
    v-flex.text-xs-center.text-sm-left(xs12 sm6)
      v-btn.primary(large to="/meetup/new") Organize meetup
  v-layout(row wrap )
    v-flex.text-xs-center(xs12)
      v-progress-circular.primary--text(indeterminate :width="7" :size="70" v-if="loading")    
  v-layout(row wrap v-if="!loading")
    v-flex(xs12)
      v-carousel(style="cursor:pointer;")
        v-carousel-item(
          v-for="(meetup, i) in meetups" 
          :src="meetup.imageUrl" 
          :key="meetup.id"
          @click.native.stop="onLoadMeetup(meetup.id)")
          .meetup_title {{meetup.title}}
  v-layout.mt-2(row wrap)
        v-flex.text-xs-center(xs12)
          p Join our awesome meetups.
</template>
<script>
export default {
  computed: {
    meetups() {
      return this.$store.getters.featuredMeetups;
    },
    loading() {
      return this.$store.getters.loading;
    }
  },
  methods: {
    onLoadMeetup(id) {
      console.log('clicked');
      this.$router.push('/meetups/' + id);
    }
  }
};
</script>
<style scoped>
.meetup_title {
  position: absolute;
  width: 100%;
  text-align: center;
  bottom: 50px;
  background-color: rgba(0, 0, 0, 0.5);
  color: #fff;
  font-size: 2em;
  padding: 20px;
}
</style>

