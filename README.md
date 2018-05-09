## Notes from Introduction to Vue.js

Source: [Introduction to Vue.js](https://frontendmasters.com/courses/vue/)

[Sarah Drasner's Demos and Workshop Materials](https://github.com/sdras/intro-to-vue)

### Vue Instance

### Directives

### Methods

### Computed Properties

### Watchers

Watchers are good for asynchronous updates, updates/transitions with data changes

```js
data(){
    return {
        bottom: false,
        beers: []
    }
}
watch: {
    bottom(bottom){
        this.addBeer();
    }
}
```

* Watch method has to be one of the properties
* Access to new value and old value

```js
watch: {
    watchedProperty (value, oldValue){
        //
    }
}
```

* Can also access nested values with 'deep'

```js
watch: {
    watchedProperty {
        deep: true,
        nestedWatchedProperty (value, oldValue){
            //
        }
    }
}
```

* Use case: replace D3 with Vue. Vue plays nicely with SVG and watchers can be used to change and transition between data sets and views.

### Props

* Props are named on the component `props: ['text', 'result']`
* Can set types and validation on props

```js
props: {
    text: [String, Number]
}

props: {
    text: {
        type: String,
        required: true,
        default: 'Empty'
    }
}
```

* Objects and arrays need their defaults to be returned from a function

```js
text: {
    type: Object,
    default: function(){
        return { message: 'Empty'}
    }
}
```

* Use v-bind or : to dynamically bind props to data on the parent
* Data should always be returned as a function
* camelCasing is converted

### Components

* using `is` property and a template literal

```html
Vue.component('individual-comment', {
    template: `<li> {{ commentpost }} </li>`,
    props: ['commentpost']
});

<li
    is="individual commment"
    v-for="comment in comments"
    :commentpost="comment">
</li>
```

* using script template and an id

```js
Vue.component('individual-comment', {
    template: '#comment-template',
    props: ['commentpost']
});

<script type="text/x-template" id="comment-template">
    <li>
        <p class="post-comment">{{ commentpost.text}} </p>
    </li>
</script>
```

* Single file components with import/export

```html
<template>
    <div>
        <Child />
    </div>
</template>

<script>
import Child from './components/Child.vue';

export default {
    components: {
        Child
    },
    name: 'app',
    data(){
        return {}
    }
}
</script>
```

### Communicating Events

* use `$emit` to report a child's activity to the parent

TODO: add example

### Slots

* Similar to `{props.children}` in React
* You can have defaults

```html
// Inside the parent

<h1 slot="headerinfo">Populates the headerinfo slot</h1>

// Child
<div>
<slot name="header"></slot>
</div>
```

### Keep-Alive

### Vue-Cli

```
> vue-cli init webpack-simple project-name
```

### Lifecycle Hooks

* Lifecycle hooks auto-bind to the instance

* beforeCreate: observe data and init events
* created: template options and render
* beforeMount: create virtual DOM el and replace 'el' with it
* mounted
* beforeUpdate: virtual DOM rerender and patch
* updated
* active: keep-alive component reactivated
* deactivated
* beforeDestroy: teardown watchers, child components, event listeners
* destroyed

### Nuxt

* Automatic Code splitting
* Server-Side Rendering
* Write Vue files to create pages

* Nuxt creates the index.html file with the `nuxt.config.js` file
* Builds a page and route for anything in the `pages` directory

### Transitions

* Wrap child component in a transition component

```html
<transition name="fade">
    <app-child v-if="isShowing" class="modal">
        <button @click="toggleShow">
            Close
        </button>
    </app-child>
</transition>
```

* Vue assigns class transition name to the component, appended with `-enter`, `-enter-active`, `-enter-to`, `leave`, `-leave-active`, `-leave-to`, depending on the component lifecycle.

```js
.fade-enter-active, .fade-leave-active{
    transition: opacity 0.25s ease-out;
}

.fade-enter, .fade-leave-to{
    opacity: 0;
}
```

### Animations

* For animations, assign classes to `enter-active-class` and `leave-active-class` props on the transition component

```html
<template>
<transition
    name="ballmove"
    enter-active-class="bouncein"
    leave-active-class="rollout">
    <app-child />
</transition>
</template>

<style>

@keyframe bouncein{
    10% {....} // TL;DW
    30% {...} // TL;DW
}

.bouncein{
    animation: bouncein 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
}

.ballmove-enter{
    transform: translate3d(0, -400px, 0)
}

</style>
```

### Transition Modes

* Specify an order for operations by setting the `mode` prop on the transition component to `in-out` or `out-in`, usually `out-in`

```html
<template>
<transition name="flip" mode="out-in">
    <slot v-if="!isShowing"></slot>
    <img v-else src="http://...." />
</transition>
</template>

<style>
.flip-enter-active{
    transition: all .2s ease-in;
}

.flip-leave-active {
    transition: all .25s ease-out;
}

.flip-enter, .flip-leave-to{
    transform: scaleY(0) translateZ(0);
    opacity: 0;
}
</style>
```

### Using transition hooks for animations with JS

* Can be used to work with external libraries like Greensock
* Use hooks and supply them with custom names
* Set `:css` to false
* Create methods for the custom names

```html
<template>
<transition
    @before-enter="beforeEnter"
    @enter="enter"
    @after-enter="afterEnter"
    @enter-cancelled="enterCancelled"

    @before-leave="beforeLeave"
    @leave="leave"
    @after-leave="afterLeave"
    @leave-cancelled="leaveCancelled"
    :css="false">
    // component
</transition>
</template>

<script>

methods: {
    enter(el, done){
        //entrance animation
        done();
    },
    leave(el, done){
        //exit animation
        done();
    }
}

</script>
```

With greensock, pass in the done

```js
tl = new TimelineMax({ onComplete: done });
```

### Page Transitions with Nuxt

* Nuxt provides `.page-enter-active`, `.page-leave-active`, `page-enter`, `.page-leave-active`, and other transition classes for every page.

* For page-specific transitions, name the transition in the the page component, and that name will be appended with `-enter-active`, etc.

```js
<script>
export default {
    transition: 'fadeOpacity'
}
</script>
```

* To use the hooks in JS, include methods in transition property of the page component

```js
<script>
export default {
    transition: {
        mode: 'out-in',
        css: false,
        beforeLeave (el){
            console.log('before leave');
        }
        leave (el, done){
            console.log('about to leave');
            done();
        }
        beforeEnter (el){
            //
        }
        enter (el, done){
            //
        }
    }
}
</script>
```

### Filters

* Not good for filtering through data; use computed values
* Don't alter the data, just transform the data that users see

```js
// globally

Vue.filter('toLocalCurrency', function(value, currency){
return // thing to transform
})

// locally

filters: {
toLocalCurrency(value, currency){
return // thing to transform
}
}

// use it for formatting

{{ balance | toLocalCurrency(localCurrency) }}
```

* You can pass arguments
* Rerun on every update; so computed values are more performant

### Mixins

* Encapsulate one piece of functionality so that you can use it in different components throughout the app

```js
const toggle = {
  data() {
    return {
      isShowing: false
    };
  },
  methods: {
    toggleShow() {
      this.isShowing = !this.isShowing;
    }
  }
};

const Modal = {
  mixins: [toggle]
};

const ToolTip = {
  mixins: [toggle]
};
```

* When merged, mixins are applied first and the component second
* Mixins have all the lifecycle methods available to them
* Global mixins are applied to every component; use only with extreme caution

### Custom Directives

* Pass a value into a directive: `v-example="value"`
* Pass an argument into a directive: `v-example:arg="value"`
* Has access to additional lifecycle hooks: `Unbind`, `Bind`, `Inserted`, `Updated`, `ComponentUpdated`

```js
Vue.directive('tack', {
  bind(el, binding, vnode) {
    el.style.position = 'fixed';
    el.style.top = binding.value + 'px';
  }
});

<template>
  <div id="app">
    <p>Scroll down the page</p>
    <p v-tack="70">Stick me 70px from the top of the page</p>
  </div>
</template>;
```

* Use case, use it to replace a library like waypoints

### Vuex

* Centralized store for shared state, methods or async
* Influenced by Flux, similar to Redux
* Unidirectional data flow

```
yarn add vuex
```

* Create a new directory named `store`
* In that, create a `store.js` file for initial setup:

```js
//store.js

import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    key: value
  }
});

// main.js
import Vue from 'vue';
import App from './App.vue';

import { store } from './store/store';

new Vue({
  el: '#app',
  store,
  template: '<App />',
  components: { App }
});
```

* Getters: Like computed values, or mapStateToProps in React
* Mutations: Like mapDispatchToProps in React
* Actions

```js
export const store = new Vuex.Store({
state: {
    counter: 0
}

getters: {
    triplCounter: state => {
        return state.counter * 3;
    }
},
mutations: {
    increment: (state, num) => {
        state.counter += num;
    },
    decrement: (state, num)=> {
        state.counter -= num;
    }
},

methods: {
    asyncIncrement(){
        this.$store.dispatch('asyncIncrement), {
            by: 10,
            dur: 1000
        }
    }
},

actions: {
    increment (context) {
        context.commit('increment);
    },
    // destructured
    decrement ({commit}){
        commit('decrement);
    }
    asyncIncrement ({commit}, asyncNum) {
        setTimeout(() => {
            commit('increment', asyncNum.by);
        }, asyncNum.dur)
    }
}
});
```

* In the Vue instance or component, use computed methods for getters
* Use methods with commits to access mutations
* Use methods with dispatch for the actions, or for async

```js
computed: {
    value() {
        return this.$store.getters.tripleCounter;
    }
},
methods: {
    increment(){
        this.$store.commit('increment', 2);
    },
    asyncIcrement(){
        this.$store.dispatch('asyncIncrement', 2);
    }
}
```

* Use `mapActions`, `mapGetters`, and `mapDispatch` with spread `...` and array of named items
* Note: May need to add Babel spread operator support

```js
import { mapActions } from 'vuex';

export default {
  methods: {
    ...mapActions(['increment', 'decrement', 'asyncIncrement'])
  }
};
```

## Vue-Trello (with Firebase)

```bash
npm install -g @vue/cli
```

* Manually select features: Router, Vuex, CSS Pre-processors, Linter / Formatter, Unit Testing, E2E Testing, SCC/SASS, ESLint + Prettier, Link on Save, Jest, Cypress, In package.json, Yarn
* Start the dev server

```bash
cd <project name>
yarn serve
```

* Install `Pug` and `Vuetify` and `Axios`

```bash
yarn add pug pug-loader vuetify axios
```

* Configure `Vuetfiy`

```js
// src/main.js

import Vue from "vue";
import Vuetify from "vuetify"; // 1. vuetify js
import "vuetify/dist/vuetify.min.css"; // 2. vuetify css
import App from "./App.vue";
import router from "./router";
import store from "./store";

Vue.config.productionTip = false;
Vue.use(Vuetify); // 3. use vuetify

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");

```

* Add the font to the head of `index.html`

```html
<!-- public/index.html -->

<!DOCTYPE html>
<html>
<head>
<!-- ...other head stuff -->
  <link href='https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons' rel="stylesheet">
</head>
<body>
  <div id="app"></div>
</body>
</html>
```




## Notes from [Advanced Vue.js Features from the Ground Up](https://frontendmasters.com/courses/advanced-vue/)

### Reactivity

* Keeping the relationship in sync
* Given `a` and `b=a*10`What if we had a magic internal function that `onAChanged()` that updates `b` anytime `a` changes?
* If we encapsulate a query selector and DOM manipulation in `onAChanged`, it becomes declarative
* We can further abstract this into a templating language, in which `onStateChanged(() => { view = render(state)})`
* How do we implement `onStateChanged`?
* React uses a `setState` method; it requires the user to always call a function to manipulate the state; this is what triggers the state change
* In vue, all properties get converted to getters and setters using the `Object.defineProperty` api

#### Getters and Setters

```js
const obj = { foo: 3 };
let internalValue = obj.foo;
Object.defineProperty(obj, 'foo', {
  get() {
    console.log(`getting value for foo: ${internalValue}`);
    return internalValue;
  },
  set(newValue) {
    console.log(`setting value for foo to: ${newValue}`);
    internalValue = newValue;
  }
});
```

#### Dependency Tracking

* Two methods `depend()` and `notify()`
* `depend()`: the current code depends on this dependency
* `notify()`: the dependency has changed; any previous expressions, computations, functions that have previously depended on it, should be notified so that they can be re-executed
* associate a computation to a dependency, like a subscriber to the dependency
* `autorun()`: takes an updater function where you can register dependencies

#### Observer

* `observe()` converts the properties in the received object and makes them reactive; it gets assigned a `Dep` instance for each converted property, which keeps track of a list of subscribing update functions, and triggers them to re-run when its setter is invoked
* It takes any object, observes it, converts its properties into getters and setters; hooks up `Dep.depend()` and `Dep.notify()` calls to the getters and setters; then when a property is accessed on that object, it collects dependencies by calling `Dep.depend()`, and when we mutate a property, it calls `Dep.notify()` to trigger changes
* If you add some DOM manipulations inside the `autorun()` function, you have a tiny reactivity engine that automatically keep state and DOM in sync

### Plugins

* `Vue.use(plugin)`
* Refer to Vue documentation [Writing a Plugin](https://vuejs.org/v2/guide/plugins.html)
* A plugin is a function that receives `Vue` as the first argument, and options as the second
* Common techniques involve `Vue.mixin(options)` api
* Mixins are reusable snippets or parts of Vue component options that can be mixed into an existing component
* `Vue.mixin` will apply it globally
* Usually it's a better idea to wrap this with a plugin interface; it will prevent it from being applied over and over again
* `$options` exists on every component; contains the merged, normalized options object of that specific instance
* Vue component options can come from a lot of places: global mixins, the component's own definition, the options that you pass to it when you're creating the instance, or from an ancestor component
* This also contains any custom options that you add to that component
