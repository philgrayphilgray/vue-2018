<template lang="pug">
  v-dialog(width="350px" persistent v-model="editDialog")
    v-btn(fab accent slot="activator")
        v-icon edit
    v-card
      v-container
        v-layout(row wrap)
          v-flex(xs12)
            v-card-title Edit Meetup
        v-divider
        v-layout(row wrap)
          v-flex(xs12)
            v-card-text
              v-text-field(name="title" label="Title" id="title" v-model="editedTitle"  required)
              v-text-field(name="location" label="Location" id="location" v-model="editedLocation" required)
              v-text-field(multi-line name="description" label="Description" v-model="editedDescription" id="description" )
        v-divider
        v-layout(row wrap)
          v-flex(xs12)
            v-card-actions
              v-btn.blue--text.darken-1(flat @click="editDialog = false") Close
              v-btn.blue--text.darken-1(flat @click="onSaveChanges") Save
</template>
<script>
export default {
  // eslint-disable-next-line
  props: ['meetup'],
  data() {
    return {
      editDialog: false,
      editedTitle: this.meetup.title,
      editedLocation: this.meetup.location,
      editedDescription: this.meetup.description
    };
  },
  methods: {
    onSaveChanges() {
      if (this.editedTitle.trim() === '' || this.editedLocation.trim() === '') {
        return;
      } else {
        this.$store.dispatch('updateMeetupData', {
          id: this.meetup.id,
          title: this.editedTitle,
          location: this.editedLocation,
          description: this.editedDescription
        });
        this.editDialog = false;
      }
    }
  }
};
</script>
