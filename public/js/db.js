import { User } from './model/user';
import { Setting } from './model/setting';
import { Smoke } from './model/smoke';

export const ON_SETTING_UPDATED = 'onSettingUpdated';
export const ON_SMOKE_ADDED = 'onSmokeAdded';

export class DB extends EventEmitter2 {
    constructor(opts = {}) {
        super(opts);
    }

    init() {
        this.db = firebase.database();

        this.setting = this.db.ref('setting');
        this.settings.on('value', snapshot => {
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
        const snapshot = this.setting.once('value');
        return new Setting(snapshot.val());
    }

    addUser(user) {
        const newUser = this.users.push();
        newUser.set(user.deserialize());
    }

    async getUserAll() {
        const snapshots = this.users.once('value');
        return snapshots.map(x => new User(x.val()));
    }

    getSmokeAll() {
        const snapshots = this.smokes.once('value');
        return snapshots.map(x => new Smoke(x.val()));
    }

    addSmoke(smoke) {
        const newSmoke = this.smokes.push();
        newSmoke.set(smoke.deserialize());
    }
}