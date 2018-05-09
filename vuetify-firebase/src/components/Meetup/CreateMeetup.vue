<template lang="pug">
v-container
  v-layout(row)
    v-flex(xs12 sm6 offset-sm3)
      h2.primary--text Create a new meetup
  v-layout(row)
    v-flex(xs12)
      form(@submit.prevent="onCreateMeetup")
        v-layout(row)
          v-flex(xs12 sm6 offset-sm3)
            v-text-field(name="title" label="Title" id="title" v-model="title" required)
        v-layout(row)
          v-flex(xs12 sm6 offset-sm3)
            v-text-field(name="location" label="Location" id="location" v-model="location" required)
        v-layout(row)
          v-flex(xs12 sm6 offset-sm3)
            img.image__preview(:src="imageUrl" )
        v-layout(row)
          v-flex(xs12 sm6 offset-sm3)
            v-text-field(name="imageUrl" label="Image Url" id="image-url" v-model="imageUrl" required)
        v-layout(row)
          v-flex(xs12 sm6 offset-sm3)
            v-text-field(multi-line name="description" label="Description" v-model="description" id="description" )
        v-layout(row).mb-3
          v-flex(xs12 sm6 offset-sm3)
            h4 Choose a date & Time
        v-layout(row wrap justify-center align-center)
          v-flex(xs12  text-xs-center )
            v-date-picker(v-model="date" landscape )
          v-flex(xs12  text-xs-center )
            v-time-picker(v-model="time"  landscape)
        v-layout.mt-3(row)
          v-flex(xs12 sm6 offset-sm3 text-xs-center)
            v-btn.primary(:disabled="!formIsValid" type="submit") Create Meetup
</template>

<script>
import moment from 'moment';
export default {
  data() {
    return {
      title: '',
      location: '',
      imageUrl: '',
      description: '',
      date: '',
      time: new Date()
    };
  },
  computed: {
    formIsValid() {
      return this.title !== '' && this.location !== '' && this.imageUrl !== '';
    },
    submittableDateTime() {
      const date = moment(this.date);

      const hours = this.time.match(/^(\d+)/)[1];
      const minutes = this.time.match(/:(\d+)/)[1];
      date.hours(hours);
      date.minutes(minutes);

      return date.toISOString(true);
    }
  },
  created: function() {
    const dateTime = moment();
    this.date = dateTime.format('YYYY-MM-DD');
    this.time = dateTime.format('HH:mm');
  },
  methods: {
    onCreateMeetup() {
      if (!this.formIsValid) return;
      const meetupData = {
        title: this.title,
        location: this.location,
        imageUrl: this.imageUrl,
        description: this.description,
        date: this.submittableDateTime
      };
      this.$store.dispatch('createMeetup', meetupData);
      this.$router.push('/meetups');
    }
  }
};
</script>

<style  scoped>
.image__preview {
  max-width: 100%;
  height: auto;
}
</style>

