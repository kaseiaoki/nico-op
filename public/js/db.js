import { User } from './model/user.js';
import { Setting } from './model/setting.js';
import { Smoke } from './model/smoke.js';

export const ON_SETTING_UPDATED = 'onSettingUpdated';
export const ON_SMOKE_ADDED = 'onSmokeAdded';

export class DB extends EventEmitter2 {
  constructor(opts = {}) {
    super(opts);
  }

  init() {
    this.db = firebase.database();

    this.setting = this.db.ref('setting');
    this.setting.on('value', snapshot => {
      const setting = new Setting(snapshot.val());
      this.emit(ON_SETTING_UPDATED, {setting});
    });

    this.smokes = this.db.ref('smokes');
    this.smokes.on('child_added', snapshot => {
      const smoke = new Smoke(snapshot.val());
      this.emit(ON_SMOKE_ADDED, {smoke});
    });

    this.users = this.db.ref('users');
  }

  async getSetting() {
    const snapshot = await this.setting.once('value');
    return new Setting(snapshot.val());
  }

  setSetting(setting) {
    this.setting.set(setting.deserialize());
  }

  addUser(user) {
    const newUser = this.users.push();
    newUser.set(user.deserialize());
  }

  async getUserAll() {
    const snapshots = await this.users.once('value');
    return snapshots.val() ? Object.values(snapshots.val()).map(x => new User(x.val())) : [];
  }

  async getSmokeAll() {
    const snapshots = await this.smokes.once('value');
    return snapshots.val() ? Object.values(snapshots.val()).map(x => new Smoke(x)) : [];
  }

  addSmoke(smoke) {
    const newSmoke = this.smokes.push();
    newSmoke.set(smoke.deserialize());
  }
}