import { Setting } from '../model/setting.js';
import { ON_SETTING_UPDATED } from '../db.js';

Vue.component('setting-modal', {
  data() {
    return {
      maxSmokeNum: this.$store.state.setting.maxSmokeNum
    };
  },
  computed: {
    ...Vuex.mapState(['setting', 'isOpenedSettingModal'])
  },
  methods: {
    updateSetting() {
      this.$store.commit('updateSetting', {
        setting: new Setting({
          maxSmokeNum: this.maxSmokeNum
        })
      });
      this.closeSettingModal();
    },
    ...Vuex.mapMutations(['closeSettingModal'])
  },
  watch: {
    isOpenedSettingModal() {
      this.maxSmokeNum = this.$store.state.setting.maxSmokeNum;
    }
  },
  template: `
<div class="setting-modal modal" :class="{ 'is-active': isOpenedSettingModal }">
  <div class="modal-background"></div>
  <div class="modal-card">
    <header class="modal-card-head">
      <p class="modal-card-title">Setting</p>
      <button class="delete" aria-label="close" @click="closeSettingModal"></button>
    </header>
    <section class="modal-card-body">
      <form>
        <div class="field">
          <label>Max number of smoking times in 72 hours (equal 3 days)</label>
          <div class="control">
            <input class="input" type="number" min="0" v-model="maxSmokeNum">
          </div>
        </div>
      </form>
    </section>
    <footer class="modal-card-foot">
      <button type="button" class="button is-success" @click="updateSetting">Save changes</button>
      <button type="button" class="button" @click="closeSettingModal">Cancel</button>
    </footer>
  </div>
</div>
`
});