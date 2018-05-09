<template lang="pug">
  v-container
    v-layout(row wrap)
        v-flex(xs12)
            v-card
                v-card-title 
                    h3.primary--text {{meetup.title}}
                v-card-media(:src="meetup.imageUrl" height="400px")
                v-card-text
                    p.info--text {{meetup.date | date}} - {{meetup.location}}
                    p {{meetup.description}}
                v-card-actions
                    v-spacer
                    v-btn.primary Register
</template>

<script>
export default {
  // eslint-disable-next-line
  props: ['id'],
  computed: {
    meetup() {
      return this.$store.getters.loadedMeetup(this.id);
    }
  }
};
</script>
