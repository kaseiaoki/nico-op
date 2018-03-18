import { DB } from './db.js';
import { auth, isAuthed, getAuthedUser } from './auth.js';
import { store } from './store.js';

Vue.use(Vuex);

new Vue({
  el: '#app',
});
