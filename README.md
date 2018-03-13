### Notes from Introduction to Vue.js

Watches are good for asynchronous updates, updates/transitions with data changes

```
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

Source: [Introduction to Vue.js](https://frontendmasters.com/courses/vue/)
