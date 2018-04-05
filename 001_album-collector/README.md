# 000_album-collector

> Nuxt.js project

## Build Setup

* Edit `.sample-env` with your cloud function URL and save as `.env`

```bash
# install dependencies
$ npm install # Or yarn install

# serve with hot reload at localhost:3000
$ npm run dev

# build for production and launch server
$ npm run build
$ npm start

# generate static project
$ npm run generate
```

For detailed explanation on how things work, checkout the [Nuxt.js docs](https://github.com/nuxt/nuxt.js).

## Create initial design prototype

* Use figma
* Mobile first
* Grayscale

![grayscale prototype of the app](https://s3.amazonaws.com/pg-image-host/github/albumcollector.gif)

## Create basic routing

* Create a dynamic route in pages for `id`

```bash
pages/
├── README.md
├── _id
│   └── edit.vue
├── index.vue
└── new
    └── index.vue
```

## Setup sample data object with Vuex

* Create a new file, `index.js` in the `store` directory
* import `vuex`
* Export `createStore` function that returns a new `Vuex.Store`, passing in the state object and any mutations

```js
import Vuex from 'vuex';

const createStore = () => {
  return new Vuex.Store({
    state: {
      albums: [
        {
          id: '1521567322',
          title: 'Space is the Place',
          artist: 'Sun Ra',
          art: 'http://',
          year: '1973',
          rating: 5
        },
        {
          id: '1521567405',
          title: 'Lanquidity',
          artist: 'Sun Ra',
          art: 'http://',
          year: '1978',
          rating: 5
        }
      ]
    },
    mutations: {
      add(state, newAlbum) {
        state.albums.push(newAlbum);
      }
    }
  });
};

export default createStore;
```

## Create Basic Components

Create the following:

* Card
* CardGrid
* Header
* Overlay
* Navigation
* FormInput

Implement:

* Create basic components and implement them in the layout and pages.
* Pass down data from the vuex `$store` as props.
* For example, the `CardGrid` will pass down the album information to each card:

```html
<template lang="pug">
  div
    .card-container
        Card(v-for="(album, index) in $store.state.albums" :album="album" :key="index")

</template>

<script>
import Card from '../components/Card';
export default {
  components: {
    Card
  }
};
```

* The card component will then display that information, transforming for display as needed (immutably, without touching the source data):

```html
<template lang="pug">
  .Card
    img(:src="album.art" :alt="'Album artwork for ' + album.title + ' by ' + album.artist")
    .card-details
      p {{album.title}}
      p {{album.artist}}
      p {{album.year}}
      span
        Star(v-for="(star, index) in stars" :power="star" :key="index")
    .card-controls
    //- controls, edit, delete icons

</template>

<script>
import Star from './Star';
export default {
  data() {
    return {
      stars: []
    };
  },
  props: ['album'],
  components: {
    Star
  },
  beforeMount() {
    this.setStars();
  },
  methods: {
    setStars() {
      for (let i = 1; i <= 5; i++) {
        if (i <= this.album.rating) {
          this.stars.push(true);
        } else {
          this.stars.push(false);
        }
      }
    }
  }
};
</script>
```

## Create the new (POST) form

* Keep the methods input change handlers on the parent component, where the form submit handler is located, and the local state lives
* Create an object in local state with all the form field values, types, and any validation rules

```html
<template lang="pug">
  div.new-form
    h1 Add New Album
    div.art-preview(v-if="newAlbum.art")
      img(:src='newAlbum.art')
    form(@submit.prevent="submitHandler")
      strong.line-through Album Details
      FormInput(v-for="(inputElement, index) in Object.keys(newAlbum)"  :inputName="inputElement" :key="inputElement" @change="inputHandler")
      button.button-submit(type="submit" role="button" aria-labelledby="Submit a new album") save
</template>


<script>
import FormInput from '../../components/FormInput';
export default {
  components: {
    FormInput
  },
  data() {
    return {
      newAlbum: {
        title: '',
        artist: '',
        art: '',
        year: '',
        rating: ''
      }
    };
  },
  methods: {
    inputHandler: function({ input, inputValue }) {
      this.newAlbum[input] = inputValue;
    },
    submitHandler(e) {
      this.$store.commit('add', this.newAlbum);
      e.target.reset();
      this.$router.push({ path: '/' });
    }
  }
};
</script>
```

* Emit events from the child form input components that send a payload of information; listen to these from the parent, using the input change handler as the callback to `@change`
* Use `v-model` to manage state locally in the child component

```html
<!-- FormInput -->
<template lang="pug">
.form-input
    label.sr-only(:for="inputName") {{capitalizedInputName}}
    input(:id="inputName" :name="inputName" :placeholder="capitalizedInputName" v-model="inputValue" @keyup="changeHandler")
</template>

<script>
export default {
  props: ['inputName'],
  data() {
    return {
      inputValue: ''
    };
  },
  computed: {
    capitalizedInputName() {
      const [firstLetter, ...otherLetters] = this.inputName;
      return firstLetter.toUpperCase() + otherLetters.join('');
    }
  },
  methods: {
    changeHandler() {
      this.$emit('change', {
        input: this.inputName,
        inputValue: this.inputValue
      });
    }
  }
};
</script>
```

#### Customize the input types

#### Implement image upload

SRC: [Vue Image Upload Made Easy
](https://www.youtube.com/watch?v=VqnJwh6E9ak)

* Create an input `type=file` element with an `@change` property that calls a method `onFileSelected(event)`
* The event object contains a `target.files` property, which is an array of all the files the user chose; the
* In the `onFileSelected` method, store this first item of the event `target.files` array to a property in local state

```js
    onFileSelected: function(e) {
      this.newAlbum.art = e.target.files[0];
    },
```

* Create a firebase cloud function
* Create a new firebase project
* Install `npm install -g firebase-tools` locally
* Sign into your firebase account from the firebase-cli tool

```bash
firebase login
```

* Login using the provided URL
* CD to the project directory and `firebase init`
* Choose `Functions`
* Install dependencies
* Install collection of functions that allows us to put data in a bucket: `npm install --save @google-cloud/storage`
* Creat a new function in `index.js`
* Require `@google-cloud/storage` and instantiate it
* Install and require `spawn` from the spawn property on `child-process-promise`
* Run `firebase deploy` inside the directory in the cli
* Create a `uploadFile` function using `functions.https.onRequest`, with the same callback parameters / syntax as an express route or middleware
* Install cors, `npm install --save cors`, and require, passing in an options object, `{origin: true}`
* Wrap the inner
* Install busboy, `npm install --save busboy` and require it
* Generate a private key to initialize cloud storage (Firebase > Settings > Service Accounts > Firebase Admin SDK > Generate new private key)

TODO: complete cloud instructions

#### move image upload to its own component

#### display progress and replace the file input with a custom upload button

* Install and import axios to handle the ajax request
* Inside the `onUpload` method, initialize a new `FormData` object (a default JS object)
* Call the append method on the FormData object, pass in a form name, selected file (from state), and the name of the file
* Add a third argument to the axios post in an options object, `onUploadProgress`
* Declare a parameter `uploadEvent` to capture the event object that's returned; this will give you access to two properties `loaded` and `total` which can be manipulated to get a percentage
* Hide the input element and instead use a file picker button
* Add a ref (`ref="fileInput"`) to the input, and style it to not display
* On the file picker button, add a `@click` property and set it to `$refs.fileInput.click()` to proxy the click

TODO: implement drag and drop, https://css-tricks.com/drag-and-drop-file-uploading/

## Create the navigation overlay

* The navigation is global and can be opened from anywhere, so it's state should be managed in the global vuex `$store`

```js
const createStore = () => {
  return new Vuex.Store({
    state: {
      navToggled: false, // overlay state
      albums: []
    },
    mutations: {
      add(state, newAlbum) {
        state.albums.push(newAlbum);
      },
      toggleNav(state) {
        state.navToggled = !state.navToggled; // toggle; plan to implement explicit open and close mutations
      }
    }
  });
};
```

* Now, the current state of the overlay is accessible from anywhere within the app with `$store.state.navToggled`
* From within a method, we can commit the mutation with `this.$store.commit('toggleNav')`

```html
<template lang="pug">
div(@keyup.esc="toggleOverlay")
    Overlay(v-if="$store.state.navToggled" :toggle="toggleOverlay")
      div(slot="navigation")
        Navigation
    header(role="banner")
        button.menu-button(@click="toggleOverlay" type="button" aria-label="Toggle navigation on" :aria-expanded="$store.state.navToggled")
          span.icon-bar
          span.icon-bar
          span.icon-bar
        .logo
          nuxt-link(to="/")
            img(src="~/assets/svg/logo.svg" alt="Album Collector")

</template>


<script>
import Overlay from '../components/Overlay';
import Navigation from '../components/Navigation';

export default {
  components: { Overlay, Navigation },

  methods: {
    toggleOverlay() {
      this.$store.commit('toggleNav');
    }
  }
};
</script>
```

### Implement tabtrapping

[vue-focus-lock](https://github.com/theKashey/vue-focus-lock)

TODO: Update: implement in a more reusable way that doesn't interfere with layout; `refs` should suffice here

## Check Accessibility and other issues

* Install lighthouse

```bash
yarn global add lighthouse
```

* With the app running in dev, run the lighthouse test suite

```bash
lighthouse http://localhost:3000 --view
```

* Read the report and address issues with your code

* Some issues with performance and best practices may be false positives because you're testing a dev build. When you're ready, close dev and start a production build; then run lighthouse

```bash
yarn run build
yarn start
lighthouse http://localhost:3000 --view
```

## Add edit and delete controls to Card

## Add edit page to Card

## Add search, filter, and sorting controls to CardGrid

## Implement transitions and animations

## TODO: Implement validation

## TODO: Add empty add card

## TODO: Theming

* TODO: Colors
* TODO: Typography
