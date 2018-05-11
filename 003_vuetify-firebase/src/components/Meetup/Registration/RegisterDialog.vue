<template lang="pug">
  v-dialog(persistent v-model="registerDialog")
    v-btn.primary(slot="activator") {{userIsRegistered ? 'Unregister' : 'Register'}}
    v-card
        v-container
            v-layout(row wrap)
                v-flex(xs12)
                    v-card-title(v-if="userIsRegistered") Unregister from Meetup?
                    v-card-title(v-else) Register for Meetup?
            v-divider
            v-layout(row wrap)
                v-flex(xs12)
                    v-card-text You can always change your decision later on.
            v-layout(row wrap)
                v-flex(xs12)
                    v-card-actions
                        v-btn.red--text.darken-1(flat @click="registerDialog = false") Cancel
                        v-btn.green--text.darken-1(flat @click="onAgree") Confirm
</template>
<script>
export default {
  props: {
    meetupId: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      registerDialog: false
    };
  },
  computed: {
    userIsRegistered() {
      return (
        this.$store.getters.user.registeredMeetups.findIndex(
          meetupId => meetupId === this.meetupId
        ) >= 0
      );
    }
  },
  methods: {
    onAgree() {
      if (this.userIsRegistered) {
        this.$store.dispatch('unregisterUserFromMeetup', this.meetupId);
      } else {
        this.$store.dispatch('registerUserForMeetup', this.meetupId);
      }
    }
  }
};
</script>
