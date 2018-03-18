// make sure to call Vue.use(Vuex) if using a module system
// import Vue from 'vue'
// import Vuex from 'vuex'
import { store } from './store.js';

Vue.use(Vuex)

new Vue({
  el: '#app',
  computed: {
    count () {
	    return store.state.count
    }
  },
  methods: {
    increment () {
      store.commit('increment')
    },
    decrement () {
    	store.commit('decrement')
    }
  }
})
