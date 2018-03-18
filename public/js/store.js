import { auth, isAuthed, getAuthedUser } from './auth.js';

export const store = new Vuex.Store({
  state: {
    pageState: 'loading',
    user: null
  },
  mutations: {
    auth(state, {user}) {
      state.user = user;
    },
    setPageState(state, {pageState}) {
      state.pageState = pageState;
    }
  },
  actions: {
    init({commit}) {
      if (isAuthed()) {
        console.debug('already authed');
        const user = getAuthedUser();
        commit('auth', {user});
        commit('setPageState', {pageState: 'active'});
      } else {
        commit('setPageState', {pageState: 'login'});
      }
    },
    async auth({commit}) {
      const user = await auth();
      commit('auth', {user});
      commit('setPageState', {pageState: 'active'});
    }
  }
});
