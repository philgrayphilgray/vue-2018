<template lang="pug">
v-container.mt-3
  v-layout(row)
    v-flex(xs12 md6 offset-md3)
      v-card
        v-card-text
          v-container
            form(@submit.prevent="onSignup")
              v-layout(row)
                v-flex(xs12)
                  v-text-field(name="email" label="Email" id="email" v-model="email" type="email" required)
              v-layout(row)
                v-flex(xs12)
                  v-text-field(name="password" label="Password" id="password" v-model="password" type="password" required)
              v-layout(row)
                v-flex(xs12)
                  v-text-field(name="confirmPassword" label="Confirm Password" id="confirmPassword" v-model="confirmPassword" type="password" :rules="[comparePasswords]")
              v-layout(row)
                v-flex(xs12)
                  v-btn(type="submit") Sign up
</template>

<script>
export default {
  data() {
    return {
      email: '',
      password: '',
      confirmPassword: ''
    };
  },
  computed: {
    comparePasswords() {
      return this.password !== this.confirmPassword
        ? 'Passwords fo not match.'
        : '';
    },
    user() {
      return this.$store.getters.user;
    }
  },
  watch: {
    user(value) {
      if (value !== null && value !== undefined) {
        this.$router.push('/');
      }
    }
  },
  methods: {
    onSignup() {
      // Vuex
      this.$store.dispatch('signUserUp', {
        email: this.email,
        password: this.password
      });
    }
  }
};
</script>
