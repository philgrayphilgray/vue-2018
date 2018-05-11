<template lang="pug">
  v-container
    v-layout(row wrap v-if="loading")
      v-flex.text-xs-center(xs12)
        v-progress-circular.primary--text(indeterminate :width="7" :size="70")    
    v-layout(row wrap v-else)
        v-flex(xs12)
            v-card
                v-card-title 
                    h3.primary--text {{meetup.title}}
                    template(v-if="true")
                      v-spacer
                      app-edit-meetup-details-dialog(v-if="userIsCreator" :meetup="meetup")
                v-card-media(:src="meetup.imageUrl" height="400px")
                v-card-text
                    p.info--text {{meetup.date | date}} - {{meetup.location}}
                    p {{meetup.description}}
                v-card-actions
                    v-spacer
                    app-register-dialog(:meetupId="id" v-if="userIsAuthenticated && !userIsCreator")
</template>

<script>
export default {
  // eslint-disable-next-line
  props: ['id'],
  computed: {
    meetup() {
      return this.$store.getters.loadedMeetup(this.id);
    },
    userIsAuthenticated() {
      return (
        this.$store.getters.user !== null &&
        this.$store.getters.user !== undefined
      );
    },
    userIsCreator() {
      if (!this.userIsAuthenticated) {
        return false;
      }
      return this.$store.getters.user.id === this.meetup.creatorId;
    },
    loading() {
      return this.$store.getters.loading;
    }
  }
};
</script>
