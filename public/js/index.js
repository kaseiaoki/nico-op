import { DB } from './db.js';
import { auth, isAuthed, getAuthedUser } from './auth.js';
import { store } from './store.js';

const CHECK_WAIT_MILLISECONDS = 2000;

new Vue({
  el: '#app',
  store,
  mounted() {
    setTimeout(() => {
      this.$store.dispatch('init')
        .catch(err => console.error(err));
    }, CHECK_WAIT_MILLISECONDS);
  },
  computed: {
    ...Vuex.mapState(['pageState'])
  }
});
