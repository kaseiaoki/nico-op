import { DB } from './js/db';
import { auth, isAuthed, getAuthedUser } from './js/auth';
import { store } from './store.js';

Vue.use(Vuex);

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
});
