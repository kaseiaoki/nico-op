import { ModelBase } from './model_base';

export class User extends ModelBase {
    get properties() {
        return [
            'uid',
            'displayName',
            'email'
        ];
    }
}
