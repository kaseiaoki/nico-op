import { ModelBase } from './model_base.js';

export class Setting extends ModelBase {
  get properties() {
    return [
      'maxSmokeNum'
    ];
  }
}
