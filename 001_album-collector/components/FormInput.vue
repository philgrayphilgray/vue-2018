<template lang="pug">
.formInput
    label.formInput__label.--sr-only(:for="inputName") {{capitalizedInputName}}
    input.formInput__input(:id="inputName" :name="inputName" :placeholder="capitalizedInputName" v-model="inputValue" @keyup="changeHandler")
</template>

<script>
export default {
  props: ["inputName", "currentValue"],
  data() {
    return {
      inputValue: ""
    };
  },
  beforeMount() {
    if (this.currentValue) {
      this.inputValue = this.currentValue;
    }
  },
  computed: {
    capitalizedInputName() {
      const [firstLetter, ...otherLetters] = this.inputName;
      return firstLetter.toUpperCase() + otherLetters.join("");
    }
  },
  methods: {
    changeHandler() {
      this.$emit("change", {
        input: this.inputName,
        inputValue: this.inputValue
      });
    }
  }
};
</script>

<style scoped>
.formInput {
  margin-bottom: 1em;
}
.formInput > * {
  display: block;
  margin: 0.5em 0;
}

.formInput__input {
  border-radius: 2px;
  padding: 1em 0.75em 0.6875em;
  width: 100%;
  background-color: #fff;
  border: 1px solid #dfe0e6;
  color: #1c1c1f;
  font-size: 0.9375em;
  line-height: normal;
  margin: 0;
}
</style>
