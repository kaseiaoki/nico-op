import { auth, isAuthed, getAuthedUser } from './auth.js';
import { DB, ON_SMOKE_ADDED } from './db.js';
import { Smoke } from './model/smoke.js';

const db = new DB();

export const store = new Vuex.Store({
  state: {
    pageState: 'loading',
    user: null,
    db,
    smokes: []
  },
  mutations: {
    auth(state, {user}) {
      state.user = user;
    },
    setPageState(state, {pageState}) {
      state.pageState = pageState;
    },
    addSmoke(state) {
      const smoke = new Smoke({uid: state.user.uid, smokedAt: Date.now()});
      console.debug('addSmoke', smoke);
      db.addSmoke(smoke);
    }
  },
  actions: {
    async init({commit, state}) {
      if (isAuthed()) {
        console.debug('already authed');
        const user = getAuthedUser();
        commit('auth', {user});
        commit('setPageState', {pageState: 'active'});
      } else {
        commit('setPageState', {pageState: 'login'});
      }

      db.init();
      state.smokes = await state.db.getSmokeAll();
      db.on(ON_SMOKE_ADDED, ({smoke}) => {
        state.smokes.push(smoke);
      });
    },
    async auth({commit}) {
      const user = await auth();
      commit('auth', {user});
      commit('setPageState', {pageState: 'active'});
    }
  }
});
