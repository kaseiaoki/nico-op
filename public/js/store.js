import { auth, isAuthed, getAuthedUser } from './auth.js';
import { DB, ON_SMOKE_ADDED, ON_SETTING_UPDATED } from './db.js';
import { Smoke } from './model/smoke.js';
import { Setting } from './model/setting.js';

const db = new DB();

export const store = new Vuex.Store({
  state: {
    pageState: 'loading',
    user: null,
    db,
    smokes: [],
    setting: new Setting({maxSmokeNum: 100}),
    isOpenedSettingModal: false
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
    },
    updateSetting(state, {setting}) {
      console.debug('updateSetting', setting);
      db.setSetting(setting);
    },
    openSettingModal(state) {
      state.isOpenedSettingModal = true;
    },
    closeSettingModal(state) {
      state.isOpenedSettingModal = false;
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

      const _setting = await db.getSetting();
      if (_setting) {
        state.setting = new Setting(_setting);
      }
      db.on(ON_SETTING_UPDATED, ({setting}) => {
        state.setting = new Setting(setting);
      });
    },
    async auth({commit}) {
      const user = await auth();
      commit('auth', {user});
      commit('setPageState', {pageState: 'active'});
    }
  }
});
