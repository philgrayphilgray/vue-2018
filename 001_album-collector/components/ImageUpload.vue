<template lang="pug">
.imageUpload
  label.imageUpload__label.--sr-only(for="fileInput") Upload an album cover
  input.imageUpload__input.--sr-only(type="file" ref="fileInput" @change="onFileSelected")
  .imageUpload__container(@click="changeImage")
    .imageUpload__dragArea(@mouseleave="dontChangeImage" v-if="show" @click="$refs.fileInput.click()")
      .imageUpload__dragContent(aria-relevant)
        img.imageUpload__icon(src="~/assets/svg/cloud-upload.svg")
        ProgressBar(:percentage="percentage" :upload="upload")
        .imageUpload__status
          p(v-if="upload")
            strong One moment...
            |
            span(v-if="percentage>25")   Almost there!
          p(v-else) 
            |
            strong Click
            |  to upload an image.
            
    img.imageUpload__image(:src="albumArt")
</template>
<script>
import axios from "axios";
import ProgressBar from "./ProgressBar";
export default {
  components: {
    ProgressBar
  },
  props: ["albumArt"],
  data() {
    return {
      art: "",
      upload: null,
      percentage: 0,
      show: true
    };
  },
  beforeMount() {},
  methods: {
    onFileSelected: function(e) {
      this.upload = e.target.files[0];
      this.onUpload();
    },
    changeImage() {
      if (this.art) {
        this.show = true;
      }
    },
    dontChangeImage() {
      if (this.art) {
        this.show = false;
      }
    },
    onUpload() {
      const uploadFileFunction = process.env.UPLOAD_FILE_FUNCTION;
      const fd = new FormData();
      fd.append("file", this.upload, this.upload.name);
      axios
        .post(uploadFileFunction, fd, {
          onUploadProgress: uploadEvent => {
            console.log(uploadEvent);
            this.percentage = Math.round(
              uploadEvent.loaded / uploadEvent.total * 100
            );
          }
        })
        .then(res => {
          this.art = res.data.url[0];
          if (this.art) {
            this.changeHandler(this.art);
          }
        });
    },
    changeHandler(uploadUrl) {
      this.$emit("uploaded", { url: uploadUrl });
      this.upload = null;
      this.percentage = 0;
      this.show = false;
    }
  }
};
</script>

<style>
.imageUpload__container {
  position: relative;
  margin: 1em auto;
  height: 300px;
  width: 300px;
  background: #ccc;
  display: flex;
  align-items: center;
  justify-content: center;
}
.imageUpload__input:focus + .imageUpload__container {
  outline: -webkit-focus-ring-color auto 5px;
}
.imageUpload__image {
  max-width: 100%;
  height: auto;
  position: absolute;
  z-index: 10;
}

.imageUpload__dragArea {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 250px;
  width: 250px;
  background: rgba(221, 221, 221, 0.303);
  border: 3px dashed rgb(221, 221, 221);
  cursor: pointer;
  z-index: 11;
}

.imageUpload__dragArea:hover {
  background: rgba(221, 221, 221, 0.503);
}
.green-border {
  border: 2px solid green;
}

.imageUpload__dragContent {
  width: 200px;
}
.imageUpload__icon {
  flex-basis: 100%;
}
</style>
