<template lang="pug">
section
  v-jumbotron(color="grey lighten-2")
    v-container(fill-height)
      <v-layout align-center>
        v-flex.text-xs-center
          h3.display-3 StarNotes
          span.subheading A Github Star Explorer Made with Vue, Vuetify, and Firebase
          v-divider.my-3
          .title.mb-3 Sign in with Github to Get Started!
          v-btn.mx-0(large color="primary") 
            v-icon(left) fa-github
            |  Sign In
      </v-layout>
</template>
