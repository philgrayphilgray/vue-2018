<template lang="pug">
form.newForm(@submit.prevent="submitHandler")
  ImageUpload(:albumArt="art" @uploaded="imageUploaded")
  FormInput(v-for="(inputElement, index) in Object.keys(newAlbum)" :inputName="inputElement" :key="inputElement" @change="inputHandler")
  StarRating(:rating="rating" @rated="ratingUpdated" :editable="true")
  button.newForm__submit(type="submit" role="button" aria-labelledby="Submit a new album") Save
</template>


<script>
import uniqueId from "lodash/uniqueid";

import FormInput from "../../components/FormInput";
import ImageUpload from "../../components/ImageUpload";
import StarRating from "../../components/StarRating";
export default {
  components: {
    FormInput,
    ImageUpload,
    StarRating
  },
  data() {
    return {
      art: "",
      rating: 0,
      newAlbum: {
        title: "",
        artist: "",
        year: ""
      }
    };
  },

  methods: {
    imageUploaded: function({ url }) {
      this.art = url;
    },
    ratingUpdated: function({ newRating }) {
      this.rating = newRating;
    },
    inputHandler: function({ input, inputValue }) {
      this.newAlbum[input] = inputValue;
    },
    submitHandler(e) {
      const newId =
        uniqueId().toString() + Math.round(new Date().getTime() / 1000);
      const newAlbumWithArt = {
        ...this.newAlbum,
        art: this.art,
        rating: this.rating,
        id: newId
      };
      this.$store.commit("add", newAlbumWithArt);
      e.target.reset();
      this.$router.push({ path: "/" });
    }
  }
};
</script>
<style>
.newForm {
  text-align: center;
  max-width: 800px;
  margin: 0 auto;
}

.newForm__submit {
  width: 100%;
  padding: 1em 0.25em;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  cursor: pointer;
}
</style>
