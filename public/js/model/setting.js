import { ModelBase } from './model_base';

export class Setting extends ModelBase {
    get properties() {
        return [
            'maxSmokeNum'
        ];
    }
}
