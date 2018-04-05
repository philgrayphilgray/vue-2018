<template lang="pug">
form.editForm(@submit.prevent="submitHandler")
  ImageUpload(:albumArt="art" @uploaded="imageUploaded")
  FormInput(v-for="(inputElement, index) in Object.keys(selectedAlbum)" :inputName="inputElement" :currentValue="selectedAlbum[inputElement]" :key="inputElement" @change="inputHandler")
  StarRating(:rating="rating" @rated="ratingUpdated" :editable="true")
  button.editForm__submit(type="submit" role="button" aria-labelledby="Submit updated album") Save
</template>


<script>
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
      id: "",
      selectedAlbum: {
        title: "",
        artist: "",
        year: ""
      }
    };
  },

  beforeMount() {
    const { id } = this.$route.params;
    const {
      art,
      rating,
      title,
      artist,
      year
    } = this.$store.getters.findAlbumById(id)[0];
    this.art = art;
    this.rating = rating;
    this.selectedAlbum.title = title;
    this.selectedAlbum.artist = artist;
    this.selectedAlbum.year = year;
    this.id = id;
  },

  methods: {
    imageUploaded: function({ url }) {
      this.art = url;
    },
    ratingUpdated: function({ newRating }) {
      this.rating = newRating;
    },
    inputHandler: function({ input, inputValue }) {
      this.selectedAlbum[input] = inputValue;
    },
    submitHandler(e) {
      const updatedAlbum = {
        ...this.selectedAlbum,
        id: this.id,
        art: this.art,
        rating: this.rating
      };
      this.$store.commit("update", updatedAlbum);
      e.target.reset();
      this.$router.push({ path: "/" });
    }
  }
};
</script>
<style>
.editForm {
  text-align: center;
  max-width: 800px;
  margin: 0 auto;
}

.editForm__submit {
  width: 100%;
  padding: 1em 0.25em;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  cursor: pointer;
}
</style>
